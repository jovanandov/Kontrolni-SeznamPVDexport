from rest_framework import serializers
from .models import (
    Tip, Projekt, ProjektTip, Segment, Vprasanje, SerijskaStevilka,
    Odgovor, Nastavitev, Profil, LogSprememb
)
from django.contrib.auth.models import User

class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tip
        fields = '__all__'

class ProjektTipSerializer(serializers.ModelSerializer):
    tip_naziv = serializers.CharField(source='tip.naziv', read_only=True)
    
    class Meta:
        model = ProjektTip
        fields = ['id', 'projekt', 'tip', 'tip_naziv', 'stevilo_ponovitev', 'created_at', 'updated_at']

class ProjektSerializer(serializers.ModelSerializer):
    projekt_tipi = ProjektTipSerializer(many=True, read_only=True)
    
    class Meta:
        model = Projekt
        fields = ['id', 'osebna_stevilka', 'datum', 'projekt_tipi', 'created_at', 'updated_at']

class SegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Segment
        fields = '__all__'

class VprasanjeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vprasanje
        fields = '__all__'

class SerijskaStevilkaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SerijskaStevilka
        fields = ['id', 'projekt', 'projekt_tip', 'stevilka', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class OdgovorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Odgovor
        fields = '__all__'

class NastavitevSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nastavitev
        fields = '__all__'

class ProfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profil
        fields = '__all__'

class LogSpremembSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogSprememb
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser']
        read_only_fields = ['username', 'email'] 