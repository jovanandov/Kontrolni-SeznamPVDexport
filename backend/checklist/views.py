from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from .models import (
    Tip, Projekt, Segment, Vprasanje, SerijskaStevilka,
    Odgovor, Nastavitev, Profil, LogSprememb
)
from .serializers import (
    TipSerializer, ProjektSerializer, SegmentSerializer, VprasanjeSerializer,
    SerijskaStevilkaSerializer, OdgovorSerializer, NastavitevSerializer,
    ProfilSerializer, LogSpremembSerializer
)
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

# Create your views here.

class TipViewSet(viewsets.ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProjektViewSet(viewsets.ModelViewSet):
    queryset = Projekt.objects.all()
    serializer_class = ProjektSerializer
    permission_classes = [permissions.IsAuthenticated]

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

    @action(detail=True, methods=['get'])
    def odgovori(self, request, pk=None):
        serijska_stevilka = self.get_object()
        odgovori = serijska_stevilka.odgovori.all()
        serializer = OdgovorSerializer(odgovori, many=True)
        return Response(serializer.data)

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
        logout(request)
        return Response({'status': 'success'})

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
