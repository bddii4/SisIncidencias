const form = document.getElementById('loginForm');
        const errorDiv = document.getElementById('errorMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorDiv.classList.remove('show');

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !password) {
                errorDiv.textContent = 'Todos los campos son obligatorios.';
                errorDiv.classList.add('show');
                return;
            }

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    window.location.href = '/dashboard';
                } else {
                    errorDiv.textContent = data.message || 'Credenciales inválidas.';
                    errorDiv.classList.add('show');
                }
            } catch (err) {
                errorDiv.textContent = 'Error de conexión con el servidor.';
                errorDiv.classList.add('show');
            }
        });