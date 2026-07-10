let incidencias = [
    { id: 1, titulo: 'Caída de red en oficina central', nombre: 'Juan Pérez López', area: 'Sistemas', sistema: 'Red corporativa', prioridad: 'alta', estado: 'abierto', usuario: 'Juan P.', fecha: '2025-04-01', descripcion: 'Se reporta caída total de la red en el piso 3. No hay acceso a internet ni a recursos internos.', procesos: 'Se reinició el switch principal y se verificaron cables de fibra óptica.', evidencia: ['captura_ping.png'], conversacion: [
        { de: 'admin', texto: 'Estamos revisando el switch.', fecha: '2025-04-01 11:20' }
    ]},
    { id: 2, titulo: 'Problema con impresora láser', nombre: 'María López García', area: 'Administración', sistema: 'Impresora HP LaserJet', prioridad: 'media', estado: 'en proceso', usuario: 'María L.', fecha: '2025-04-02', descripcion: 'La impresora no imprime y muestra error de atascamiento, pero no hay papel atascado.', procesos: 'Se limpiaron los rodillos y se actualizó el firmware.', evidencia: [], conversacion: [
        { de: 'admin', texto: 'Revisaré la impresora esta tarde.', fecha: '2025-04-02 10:45' }
    ]},
    { id: 3, titulo: 'Error al actualizar software contable', nombre: 'Pedro Gómez Ruiz', area: 'Contabilidad', sistema: 'SAP ERP', prioridad: 'alta', estado: 'espera información', usuario: 'Pedro G.', fecha: '2025-04-03', descripcion: 'Al intentar actualizar el módulo de facturación, el sistema arroja error SQL y no permite continuar.', procesos: 'Se revisaron los logs y se contactó al proveedor.', evidencia: ['error_sql.log'], conversacion: [
        { de: 'admin', texto: 'Necesitamos los logs completos del error.', fecha: '2025-04-03 09:45' }
    ]},
    { id: 4, titulo: 'Monitor no enciende', nombre: 'Laura Sánchez Díaz', area: 'Ventas', sistema: 'Monitor Dell 27"', prioridad: 'baja', estado: 'resuelto', usuario: 'Laura S.', fecha: '2025-04-04', descripcion: 'El monitor de la estación de trabajo no enciende, ya se probó con otro cable de alimentación.', procesos: 'Se reemplazó el cable de poder y se probó con otro monitor.', evidencia: ['monitor_reemplazo.jpg'], conversacion: [
        { de: 'admin', texto: 'Se reemplazó el monitor defectuoso.', fecha: '2025-04-04 15:30' }
    ]},
    { id: 5, titulo: 'Fallo en servidor de correo', nombre: 'Roberto Díaz Martínez', area: 'Sistemas', sistema: 'Microsoft Exchange', prioridad: 'alta', estado: 'pendiente confirmación', usuario: 'Roberto D.', fecha: '2025-04-05', descripcion: 'El servidor de correo no responde, los usuarios no pueden enviar ni recibir correos.', procesos: 'Se reinició el servicio y se revisaron los registros DNS.', evidencia: ['dns_logs.txt'], conversacion: [
        { de: 'admin', texto: 'El servicio ya responde, por favor confirma que todo funcione.', fecha: '2025-04-05 09:00' }
    ]},
    { id: 6, titulo: 'Problema de permisos en carpeta compartida', nombre: 'Carmen Ruiz Torres', area: 'Recursos Humanos', sistema: 'Servidor de archivos', prioridad: 'media', estado: 'cerrado', usuario: 'Carmen R.', fecha: '2025-04-06', descripcion: 'Varios usuarios no pueden acceder a la carpeta compartida "Proyectos". Se requiere revisar permisos.', procesos: 'Se ajustaron los permisos en el servidor de archivos.', evidencia: [], conversacion: [
        { de: 'admin', texto: 'Permisos corregidos, cerrando incidencia.', fecha: '2025-04-06 11:35' }
    ]},
    { id: 7, titulo: 'Lentitud en acceso a base de datos', nombre: 'José Martínez López', area: 'Sistemas', sistema: 'Oracle DB', prioridad: 'alta', estado: 'abierto', usuario: 'José M.', fecha: '2025-04-07', descripcion: 'Las consultas a la base de datos de producción están tomando más de 5 segundos, afectando la aplicación.', procesos: 'Se revisaron los índices y se analizó el tráfico de red.', evidencia: ['query_plan.txt'], conversacion: []},
    { id: 8, titulo: 'Teclado inalámbrico sin respuesta', nombre: 'Elena Castro Fernández', area: 'Diseño', sistema: 'Teclado Logitech', prioridad: 'baja', estado: 'resuelto', usuario: 'Elena C.', fecha: '2025-04-08', descripcion: 'El teclado inalámbrico no responde, se cambiaron las pilas pero sigue sin funcionar.', procesos: 'Se reinstalaron los drivers y se probó en otro equipo.', evidencia: ['teclado_test.jpg'], conversacion: [
        { de: 'admin', texto: 'Se reemplazó el teclado por uno nuevo.', fecha: '2025-04-08 14:25' }
    ]},
    { id: 9, titulo: 'Error en módulo de facturación', nombre: 'Luis Fernández García', area: 'Contabilidad', sistema: 'Sistema de facturación', prioridad: 'media', estado: 'en proceso', usuario: 'Luis F.', fecha: '2025-04-09', descripcion: 'Al generar una factura, el sistema muestra un error de validación de IVA.', procesos: 'Se revisó la lógica de cálculo y se contactó al desarrollador.', evidencia: ['factura_error.png'], conversacion: [
        { de: 'admin', texto: 'Estoy revisando el código del cálculo de IVA.', fecha: '2025-04-09 12:30' }
    ]},
    { id: 10, titulo: 'Problema de conectividad VPN', nombre: 'Andrea Torres Ruiz', area: 'Ventas', sistema: 'VPN Corporativo', prioridad: 'alta', estado: 'espera información', usuario: 'Andrea T.', fecha: '2025-04-10', descripcion: 'Los usuarios remotos no pueden establecer conexión VPN, el cliente muestra error de autenticación.', procesos: 'Se verificaron las credenciales y se revisó el servidor VPN.', evidencia: ['vpn_logs.txt'], conversacion: [
        { de: 'admin', texto: 'Necesito los logs del cliente VPN para revisar.', fecha: '2025-04-10 09:35' }
    ]},
    { id: 11, titulo: 'Fallo en disco duro externo', nombre: 'Miguel Ángel Pérez', area: 'Sistemas', sistema: 'Disco WD 2TB', prioridad: 'media', estado: 'cerrado', usuario: 'Miguel Á.', fecha: '2025-04-11', descripcion: 'El disco duro externo no es reconocido por el sistema operativo.', procesos: 'Se probó en otro puerto USB y se ejecutó chkdsk.', evidencia: ['disco_fallo.jpg'], conversacion: [
        { de: 'admin', texto: 'El disco está dañado, se reemplazará por uno nuevo.', fecha: '2025-04-11 16:05' }
    ]},
    { id: 12, titulo: 'Actualización de sistema operativo fallida', nombre: 'Sofía Ramírez López', area: 'Mercadotecnia', sistema: 'Windows 11', prioridad: 'alta', estado: 'abierto', usuario: 'Sofía R.', fecha: '2025-04-12', descripcion: 'La actualización de Windows se detuvo al 75% y ahora el equipo no inicia correctamente.', procesos: 'Se intentó restaurar desde punto de recuperación del sistema.', evidencia: ['update_error.png'], conversacion: []}
];

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
