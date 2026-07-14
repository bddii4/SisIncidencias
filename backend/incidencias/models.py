from django.db import models
#clase de formulario de incidencias
class Incidencia(models.Model):
    PRIORIDADES = [
        ('alta', 'Alta'),
        ('media', 'Media'),
        ('baja', 'Baja'),
    ]

    ESTADOS = [
        ('abierto', 'Abierto'),
        ('en proceso', 'En proceso'),
        ('espera información', 'Espera información'),
        ('pendiente confirmación', 'Pendiente confirmación'),
        ('resuelto', 'Resuelto'),
        ('cerrado', 'Cerrado'),
    ]

    titulo = models.CharField(max_length=200)
    nombre = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    sistema = models.CharField(max_length=100)
    prioridad = models.CharField(max_length=10, choices=PRIORIDADES, default='media')
    estado = models.CharField(max_length=25, choices=ESTADOS, default='abierto')
    descripcion = models.TextField()
    procesos = models.TextField(blank=True, default='')
    fecha = models.DateField(auto_now_add=True)
    hora = models.TimeField(auto_now_add=True)
    tipo = models.CharField(max_length=20, blank=True, default='')
    evidencia = models.JSONField(default=list, blank=True)
    conversacion = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f'#{self.id} - {self.titulo}'