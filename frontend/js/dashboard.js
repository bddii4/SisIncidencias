let currentIncidenteId = null;
let chartTipo, chartEstado, chartPrioridad, chartTendencia;

function getBadgeClass(tipo, valor) {
    const map = {
        prioridad: { alta: 'badge-alta', media: 'badge-media', baja: 'badge-baja' },
        estado: {
            abierto: 'badge-abierto',
            'en proceso': 'badge-en-proceso',
            'espera información': 'badge-espera-información',
            'pendiente confirmación': 'badge-pendiente-confirmación',
            resuelto: 'badge-resuelto',
            cerrado: 'badge-cerrado'
        }
    };
    return (map[tipo] && map[tipo][valor]) || '';
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconMap = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${iconMap[type] || 'fa-info-circle'}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        toast.style.transition = '0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function renderKPI() {
    const total = incidencias.length;
    const abiertas = incidencias.filter(i => i.estado === 'abierto').length;
    const resueltas = incidencias.filter(i => i.estado === 'resuelto').length;
    const proceso = incidencias.filter(i => i.estado === 'en proceso').length;
    const cerradas = incidencias.filter(i => i.estado === 'cerrado').length;

    document.getElementById('kpiCards').innerHTML = `
        <div class="stat-card">
            <div class="stat-title"><i class="fas fa-list"></i> Total Incidencias</div>
            <div class="stat-value">${total}</div>
        </div>
        <div class="stat-card">
            <div class="stat-title"><i class="fas fa-spinner"></i> Abiertas</div>
            <div class="stat-value">${abiertas}</div>
        </div>
        <div class="stat-card">
            <div class="stat-title"><i class="fas fa-check-circle"></i> Resueltas</div>
            <div class="stat-value">${resueltas}</div>
        </div>
        <div class="stat-card">
            <div class="stat-title"><i class="fas fa-clock"></i> En proceso</div>
            <div class="stat-value">${proceso}</div>
        </div>
        <div class="stat-card">
            <div class="stat-title"><i class="fas fa-check-double"></i> Cerradas</div>
            <div class="stat-value">${cerradas}</div>
        </div>
    `;
}

function renderRecent() {
    const sorted = [...incidencias].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const recent = sorted.slice(0, 5);
    const container = document.getElementById('recentIncidenciasList');
    if (recent.length === 0) {
        container.innerHTML = '<span style="color:var(--text-secondary);">No hay incidencias recientes.</span>';
        return;
    }
    container.innerHTML = recent.map(i => `
        <div class="recent-item">
            <div>
                <strong>#${i.id}</strong> ${i.titulo}
                <span class="badge ${getBadgeClass('estado', i.estado)}" style="font-size:11px;">${capitalize(i.estado)}</span>
            </div>
            <span class="recent-date">${formatDate(i.fecha)}</span>
        </div>
    `).join('');
}

function renderIncidencias() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const prioridad = document.getElementById('filterPrioridad').value;
    const estado = document.getElementById('filterEstado').value;

    let data = incidencias.filter(i => {
        if (i.estado === 'cerrado') return false;
        let match = true;
        if (search) {
            match = match && (i.titulo.toLowerCase().includes(search) || i.usuario.toLowerCase().includes(search) || i.descripcion.toLowerCase().includes(search));
        }
        if (prioridad) match = match && i.prioridad === prioridad;
        if (estado) match = match && i.estado === estado;
        return match;
    });

    const tbody = document.getElementById('tablaIncidencias');
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-secondary);">
            <i class="fas fa-inbox" style="font-size:24px; display:block; margin-bottom:8px;"></i>
            No se encontraron incidencias con los filtros aplicados.
        </td></tr>`;
    } else {
        tbody.innerHTML = data.map(i => `
            <tr>
                <td><strong>#${i.id}</strong></td>
                <td>${i.titulo}</td>
                <td>${i.sistema}</td>
                <td><span class="badge ${getBadgeClass('prioridad', i.prioridad)}">${capitalize(i.prioridad)}</span></td>
                <td><span class="badge ${getBadgeClass('estado', i.estado)}">${capitalize(i.estado)}</span></td>
                <td>${i.usuario}</td>
                <td>${formatDate(i.fecha)}</td>
                <td style="text-align:center;">
                    <button class="btn-icon" onclick="abrirModal(${i.id})" title="Gestionar"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon danger" onclick="eliminarIncidencia(${i.id})" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `).join('');
    }
}

function renderCerrados() {
    const cerrados = incidencias.filter(i => i.estado === 'cerrado');
    const tbody = document.getElementById('tablaCerrados');
    if (cerrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-secondary);">No hay incidencias cerradas.</td></tr>`;
        return;
    }
    tbody.innerHTML = cerrados.map(i => `
        <tr>
            <td><strong>#${i.id}</strong></td>
            <td>${i.titulo}</td>
            <td>${i.sistema}</td>
            <td><span class="badge ${getBadgeClass('prioridad', i.prioridad)}">${capitalize(i.prioridad)}</span></td>
            <td>${i.usuario}</td>
            <td>${formatDate(i.fecha)}</td>
            <td style="text-align:center;">
                <button class="btn-icon" onclick="abrirModal(${i.id})" title="Ver detalle"><i class="fas fa-eye"></i></button>
            </td>
        </tr>
    `).join('');
}

function getTipo(inc) {
    const s = (inc.sistema || '').toLowerCase();
    if (s.includes('red') || s.includes('vpn') || s.includes('exchange') || s.includes('router') || s.includes('switch')) return 'red';
    if (s.includes('impresora') || s.includes('monitor') || s.includes('teclado') || s.includes('disco') || s.includes('laptop')) return 'hardware';
    if (s.includes('sap') || s.includes('facturación') || s.includes('windows') || s.includes('erp') || s.includes('server')) return 'software';
    return 'otros';
}

function initCharts() {
    const colores = ['#2a5298', '#3b82f6', '#93c5fd', '#f59e0b'];

    const tipos = ['red', 'hardware', 'software', 'otros'];
    const countsTipo = tipos.map(t => incidencias.filter(i => getTipo(i) === t).length);
    chartTipo = new Chart(document.getElementById('chartTipo'), {
        type: 'pie',
        data: {
            labels: ['Red', 'Hardware', 'Software', 'Otros'],
            datasets: [{ data: countsTipo, backgroundColor: colores, borderWidth: 0 }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });

    const estados = ['abierto', 'en proceso', 'espera información', 'pendiente confirmación', 'resuelto', 'cerrado'];
    const countsEstado = estados.map(e => incidencias.filter(i => i.estado === e).length);
    chartEstado = new Chart(document.getElementById('chartEstado'), {
        type: 'doughnut',
        data: {
            labels: estados.map(capitalize),
            datasets: [{ data: countsEstado, backgroundColor: ['#DBEAFE', '#E0E7FF', '#FEF3C7', '#FCE4EC', '#D1FAE5', '#E2E8F0'], borderWidth: 0 }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });

    const prioridades = ['alta', 'media', 'baja'];
    const countsPrioridad = prioridades.map(p => incidencias.filter(i => i.prioridad === p).length);
    chartPrioridad = new Chart(document.getElementById('chartPrioridad'), {
        type: 'bar',
        data: {
            labels: ['Alta', 'Media', 'Baja'],
            datasets: [{ label: 'Incidencias', data: countsPrioridad, backgroundColor: ['#FEE2E2', '#FEF3C7', '#D1FAE5'], borderRadius: 6 }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    updateTendencia();
}

function updateTendencia() {
    const hoy = new Date();
    const fechas = [];
    const counts = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(hoy);
        d.setDate(d.getDate() - i);
        const fechaStr = d.toISOString().split('T')[0];
        fechas.push(formatDate(fechaStr));
        counts.push(incidencias.filter(item => item.fecha === fechaStr).length);
    }
    if (chartTendencia) chartTendencia.destroy();
    const ctx = document.getElementById('chartTendencia').getContext('2d');
    chartTendencia = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Incidencias creadas',
                data: counts,
                borderColor: '#2a5298',
                backgroundColor: 'rgba(42,82,152,0.1)',
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#2a5298'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });
}

function renderStatsSummary() {
    const estados = ['abierto', 'en proceso', 'espera información', 'pendiente confirmación', 'resuelto', 'cerrado'];
    const tbody = document.getElementById('statsSummaryBody');
    let rows = '';
    estados.forEach(est => {
        const items = incidencias.filter(i => i.estado === est);
        const total = items.length;
        const red = items.filter(i => getTipo(i) === 'red').length;
        const hw = items.filter(i => getTipo(i) === 'hardware').length;
        const sw = items.filter(i => getTipo(i) === 'software').length;
        const otros = items.filter(i => getTipo(i) === 'otros').length;
        rows += `<tr>
            <td><strong>${capitalize(est)}</strong></td>
            <td>${red}</td>
            <td>${hw}</td>
            <td>${sw}</td>
            <td>${otros}</td>
            <td><strong>${total}</strong></td>
        </tr>`;
    });
    tbody.innerHTML = rows;
}

function abrirModal(id) {
    const inc = incidencias.find(i => i.id === id);
    if (!inc) return;
    currentIncidenteId = id;
    document.getElementById('modalIncId').textContent = `#${inc.id} - ${inc.titulo}`;
    document.getElementById('modalInfo').innerHTML = `
        <div style="display:flex; gap:20px; flex-wrap:wrap; margin-bottom:12px;">
            <div><strong>Nombre:</strong> ${inc.nombre}</div>
            <div><strong>Área:</strong> ${inc.area}</div>
        </div>
        <div style="display:flex; gap:20px; flex-wrap:wrap; margin-bottom:12px;">
            <div><strong>Sistema:</strong> ${inc.sistema}</div>
            <div><strong>Prioridad:</strong> <span class="badge ${getBadgeClass('prioridad', inc.prioridad)}">${capitalize(inc.prioridad)}</span></div>
        </div>
        <div style="display:flex; gap:20px; flex-wrap:wrap; margin-bottom:20px;">
            <div><strong>Fecha:</strong> ${inc.fecha}</div>
            <div><strong>Hora:</strong> ${inc.hora || '—'}</div>
        </div>
    `;
    document.getElementById('modalDesc').textContent = inc.descripcion;
    document.getElementById('modalProcesos').textContent = inc.procesos || 'Sin procesos registrados.';

    const evidenciaDiv = document.getElementById('modalEvidencia');
    if (inc.evidencia && inc.evidencia.length > 0) {
        evidenciaDiv.innerHTML = inc.evidencia.map(e => `<i class="fas fa-file"></i> ${e}`).join('<br>');
    } else {
        evidenciaDiv.innerHTML = '<span style="color:#94a3b8; font-style:italic;">Sin evidencia adjunta</span>';
    }

    document.getElementById('modalEstado').value = inc.estado;
    document.getElementById('modalTipo').value = inc.tipo || '';

    const badge = document.getElementById('modalEstadoBadge');
    badge.textContent = capitalize(inc.estado);
    badge.className = `badge ${getBadgeClass('estado', inc.estado)}`;
    document.getElementById('modalTicketRef').textContent = `Ticket #${inc.id}`;

    const isCerrado = inc.estado === 'cerrado';
    document.getElementById('modalEstado').closest('.form-row').style.display = isCerrado ? 'none' : 'grid';
    document.querySelector('.modal-footer-right').style.display = isCerrado ? 'none' : 'flex';

    // Conversación
    const chatSection = document.getElementById('modalChatSection');
    const chatMsg = document.getElementById('modalChatMessages');
    const chatInput = document.getElementById('modalChatInputArea');
    const msgs = inc.conversacion || [];
    if (msgs.length > 0 || !isCerrado) {
        chatSection.style.display = '';
        chatMsg.innerHTML = msgs.length ? msgs.map(m => `
            <div class="chat-msg ${m.de === 'admin' ? 'msg-admin' : 'msg-user'}">
                <div class="msg-bubble">${m.texto}</div>
                <div class="msg-meta">${m.de === 'admin' ? 'Tú' : inc.nombre} · ${m.fecha}</div>
            </div>
        `).join('') : '<p style="color:var(--text-secondary);text-align:center;padding:12px;">Sin mensajes aún</p>';
        chatInput.style.display = isCerrado ? 'none' : 'flex';
    } else {
        chatSection.style.display = 'none';
    }

    document.getElementById('modalGestion').classList.add('active');
}

function enviarMensajeAdmin() {
    if (!currentIncidenteId) return;
    const inc = incidencias.find(i => i.id === currentIncidenteId);
    if (!inc) return;
    const input = document.getElementById('modalChatInput');
    const texto = input.value.trim();
    if (!texto) return;
    if (!inc.conversacion) inc.conversacion = [];
    inc.conversacion.push({ de: 'admin', texto, fecha: new Date().toLocaleString('es-MX') });
    input.value = '';
    const id = currentIncidenteId;
    currentIncidenteId = null;
    abrirModal(id);
    showToast('Mensaje enviado', 'success');
}

function cerrarModal() {
    document.getElementById('modalGestion').classList.remove('active');
    currentIncidenteId = null;
}

function guardarEstado() {
    if (!currentIncidenteId) return;
    const inc = incidencias.find(i => i.id === currentIncidenteId);
    if (!inc) return;
    const nuevoEstado = document.getElementById('modalEstado').value;
    const nuevoTipo = document.getElementById('modalTipo').value;

    inc.estado = nuevoEstado;
    if (nuevoTipo) inc.tipo = nuevoTipo;

    showToast('Incidencia actualizada correctamente', 'success');
    cerrarModal();
    renderKPI();
    renderRecent();
    renderIncidencias();
    renderCerrados();
    actualizarGraficos();
}

function actualizarGraficos() {
    const tipos = ['red', 'hardware', 'software', 'otros'];
    chartTipo.data.datasets[0].data = tipos.map(t => incidencias.filter(i => getTipo(i) === t).length);
    chartTipo.update();

    const estados = ['abierto', 'en proceso', 'espera información', 'pendiente confirmación', 'resuelto', 'cerrado'];
    chartEstado.data.datasets[0].data = estados.map(e => incidencias.filter(i => i.estado === e).length);
    chartEstado.update();

    const prioridades = ['alta', 'media', 'baja'];
    chartPrioridad.data.datasets[0].data = prioridades.map(p => incidencias.filter(i => i.prioridad === p).length);
    chartPrioridad.update();

    updateTendencia();
    renderStatsSummary();
}

function eliminarIncidencia(id) {
    if (!confirm('¿Estás seguro de eliminar esta incidencia? Esta acción no se puede deshacer.')) return;
    incidencias = incidencias.filter(i => i.id !== id);
    showToast('Incidencia eliminada correctamente.', 'error');
    renderKPI();
    renderRecent();
    renderIncidencias();
    renderCerrados();
    actualizarGraficos();
}

document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(`section-${section}`).classList.add('active');
            document.getElementById('pageTitle').textContent = this.textContent.trim();
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('overlay').classList.remove('active');
            if (section === 'estadisticas') { actualizarGraficos(); }
            if (section === 'cerrados') { renderCerrados(); }
            if (section === 'incidencias') { renderIncidencias(); }
        });
    });

    document.getElementById('menuToggle').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('overlay').classList.toggle('active');
    });

    document.getElementById('overlay').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('open');
        this.classList.remove('active');
    });

    document.getElementById('btnLogout').addEventListener('click', function() {
        if (confirm('¿Seguro que deseas cerrar sesión?')) {
            showToast('Sesión cerrada correctamente.', 'info');
        }
    });

    document.getElementById('modalGestion').addEventListener('click', function(e) {
        if (e.target === this) cerrarModal();
    });

    ['searchInput', 'filterPrioridad', 'filterEstado'].forEach(id => {
        document.getElementById(id).addEventListener('change', renderIncidencias);
        if (id === 'searchInput') {
            document.getElementById(id).addEventListener('input', renderIncidencias);
        }
    });

    renderKPI();
    renderRecent();
    renderIncidencias();
    renderCerrados();
    initCharts();
    renderStatsSummary();
});
