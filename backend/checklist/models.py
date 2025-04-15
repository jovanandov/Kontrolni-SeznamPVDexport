from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tip(models.Model):
    id = models.AutoField(primary_key=True)
    naziv = models.CharField(max_length=100)
    segmenti = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.naziv} ({self.segmenti} segmentov)"

class Projekt(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    osebna_stevilka = models.CharField(max_length=50)
    datum = models.DateField()
    tip = models.ForeignKey(Tip, on_delete=models.PROTECT)
    stevilo_ponovitev = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} - {self.tip.naziv}"

class Segment(models.Model):
    id = models.AutoField(primary_key=True)
    naziv = models.CharField(max_length=200)
    projekt = models.ForeignKey(Projekt, related_name='segmenti', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.naziv} - {self.projekt.id}"

class Vprasanje(models.Model):
    TIPI_VPRASANJ = [
        ('boolean', 'Da/Ne'),
        ('multiple_choice', 'Več izbir'),
        ('textual', 'Besedilo'),
    ]
    
    id = models.AutoField(primary_key=True)
    segment = models.ForeignKey(Segment, related_name='vprasanja', on_delete=models.CASCADE)
    vprasanje = models.TextField()
    tip = models.CharField(max_length=20, choices=TIPI_VPRASANJ)
    repeatability = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.vprasanje[:50]}... - {self.segment.naziv}"

class SerijskaStevilka(models.Model):
    id = models.AutoField(primary_key=True)
    projekt = models.ForeignKey(Projekt, related_name='serijske_stevilke', on_delete=models.CASCADE)
    stevilka = models.CharField(max_length=100)  # format: {Projekt}-{Ponovitev}
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.stevilka

class Odgovor(models.Model):
    id = models.AutoField(primary_key=True)
    vprasanje = models.ForeignKey(Vprasanje, related_name='odgovori', on_delete=models.CASCADE)
    serijska_stevilka = models.ForeignKey(SerijskaStevilka, related_name='odgovori', on_delete=models.CASCADE)
    odgovor = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.vprasanje.vprasanje[:50]}... - {self.odgovor[:50]}..."

class Nastavitev(models.Model):
    TIPI_NASTAVITEV = [
        ('tema', 'Tema'),
        ('jezik', 'Jezik'),
        ('notifikacije', 'Notifikacije'),
        ('avtomatska_odjava', 'Avtomatska odjava'),
    ]
    
    id = models.AutoField(primary_key=True)
    tip = models.CharField(max_length=50, choices=TIPI_NASTAVITEV)
    vrednost = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.tip} - {self.vrednost}"

class Profil(models.Model):
    id = models.AutoField(primary_key=True)
    naziv = models.CharField(max_length=100)
    nastavitve = models.JSONField()  # JSON string z nastavitvami
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.naziv

class LogSprememb(models.Model):
    id = models.AutoField(primary_key=True)
    cas = models.DateTimeField(auto_now_add=True)
    uporabnik = models.ForeignKey(User, on_delete=models.CASCADE)
    sprememba = models.CharField(max_length=200)
    stara_vrednost = models.TextField(blank=True, null=True)
    nova_vrednost = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.cas} - {self.uporabnik.username} - {self.sprememba}"
