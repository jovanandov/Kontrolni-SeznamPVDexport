from rest_framework import serializers
from .models import (
    Tip, Projekt, Segment, Vprasanje, SerijskaStevilka,
    Odgovor, Nastavitev, Profil, LogSprememb
)

class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tip
        fields = '__all__'

class ProjektSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projekt
        fields = '__all__'

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
        fields = '__all__'

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