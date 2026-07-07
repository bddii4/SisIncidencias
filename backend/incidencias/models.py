from django.db import models
from django.contrib.auth.models import User

class Incidencia(models.Model):
    Prioridades = [
        ('urgente', 'Urgente'),
        ('normal', 'Normal'),
        ('baja', 'Baja'),
    ]
    

    Estados = [
        ('pendiente', 'Pendiente'),
        ('proceso', 'En Proceso'),
        ('resuelto', 'Resuelto'),
    ]




