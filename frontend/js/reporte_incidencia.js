let reportes = [];

function badgeClass(estado) {
    const map = { 'abierto': 'badge-red', 'en proceso': 'badge-yellow', 'espera información': 'badge-orange', 'pendiente confirmación': 'badge-blue', 'resuelto': 'badge-green', 'cerrado': 'badge-gray' };
    return map[estado] || 'badge-gray';
}

function puedeChat(estado) {
    return estado === 'espera información' || estado === 'pendiente confirmación';
}

function renderReportes() {
    const list = document.getElementById('reportList');
    list.innerHTML = '';
    if (reportes.length === 0) {
        list.innerHTML = '<div class="empty-msg"><i class="fas fa-inbox"></i><p>No has reportado ninguna incidencia aún</p></div>';
        return;
    }
    reportes.forEach((r, idx) => {
        const card = document.createElement('div');
        card.className = 'report-card';

        const tieneChat = r.chat && r.chat.length > 0;
        const chatActivo = tieneChat && puedeChat(r.estado);
        const chatCerrado = r.estado === 'cerrado' && tieneChat;

        card.innerHTML = `
            <div class="report-head" data-index="${idx}">
                <div class="report-head-left">
                    <div class="titulo">${r.titulo}</div>
                    <div class="meta">
                        <span>#${r.id}</span>
                        <span>${r.sistema}</span>
                        <span>${r.fecha} ${r.hora}</span>
                    </div>
                </div>
                <div class="report-head-right">
                    <span class="badge ${badgeClass(r.estado)}">${r.estado}</span>
                    ${tieneChat ? '<i class="fas fa-comment-dots" style="color:#2a5298;"></i>' : ''}
                    <i class="fas fa-chevron-down report-arrow"></i>
                </div>
            </div>
            ${tieneChat ? `
            <div class="report-chat">
                <div class="chat-header"><i class="fas fa-comments"></i> Conversación</div>
                <div class="chat-body">
                    ${r.chat.map(m => `
                        <div class="chat-msg ${m.de === 'admin' ? 'admin' : 'yo'}">
                            ${m.texto}
                            <div class="time">${m.fecha}</div>
                        </div>
                    `).join('')}
                </div>
                ${chatActivo ? `
                <div class="chat-input-area">
                    <textarea id="chatInput-${r.id}" rows="1" placeholder="Escribe tu respuesta..."></textarea>
                    <button class="chat-send" onclick="enviarChat(${r.id})"><i class="fas fa-paper-plane"></i></button>
                </div>
                ` : chatCerrado ? `
                <div class="chat-input-area disabled">
                    <p><i class="fas fa-lock"></i> Chat cerrado — este reporte está cerrado</p>
                </div>
                ` : `
                <div class="chat-input-area disabled">
                    <p>Esperando mensaje del administrador...</p>
                </div>
                `}
            </div>
            ` : ''}
        `;
        list.appendChild(card);
    });

    document.querySelectorAll('.report-head').forEach(el => {
        el.addEventListener('click', () => {
            const chat = el.parentElement.querySelector('.report-chat');
            const arrow = el.querySelector('.report-arrow');
            if (chat) {
                chat.classList.toggle('open');
                arrow.classList.toggle('open');
            }
        });
    });
}

async function cargarReportes() {
    try {
        const res = await fetch('/api/reporte/');
        if (res.ok) {
            reportes = await res.json();
        }
    } catch (err) {
        showToast('Error al cargar reportes', true);
    }
    renderReportes();
}

function enviarChat(id) {
    const input = document.getElementById('chatInput-' + id);
    const texto = input.value.trim();
    if (!texto) return;
    const r = reportes.find(x => x.id === id);
    if (!r) return;
    r.chat.push({ de: 'yo', texto, fecha: new Date().toLocaleString('es-MX') });
    input.value = '';
    renderReportes();
    showToast('Respuesta enviada');
}

document.getElementById('btnNuevo').addEventListener('click', () => {
    const formCard = document.getElementById('formCard');
    const reportList = document.getElementById('reportList');
    const btn = document.getElementById('btnNuevo');
    const isOpen = formCard.classList.contains('open');
    if (!isOpen) {
        formCard.classList.add('open');
        reportList.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-times"></i> Cancelar';
    } else {
        formCard.classList.remove('open');
        reportList.style.display = '';
        btn.innerHTML = '<i class="fas fa-plus"></i> Nuevo reporte';
    }
});

document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const area = document.getElementById('area').value.trim();
    const titulo = document.getElementById('titulo').value.trim();
    const sistema = document.getElementById('sistema').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const procesos = document.getElementById('procesos').value.trim();
    if (!nombre || !area || !titulo || !sistema || !descripcion || !procesos) {
        showToast('Completa todos los campos obligatorios', true); return;
    }
    const btn = document.getElementById('btnSubmit');
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {
        //crea un objeto fromdata que permite enviar texto y archivo en una misma peticion
        const formData = new FormData();
        //agrega cada archivo seleccionado
        formData.append('nombre', nombre);
        formData.append('area', area);
        formData.append('titulo', titulo);
        formData.append('sistema', sistema);
        formData.append('descripcion', descripcion);
        formData.append('procesos', procesos);
        files.forEach(f => formData.append('files', f));
        
        const res = await fetch('/api/reporte/', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            const data = await res.json();
            reportes.unshift({
                id: data.id, titulo, nombre, area, sistema,
                prioridad: 'media', estado: 'abierto',
                fecha: new Date().toLocaleDateString('es-MX'),
                hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
                chat: []
            });
            document.getElementById('reportForm').reset();
            files = []; renderFiles();
            document.getElementById('formCard').classList.remove('open');
            document.getElementById('reportList').style.display = '';
            document.getElementById('btnNuevo').innerHTML = '<i class="fas fa-plus"></i> Nuevo reporte';
            renderReportes();
            showToast('Reporte enviado correctamente');
        } else {
            showToast('Error al enviar reporte', true);
        }
    } catch (err) {
        showToast('Error de conexión con el servidor', true);
    }
    btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar reporte';
});

const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const fileUploadArea = document.getElementById('fileUploadArea');
let files = [];
fileUploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    Array.from(e.target.files).slice(0, 5 - files.length).forEach(f => files.push(f));
    renderFiles(); fileInput.value = '';
});
function renderFiles() {
    fileList.innerHTML = '';
    files.forEach((f, i) => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `<i class="fas fa-file"></i> ${f.name} <span class="remove" data-index="${i}">&times;</span>`;
        fileList.appendChild(div);
    });
    document.querySelectorAll('.remove').forEach(el => {
        el.addEventListener('click', () => { files.splice(parseInt(el.dataset.index), 1); renderFiles(); });
    });
}

function showToast(msg, isError) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.className = 'toast' + (isError ? ' error' : '');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

cargarReportes();