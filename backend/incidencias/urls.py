from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_page, name='login_page'),
    path('api/login', views.login_view, name='login'),
    path('dashboard/', views.dashboard, name='dashboard'),
]
