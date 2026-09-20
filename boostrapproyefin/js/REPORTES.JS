(function(){
  const listaObservaciones = document.getElementById('listaObservaciones');
  const zonaCarga = document.getElementById('zonaCarga');
  const inputArchivos = document.getElementById('inputArchivos');
  const galeria = document.getElementById('galeria');
  const zonaDocumento = document.getElementById('zonaDocumento');

  const hoy = new Date();
  document.getElementById('fechaHoy').textContent = hoy.toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' });
  document.getElementById('fechaReporte').value = hoy.toISOString().slice(0,10);

  let contadorObs = 0;
  let contadorMedia = 0;
  const mediaItems = []; // { id, tipo: 'imagen'|'video', nombre, url }

  function filaObservacion(){
    contadorObs++;
    const bloque = document.createElement('div');
    bloque.className = 'bloque-observacion';
    bloque.dataset.id = contadorObs;
    bloque.innerHTML = `
      <button type="button" class="quitar-obs" title="Quitar observación">×</button>
      <div class="campo">
        <label>Título</label>
        <input type="text" class="obs-titulo-input" placeholder="Ej. Hallazgo en tablero principal">
      </div>
      <div class="campo" style="margin-bottom:0;">
        <label>Descripción</label>
        <textarea class="obs-texto-input" placeholder="Describe la observación..."></textarea>
      </div>
    `;
    bloque.querySelector('.quitar-obs').addEventListener('click', () => bloque.remove());
    listaObservaciones.appendChild(bloque);
  }

  document.getElementById('btnAgregarObs').addEventListener('click', filaObservacion);
  filaObservacion();

  // Carga de archivos
  zonaCarga.addEventListener('click', () => inputArchivos.click());

  ['dragover'].forEach(evt => {
    zonaCarga.addEventListener(evt, e => {
      e.preventDefault();
      zonaCarga.classList.add('arrastrando');
    });
  });
  ['dragleave','drop'].forEach(evt => {
    zonaCarga.addEventListener(evt, e => {
      e.preventDefault();
      zonaCarga.classList.remove('arrastrando');
    });
  });
  zonaCarga.addEventListener('drop', e => {
    manejarArchivos(e.dataTransfer.files);
  });
  inputArchivos.addEventListener('change', e => {
    manejarArchivos(e.target.files);
    inputArchivos.value = '';
  });

  function manejarArchivos(files){
    Array.from(files).forEach(file => {
      const esImagen = file.type.startsWith('image/');
      const esVideo = file.type.startsWith('video/');
      if (!esImagen && !esVideo) return;
      contadorMedia++;
      const url = URL.createObjectURL(file);
      const item = { id: contadorMedia, tipo: esImagen ? 'imagen' : 'video', nombre: file.name, url };
      mediaItems.push(item);
      renderMiniatura(item);
    });
  }

  function renderMiniatura(item){
    const div = document.createElement('div');
    div.className = 'miniatura';
    div.dataset.id = item.id;
    const contenido = item.tipo === 'imagen'
      ? `<img src="${item.url}" alt="${item.nombre}">`
      : `<video src="${item.url}" muted></video>`;
    div.innerHTML = `
      ${contenido}
      <button type="button" class="quitar-media" title="Quitar">×</button>
      <div class="etiqueta-tipo">${item.tipo === 'imagen' ? '📷' : '🎬'} ${item.nombre}</div>
    `;
    div.querySelector('.quitar-media').addEventListener('click', () => {
      const idx = mediaItems.findIndex(m => m.id === item.id);
      if (idx > -1) mediaItems.splice(idx, 1);
      div.remove();
    });
    galeria.appendChild(div);
  }

  let contadorReporte = 100;

  document.getElementById('btnGenerar').addEventListener('click', function(){
    const reporteId = document.getElementById('reporteId').value.trim() || 'REP-0000';
    const fechaReporte = document.getElementById('fechaReporte').value;
    const titulo = document.getElementById('tituloReporte').value.trim() || 'Reporte sin título';
    const responsable = document.getElementById('responsable').value.trim();
    const ubicacion = document.getElementById('ubicacion').value.trim();

    const observaciones = [];
    listaObservaciones.querySelectorAll('.bloque-observacion').forEach(b => {
      const t = b.querySelector('.obs-titulo-input').value.trim();
      const d = b.querySelector('.obs-texto-input').value.trim();
      if (t || d) observaciones.push({ titulo: t || 'Observación', texto: d });
    });

    contadorReporte++;
    const numeroReporte = 'RPT-' + contadorReporte;

    const obsHTML = observaciones.map(o => `
      <div class="obs-final">
        <div class="obs-titulo">${o.titulo}</div>
        <div class="obs-texto">${o.texto || '—'}</div>
      </div>
    `).join('') || '<div class="obs-final"><div class="obs-texto">Sin observaciones registradas.</div></div>';

    const fotos = mediaItems.filter(m => m.tipo === 'imagen');
    const videos = mediaItems.filter(m => m.tipo === 'video');

    const galeriaHTML = mediaItems.length
      ? `<div class="galeria-final">${mediaItems.map(m => `
          <figure>
            ${m.tipo === 'imagen' ? `<img src="${m.url}" alt="${m.nombre}">` : `<video src="${m.url}" controls></video>`}
            <figcaption>${m.tipo === 'imagen' ? '📷' : '🎬'} ${m.nombre}</figcaption>
          </figure>
        `).join('')}</div>`
      : '<p style="color:var(--ink-soft);font-size:0.9rem;">No se adjuntó evidencia.</p>';

    zonaDocumento.innerHTML = `
      <div class="documento">
        <div class="documento-encabezado">
          <div class="titulo-reporte">${titulo}</div>
          <div class="meta-reporte">
            <span>${numeroReporte}</span>
            <span>Orden: ${reporteId}</span>
            <span>Fecha: ${fechaReporte}</span>
            ${responsable ? `<span>Responsable: ${responsable}</span>` : ''}
            ${ubicacion ? `<span>Ubicación: ${ubicacion}</span>` : ''}
          </div>
        </div>

        <div class="documento-seccion">
          <h3>Observaciones</h3>
          ${obsHTML}
        </div>

        <div class="documento-seccion">
          <h3>Evidencia adjunta (${fotos.length} foto${fotos.length===1?'':'s'}, ${videos.length} video${videos.length===1?'':'s'})</h3>
          ${galeriaHTML}
        </div>

        <div class="documento-pie">Reporte generado automáticamente. Los videos solo son reproducibles en pantalla; al imprimir se muestran únicamente las fotos.</div>
      </div>
      <div class="acciones-reporte">
        <button type="button" class="btn-imprimir" id="btnImprimir">Imprimir / guardar PDF</button>
        <button type="button" class="btn-nuevo" id="btnNuevoReporte">Nuevo reporte</button>
      </div>
    `;

    document.getElementById('btnImprimir').addEventListener('click', () => window.print());
    document.getElementById('btnNuevoReporte').addEventListener('click', () => {
      document.getElementById('reporteId').value = '';
      document.getElementById('tituloReporte').value = '';
      document.getElementById('responsable').value = '';
      document.getElementById('ubicacion').value = '';
      listaObservaciones.innerHTML = ''; filaObservacion();
      mediaItems.length = 0;
      galeria.innerHTML = '';
      zonaDocumento.innerHTML = '<div class="placeholder-reporte">Completa los datos, agrega observaciones y evidencia, luego presiona «Generar reporte» para ver el documento aquí.</div>';
    });

    zonaDocumento.scrollIntoView({ behavior:'smooth', block:'start' });
  });
})();