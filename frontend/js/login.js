const form = document.getElementById('loginForm');
const toast = document.getElementById('toast');
const fields = {
    username: document.getElementById('username'),
    password: document.getElementById('password'),
};
const errors = {
    username: document.getElementById('usernameError'),
    password: document.getElementById('passwordError'),
};

function limpiarErrores() {
    Object.keys(fields).forEach(key => {
        fields[key].closest('.form-group').classList.remove('error');
        errors[key].textContent = '';
    });
}

function mostrarError(campo, mensaje) {
    fields[campo].closest('.form-group').classList.add('error');
    errors[campo].textContent = mensaje;
}

function mostrarToast(mensaje, tipo) {
    toast.textContent = mensaje;
    toast.className = 'toast ' + tipo + ' show';
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    limpiarErrores();
    toast.classList.remove('show');

    const username = fields.username.value.trim();
    const password = fields.password.value;

    let valido = true;

    if (!username) {
        mostrarError('username', 'El usuario es obligatorio.');
        valido = false;
    }

    if (!password) {
        mostrarError('password', 'La contraseña es obligatoria.');
        valido = false;
    }

    if (!valido) return;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            mostrarToast('Inicio de sesion exitoso. Redirigiendo...', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            if (data.message === 'Credenciales inválidas.' || data.message === 'Credenciales invalidas.') {
                mostrarError('username', '');
                mostrarError('password', 'Usuario o contraseña incorrectos.');
            } else {
                mostrarToast(data.message || 'Credenciales invalidas.', 'error');
            }
        }
    } catch (err) {
        mostrarToast('Error de conexion con el servidor.', 'error');
    }
});

Object.keys(fields).forEach(key => {
    fields[key].addEventListener('input', () => {
        fields[key].closest('.form-group').classList.remove('error');
        errors[key].textContent = '';
    });
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const input = document.getElementById('password');
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    document.getElementById('eyeOpen').classList.toggle('hidden');
    document.getElementById('eyeClosed').classList.toggle('hidden');
});
