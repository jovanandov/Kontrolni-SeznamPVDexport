from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TipViewSet, ProjektViewSet, SegmentViewSet, VprasanjeViewSet,
    SerijskaStevilkaViewSet, OdgovorViewSet, NastavitevViewSet,
    ProfilViewSet, LogSpremembViewSet, LoginView, LogoutView, RegisterView, CsrfView, UserView
)

router = DefaultRouter()
router.register(r'tipi', TipViewSet)
router.register(r'projekti', ProjektViewSet)
router.register(r'segmenti', SegmentViewSet)
router.register(r'vprasanja', VprasanjeViewSet)
router.register(r'serijske-stevilke', SerijskaStevilkaViewSet)
router.register(r'odgovori', OdgovorViewSet)
router.register(r'nastavitve', NastavitevViewSet)
router.register(r'profili', ProfilViewSet)
router.register(r'log-sprememb', LogSpremembViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/csrf/', CsrfView.as_view(), name='csrf'),
    path('auth/user/', UserView.as_view(), name='user'),
] 