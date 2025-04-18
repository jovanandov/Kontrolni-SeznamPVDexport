from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from .models import (
    Tip, Projekt, Segment, Vprasanje, SerijskaStevilka,
    Odgovor, Nastavitev, Profil, LogSprememb, ProjektTip
)
from .serializers import (
    TipSerializer, ProjektSerializer, SegmentSerializer, VprasanjeSerializer,
    SerijskaStevilkaSerializer, OdgovorSerializer, NastavitevSerializer,
    ProfilSerializer, LogSpremembSerializer, UserSerializer
)
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
import pandas as pd
import io
from django.http import HttpResponse
from django.db import transaction

# Create your views here.

class TipViewSet(viewsets.ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'], url_path='download-template')
    def download_template(self, request):
        """Prenesi vzorčno XLSX datoteko za uvoz vprašanj."""
        # Ustvarimo vzorčne podatke
        data = {
            'segment': ['Pokrov igralnega mesta', 'Pokrov igralnega mesta', 'Maska sistema', 'Maska sistema'],
            'question': [
                'Ali je monitor brez poškodb?', 
                'Pravilno zapiranje nastavljen zaklep', 
                'BA ustnik pritjen',
                'Serijska številka (PT projekta)'
            ],
            'type': ['boolean', 'boolean', 'boolean', 'text'],
            'required': ['true', 'true', 'true', 'true'],
            'description': [
                'Preveri stanje monitorja', 
                'Preveri delovanje zaklepa', 
                'Preveri pritrditev ustnika',
                'Vnesi serijsko številko PT projekta'
            ],
            'options': ['', '', '', ''],
            'repeatable': ['true', 'true', 'false', 'false']  # Dodano polje za ponovljivost
        }
        
        # Ustvarimo DataFrame
        df = pd.DataFrame(data)
        
        # Ustvarimo Excel datoteko v pomnilniku
        excel_file = io.BytesIO()
        
        # Dodamo list z navodili
        with pd.ExcelWriter(excel_file, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Vzorec')
            
            # Dodamo list z navodili
            navodila = pd.DataFrame({
                'Polje': ['segment', 'question', 'type', 'required', 'description', 'options', 'repeatable'],
                'Opis': [
                    'Ime segmenta vprašanj',
                    'Besedilo vprašanja',
                    'Tip vprašanja (boolean, text, number, multiple_choice)',
                    'Ali je odgovor obvezen (true/false)',
                    'Dodatni opis vprašanja',
                    'Možni odgovori za multiple_choice tip (ločeni z vejico)',
                    'Ali se vprašanje lahko ponovi (true/false)'
                ],
                'Primer': [
                    'Pokrov igralnega mesta',
                    'Ali je monitor brez poškodb?',
                    'boolean',
                    'true',
                    'Preveri stanje monitorja',
                    'Da,Ne,n/a',
                    'true'
                ]
            })
            navodila.to_excel(writer, index=False, sheet_name='Navodila')
        
        # Pripravimo odgovor
        excel_file.seek(0)
        response = HttpResponse(
            excel_file.read(),
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=vzorec_vprasanj.xlsx'
        
        return response

    @action(detail=True, methods=['POST'], url_path='upload-xlsx')
    def upload_xlsx(self, request, pk=None):
        tip = self.get_object()
        
        if 'file' not in request.FILES:
            return Response(
                {'error': 'Datoteka ni bila posredovana'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        xlsx_file = request.FILES['file']
        if not xlsx_file.name.endswith('.xlsx'):
            return Response(
                {'error': 'Datoteka mora biti v formatu .xlsx'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Branje XLSX datoteke
            print(f"Berem datoteko: {xlsx_file.name}, velikost: {xlsx_file.size} bajtov")
            df = pd.read_excel(xlsx_file)
            print(f"Prebrane vrstice: {len(df)}")
            print(f"Stolpci: {list(df.columns)}")
            print(f"Tipi podatkov:\n{df.dtypes}")
            
            # Pretvorba NaN vrednosti v None in čiščenje podatkov
            df = df.replace({pd.NA: None})
            df = df.fillna('')  # Prazne vrednosti namesto NaN
            
            # Pretvorba boolean vrednosti
            if 'required' in df.columns:
                df['required'] = df['required'].map(lambda x: str(x).lower() == 'true')
            if 'repeatable' in df.columns:
                df['repeatable'] = df['repeatable'].map(lambda x: str(x).lower() == 'true')
            
            # Shranjevanje podatkov v bazo
            with transaction.atomic():
                # Izbrišemo obstoječe segmente za ta tip
                tip.tip_segmenti.all().delete()
                
                # Ustvarimo slovar za sledenje segmentom
                segmenti = {}
                
                # Iteriramo čez vsako vrstico
                for _, row in df.iterrows():
                    segment_naziv = row['segment']
                    
                    # Pridobimo ali ustvarimo segment
                    if segment_naziv not in segmenti:
                        segment = Segment.objects.create(
                            tip=tip,
                            naziv=segment_naziv
                        )
                        segmenti[segment_naziv] = segment
                    else:
                        segment = segmenti[segment_naziv]
                    
                    # Ustvarimo vprašanje
                    Vprasanje.objects.create(
                        segment=segment,
                        vprasanje=row['question'],
                        tip=row['type'],
                        repeatability=row['repeatable'] if 'repeatable' in row else False,
                        obvezno=row['required'],
                        opis=row['description'] if pd.notna(row['description']) else '',
                        moznosti=row['options'] if pd.notna(row['options']) else ''
                    )
            
            return Response({
                'sporočilo': 'Podatki uspešno uvoženi',
                'število_vrstic': len(df)
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            import traceback
            print(f"Napaka pri branju datoteke: {str(e)}")
            print(traceback.format_exc())
            return Response(
                {
                    'error': f'Napaka pri branju datoteke: {str(e)}',
                    'detail': traceback.format_exc()
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class ProjektViewSet(viewsets.ModelViewSet):
    queryset = Projekt.objects.all()
    serializer_class = ProjektSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            projekt_id = request.data.get('id')
            tip_id = request.data.get('tip')
            stevilo_ponovitev = request.data.get('stevilo_ponovitev', 1)

            # Preveri če projekt že obstaja
            projekt = Projekt.objects.filter(id=projekt_id).first()
            
            if projekt:
                # Projekt obstaja, dodaj nov tip
                if ProjektTip.objects.filter(projekt=projekt, tip_id=tip_id).exists():
                    return Response(
                        {'error': f'Projekt {projekt_id} že ima tip {tip_id}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Ustvari nov ProjektTip
                projekt_tip = ProjektTip.objects.create(
                    projekt=projekt,
                    tip_id=tip_id,
                    stevilo_ponovitev=stevilo_ponovitev
                )
                
                # Generiraj serijske številke
                for i in range(stevilo_ponovitev):
                    SerijskaStevilka.objects.create(
                        projekt=projekt,
                        projekt_tip=projekt_tip,
                        stevilka=f"{projekt_id}-{tip_id}-{i+1}"
                    )
                
                return Response(self.serializer_class(projekt).data)
            else:
                # Ustvari nov projekt
                with transaction.atomic():
                    projekt = Projekt.objects.create(
                        id=projekt_id,
                        osebna_stevilka=request.data.get('osebna_stevilka'),
                        datum=request.data.get('datum')
                    )
                    
                    # Ustvari ProjektTip
                    projekt_tip = ProjektTip.objects.create(
                        projekt=projekt,
                        tip_id=tip_id,
                        stevilo_ponovitev=stevilo_ponovitev
                    )
                    
                    # Generiraj serijske številke
                    for i in range(stevilo_ponovitev):
                        SerijskaStevilka.objects.create(
                            projekt=projekt,
                            projekt_tip=projekt_tip,
                            stevilka=f"{projekt_id}-{tip_id}-{i+1}"
                        )
                    
                    return Response(self.serializer_class(projekt).data)
                    
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['get'])
    def tipi(self, request, pk=None):
        """Vrni vse tipe za projekt"""
        projekt = self.get_object()
        tipi = projekt.projekt_tipi.all()
        return Response({
            'projekt_id': projekt.id,
            'tipi': [
                {
                    'tip_id': pt.tip.id,
                    'tip_naziv': pt.tip.naziv,
                    'stevilo_ponovitev': pt.stevilo_ponovitev,
                    'serijske_stevilke': [
                        ss.stevilka for ss in pt.serijske_stevilke.all()
                    ]
                } for pt in tipi
            ]
        })

    @action(detail=True, methods=['get'])
    def segmenti(self, request, pk=None):
        projekt = self.get_object()
        segmenti = projekt.segmenti.all()
        serializer = SegmentSerializer(segmenti, many=True)
        return Response(serializer.data)

class SegmentViewSet(viewsets.ModelViewSet):
    queryset = Segment.objects.all()
    serializer_class = SegmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def vprasanja(self, request, pk=None):
        segment = self.get_object()
        vprasanja = segment.vprasanja.all()
        serializer = VprasanjeSerializer(vprasanja, many=True)
        return Response(serializer.data)

class VprasanjeViewSet(viewsets.ModelViewSet):
    queryset = Vprasanje.objects.all()
    serializer_class = VprasanjeSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def odgovori(self, request, pk=None):
        vprasanje = self.get_object()
        odgovori = vprasanje.odgovori.all()
        serializer = OdgovorSerializer(odgovori, many=True)
        return Response(serializer.data)

class SerijskaStevilkaViewSet(viewsets.ModelViewSet):
    queryset = SerijskaStevilka.objects.all()
    serializer_class = SerijskaStevilkaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        projekt = self.request.query_params.get('projekt', None)
        if projekt is not None:
            queryset = queryset.filter(projekt_id=projekt)
        return queryset

    @action(detail=True, methods=['get'])
    def odgovori(self, request, pk=None):
        serijska_stevilka = self.get_object()
        odgovori = serijska_stevilka.odgovori.all()
        serializer = OdgovorSerializer(odgovori, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        try:
            projekt_id = request.data.get('projekt')
            tip_id = request.data.get('tip')
            stevilka = request.data.get('stevilka')
            
            # Pridobi ProjektTip
            projekt_tip = ProjektTip.objects.get(projekt_id=projekt_id, tip_id=tip_id)
            
            # Ustvari serijsko številko
            serijska_stevilka = SerijskaStevilka.objects.create(
                projekt_id=projekt_id,
                projekt_tip=projekt_tip,
                stevilka=stevilka
            )
            
            return Response(self.serializer_class(serijska_stevilka).data)
        except ProjektTip.DoesNotExist:
            return Response(
                {'error': 'ProjektTip ne obstaja'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class OdgovorViewSet(viewsets.ModelViewSet):
    queryset = Odgovor.objects.all()
    serializer_class = OdgovorSerializer
    permission_classes = [permissions.IsAuthenticated]

class NastavitevViewSet(viewsets.ModelViewSet):
    queryset = Nastavitev.objects.all()
    serializer_class = NastavitevSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProfilViewSet(viewsets.ModelViewSet):
    queryset = Profil.objects.all()
    serializer_class = ProfilSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ustvarimo privzeti profil, če še ne obstaja
        if not Profil.objects.exists():
            Profil.objects.create(
                naziv='Privzeti profil',
                nastavitve={
                    'tema': 'svetla',
                    'jezik': 'sl',
                    'notifikacije': True,
                    'avtomatska_odjava': False
                }
            )
        return Profil.objects.all()

class LogSpremembViewSet(viewsets.ModelViewSet):
    queryset = LogSprememb.objects.all()
    serializer_class = LogSpremembSerializer
    permission_classes = [permissions.IsAuthenticated]

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        osebna_stevilka = request.data.get('osebna_stevilka')
        password = request.data.get('password')
        try:
            user = User.objects.get(username=osebna_stevilka)
            if user.check_password(password):
                login(request, user)
                return Response({'status': 'success'})
            return Response({'status': 'error', 'message': 'Neveljavno geslo'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'status': 'error', 'message': 'Osebna številka ne obstaja'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            logout(request)
            return Response({'message': 'Uspešno odjavljen'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        osebna_stevilka = request.data.get('osebna_stevilka')
        password = request.data.get('password')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')

        if not all([osebna_stevilka, password, email, first_name, last_name]):
            return Response(
                {'error': 'Vsa polja so obvezna'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=osebna_stevilka).exists():
            return Response(
                {'error': 'Osebna številka že obstaja'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=osebna_stevilka,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

        login(request, user)
        return Response(
            {'message': 'Uporabnik uspešno registriran'},
            status=status.HTTP_201_CREATED
        )

@method_decorator(ensure_csrf_cookie, name='dispatch')
class CsrfView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'detail': 'CSRF cookie set'})

class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'osebna_stevilka': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser
        })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return User.objects.all().order_by('username')

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not old_password or not new_password:
            return Response(
                {'error': 'Staro in novo geslo sta obvezna'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not request.user.check_password(old_password):
            return Response(
                {'error': 'Napačno staro geslo'},
                status=status.HTTP_400_BAD_REQUEST
            )

        request.user.set_password(new_password)
        request.user.save()
        return Response(
            {'message': 'Geslo uspešno spremenjeno'},
            status=status.HTTP_200_OK
        )
