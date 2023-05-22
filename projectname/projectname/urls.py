"""projectname URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from rest_framework import routers
from appname.views import ProductoList, ProductoDetail, TotalesView, SubdimensionesView, SumaSubAPIView, PreguntaAPIView, ElementoAPIView, TotalCiudadAPIView, ActualizarMaturityLevels, CrearRespuestaViewSet

router = routers.DefaultRouter()
router.register('crear_respuesta', CrearRespuestaViewSet, basename='crear_respuesta')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('productos/', ProductoList.as_view(), name='producto-list'),
    path('productos/<int:pk>/', ProductoDetail.as_view(), name='producto-detail'),
    path('api/', include(router.urls)),
    path('api/totales/<str:ciudad>/', TotalesView.as_view(), name='obtener_totales'),
    path('api/subdimensiones/<str:dimension>/', SubdimensionesView.as_view(), name='subdimensiones'),
    path('api/suma_sub/<str:constante>/<str:ciudad>/', SumaSubAPIView.as_view(), name='suma_sub'),
    path('api/preguntas/<str:subdimension>/', PreguntaAPIView.as_view(), name='preguntas'),
    path('api/elementos/<str:id_pregunta>/', ElementoAPIView.as_view(), name='elementos'),
    path('api/total-ciudad/', TotalCiudadAPIView.as_view(), name='total-ciudad'),
    path('api/actualizar-respuestas/', ActualizarMaturityLevels.as_view(), name='actualizar_respuestas'),
]


"""  path('totales/<str:ciudad>/', TotalesView.as_view(), name='obtener_totales'),
    path('subdimensiones/<str:dimension>/', SubdimensionesView.as_view(), name='subdimensiones'),
    path('suma_sub/<str:constante>/<str:ciudad>/', SumaSubView.as_view(), name='subdimension'),
    path('preguntas/<str:subdimension>/', PreguntaView.as_view(), name='preguntas'),
    path('elementos/<str:id_pregunta>/', ElementoView.as_view(), name='elementos'),
    path('total-ciudad/', TotalCiudadView.as_view(), name='total_ciudad'),
    path('actualizar-respuestas/', ActualizarMaturityLevels.as_view(), name='actualizar_respuestas'), """