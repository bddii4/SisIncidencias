from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_page, name='login_page'),
    path('api/login', views.login_view, name='login'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('reporte/', views.reporte_page, name='reporte_page'),
    path('api/reporte/', views.reporte_list, name='reporte_list'),
    path('api/incidencias/', views.incidencias_list, name='incidencias_list'),
    path('api/incidencias/<int:id>/', views.actualizar_incidencia, name='actualizar_incidencia'),
    path('api/incidencias/<int:id>/mensaje/', views.incidencia_mensaje, name='incidencia_mensaje'),
    
]
