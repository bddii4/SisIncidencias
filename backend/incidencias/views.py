#si un usario no ha iniciado sesion e intenta entrar, se redirige a la pagina de login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
#verificcaion de user y pass, crea sesion para que "recuerde" que al usuario
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
