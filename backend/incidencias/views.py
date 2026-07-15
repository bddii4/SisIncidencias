#si un usario no ha iniciado sesion e intenta entrar, se redirige a la pagina de login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
#verificcaion de user y pass, crea sesion para que "recuerde" que al usuario
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
#importa model de incidencia para poder leer en la db
from .models import Incidencia
import json

def login_page(request):
    return render(request, 'login.html')

@csrf_exempt
#Si el usuario está intentando enviar datos mediante un método POST, continúa. Si no, ignora este bloque
def login_view(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        #Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud JSON
        username = data.get('username')
        password = data.get('password')
        #verifica si las credenciases son correctas, si=crea sesion, no=mensaje de error
        user = authenticate(request, username=username, password=password)
        #valida que los campos esten llenos y que esten correctos
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'OK'}, status=200)
        return JsonResponse({'message': 'Credenciales inválidas.'}, status=401)
    return JsonResponse({'message': 'Método no permitido.'}, status=405)

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')

@login_required
def reporte_page(request):
    return render(request, 'reporte_incidencia.html')

@csrf_exempt
@login_required
def reporte_list(request):
    if request.method == 'GET':
        reportes = Incidencia.objects.all().order_by('-id')
        data = []
        for r in reportes:
            data.append({
                'id': r.id,
                'titulo': r.titulo,
                'nombre': r.nombre,
                'area': r.area,
                'sistema': r.sistema,
                'prioridad': r.prioridad,
                'estado': r.estado,
                'descripcion': r.descripcion,
                'procesos': r.procesos,
                'evidencia': r.evidencia,
                'fecha': r.fecha.strftime('%Y-%m-%d'),
                'hora': r.hora.strftime('%I:%M %p') if r.hora else '',
                'chat': r.conversacion,
            })
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        #si el tipo de contenido de la solicitud es JSON, se procesa como JSON; de lo contrario, se procesa como datos de formulario
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            titulo = data.get('titulo')
            nombre = data.get('nombre')
            area = data.get('area')
            sistema = data.get('sistema')
            descripcion = data.get('descripcion')
            procesos = data.get('procesos', '')
        else:
            titulo = request.POST.get('titulo')
            nombre = request.POST.get('nombre')
            area = request.POST.get('area')
            sistema = request.POST.get('sistema')
            descripcion = request.POST.get('descripcion')
            procesos = request.POST.get('procesos', '')

        reporte = Incidencia.objects.create(
            titulo=titulo, nombre=nombre, area=area,
            sistema=sistema, descripcion=descripcion, procesos=procesos,
        )

        #obtiene los archivos subidos por el usuario
        archivos = request.FILES.getlist('files')
        if archivos:
            import os
            from django.conf import settings

            #crea una carpeta para guardar los archivos subidos por el usuario, si no existe
            carpeta = os.path.join(settings.MEDIA_ROOT, 'reportes', str(reporte.id))
            os.makedirs(carpeta, exist_ok=True)
            nombres = []

            #guarda cada archivo fisico en el disco f.chunks() en partes para no saturar la memoria
            for f in archivos:
                ruta = os.path.join(carpeta, f.name)
                with open(ruta, 'wb+') as destino:
                    for chunk in f.chunks():
                        destino.write(chunk)
                nombres.append(f.name)

            #guard lista de nombres en el campo de evidencia del reporte
            reporte.evidencia = nombres
            reporte.save(update_fields=['evidencia'])

        return JsonResponse({'id': reporte.id, 'message': 'Creado'}, status=201)

    return JsonResponse({'message': 'Método no permitido.'}, status=405)

@csrf_exempt
@login_required
def incidencias_list(request):
    if request.method == 'GET':
        reportes = Incidencia.objects.all().order_by('-id')
        data = []
        for r in reportes:
            data.append({
                'id': r.id,
                'titulo': r.titulo,
                'nombre': r.nombre,
                'area': r.area,
                'sistema': r.sistema,
                'prioridad': r.prioridad,
                'estado': r.estado,
                'tipo': r.tipo,
                'descripcion': r.descripcion,
                'procesos': r.procesos,
                'evidencia': r.evidencia,
                'fecha': r.fecha.strftime('%Y-%m-%d'),
                'hora': r.hora.strftime('%I:%M %p') if r.hora else '',
                'usuario': r.nombre.split()[0] + ' ' + r.nombre.split()[-1][0] + '.',
                'conversacion': r.conversacion,
            })

        return JsonResponse(data, safe=False)
    return JsonResponse({'message': 'Método no permitido.'}, status=405)

@csrf_exempt
@login_required
def actualizar_incidencia(request, id):
    if request.method == 'PUT':
        try:
            reporte = Incidencia.objects.get(id=id)
        except Incidencia.DoesNotExist:
            return JsonResponse({'message': 'Incidencia no encontrada.'}, status=404)
        
        data = json.loads(request.body)
        reporte.estado = data.get('estado', reporte.estado)
        reporte.tipo = data.get('tipo', reporte.tipo)
        reporte.save(update_fields=['estado', 'tipo'])
        return JsonResponse({'message': 'Incidencia actualizada.'}, status=200)

    elif request.method == 'DELETE':
        try:
            reporte = Incidencia.objects.get(id=id)
        except Incidencia.DoesNotExist:
            return JsonResponse({'message': 'Incidencia no encontrada.'}, status=404)
        reporte.delete()
        return JsonResponse({'message': 'Incidencia eliminada.'}, status=200)

    return JsonResponse({'message': 'Método no permitido.'}, status=405)

@csrf_exempt
@login_required
def incidencia_mensaje(request, id):
    if request.method == 'POST':
        try:
            #busca en la db y obten el registro cuyo id sea = al id que etoy mandando
            reporte = Incidencia.objects.get(id=id)
        except Incidencia.DoesNotExist:
            return JsonResponse({'message': 'Incidencia no encontrada.'}, status=404)
        
        data = json.loads(request.body)
        mensaje = {
            'de': 'admin',
            'texto': data.get('texto'),
            'fecha': data.get('fecha', ''),
        }

        conversacion = reporte.conversacion
        conversacion.append(mensaje)
        reporte.conversacion = conversacion
        reporte.save(update_fields=['conversacion'])
        return JsonResponse({'message': 'Mensaje enviado.'}, status=200)
    return JsonResponse({'message': 'Método no permitido.'}, status=405)
