(function(){
  const listaItems = document.getElementById('listaItems');
  const listaManoObra = document.getElementById('listaManoObra');
  const listaPagos = document.getElementById('listaPagos');
  const totalPagadoResumen = document.getElementById('totalPagadoResumen');
  const zonaRecibo = document.getElementById('zonaRecibo');

  let contadorItem = 0;
  let contadorMO = 0;
  let contadorPago = 0;

  const hoy = new Date();
  document.getElementById('fechaHoy').textContent = hoy.toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' });
  document.getElementById('fechaOrden').value = hoy.toISOString().slice(0,10);

  function formatoMoneda(valor){
    return '$ ' + Math.round(valor).toLocaleString('es-CO');
  }

  function filaItem(){
    contadorItem++;
    const fila = document.createElement('div');
    fila.className = 'fila-item';
    fila.dataset.id = contadorItem;
    fila.innerHTML = `
      <div class="campo"><label>Concepto</label><input type="text" class="item-desc" placeholder="Repuesto o servicio"></div>
      <div class="campo"><label>Cant.</label><input type="number" class="item-cant" min="1" step="1" value="1"></div>
      <div class="campo"><label>Valor unit.</label><input type="number" class="item-valor" min="0" step="1000" value="0"></div>
      <button type="button" class="boton-quitar" title="Quitar línea">×</button>
    `;
    fila.querySelector('.boton-quitar').addEventListener('click', () => fila.remove());
    listaItems.appendChild(fila);
  }

  function filaManoObra(){
    contadorMO++;
    const fila = document.createElement('div');
    fila.className = 'fila-item';
    fila.dataset.id = contadorMO;
    fila.innerHTML = `
      <div class="campo"><label>Concepto</label><input type="text" class="mo-desc" placeholder="Ej. Diagnóstico, ajuste"></div>
      <div class="campo"><label>Cant.</label><input type="number" class="mo-cant" min="1" step="1" value="1"></div>
      <div class="campo"><label>Valor</label><input type="number" class="mo-valor" min="0" step="1000" value="0"></div>
      <button type="button" class="boton-quitar" title="Quitar línea">×</button>
    `;
    fila.querySelector('.boton-quitar').addEventListener('click', () => fila.remove());
    listaManoObra.appendChild(fila);
  }

  function filaPago(){
    contadorPago++;
    const fila = document.createElement('div');
    fila.className = 'fila-pago';
    fila.dataset.id = contadorPago;
    fila.innerHTML = `
      <div class="campo"><label>Método</label>
        <select class="pago-metodo">
          <option>Efectivo</option>
          <option>Transferencia</option>
          <option>Tarjeta débito</option>
          <option>Tarjeta crédito</option>
        </select>
      </div>
      <div class="campo"><label>Fecha</label><input type="date" class="pago-fecha" value="${hoy.toISOString().slice(0,10)}"></div>
      <div class="campo"><label>Monto</label><input type="number" class="pago-monto" min="0" step="1000" value="0"></div>
      <button type="button" class="boton-quitar" title="Quitar pago">×</button>
    `;
    fila.querySelector('.boton-quitar').addEventListener('click', () => { fila.remove(); actualizarResumenPagos(); });
    fila.querySelector('.pago-monto').addEventListener('input', actualizarResumenPagos);
    listaPagos.appendChild(fila);
  }

  function actualizarResumenPagos(){
    let total = 0;
    document.querySelectorAll('.pago-monto').forEach(inp => total += Number(inp.value) || 0);
    totalPagadoResumen.textContent = formatoMoneda(total);
  }

  document.getElementById('btnAgregarItem').addEventListener('click', filaItem);
  document.getElementById('btnAgregarMO').addEventListener('click', filaManoObra);
  document.getElementById('btnAgregarPago').addEventListener('click', filaPago);

  filaItem();
  filaManoObra();
  filaPago();

  function recolectarItems(){
    const filas = [];
    listaItems.querySelectorAll('.fila-item').forEach(f => {
      const desc = f.querySelector('.item-desc').value.trim();
      const cant = Number(f.querySelector('.item-cant').value) || 0;
      const valor = Number(f.querySelector('.item-valor').value) || 0;
      if (desc && cant > 0){
        filas.push({ desc, cant, valor, total: cant * valor });
      }
    });
    return filas;
  }

  function recolectarManoObra(){
    const filas = [];
    const horas = Number(document.getElementById('horasMO').value) || 0;
    const tarifa = Number(document.getElementById('tarifaMO').value) || 0;
    if (horas > 0 && tarifa > 0){
      filas.push({ desc: `Mano de obra (${horas} h × ${formatoMoneda(tarifa)})`, cant: 1, valor: horas * tarifa, total: horas * tarifa });
    }
    listaManoObra.querySelectorAll('.fila-item').forEach(f => {
      const desc = f.querySelector('.mo-desc').value.trim();
      const cant = Number(f.querySelector('.mo-cant').value) || 0;
      const valor = Number(f.querySelector('.mo-valor').value) || 0;
      if (desc && cant > 0){
        filas.push({ desc, cant, valor, total: cant * valor });
      }
    });
    return filas;
  }

  function recolectarPagos(){
    const filas = [];
    listaPagos.querySelectorAll('.fila-pago').forEach(f => {
      const metodo = f.querySelector('.pago-metodo').value;
      const fecha = f.querySelector('.pago-fecha').value;
      const monto = Number(f.querySelector('.pago-monto').value) || 0;
      if (monto > 0){
        filas.push({ metodo, fecha, monto });
      }
    });
    return filas;
  }

  let contadorFactura = 1000;

  document.getElementById('btnGenerar').addEventListener('click', function(){
    const ordenId = document.getElementById('ordenId').value.trim() || 'OS-0000';
    const fechaOrden = document.getElementById('fechaOrden').value;
    const cliente = document.getElementById('clienteNombre').value.trim() || 'Cliente sin nombre';
    const clienteDoc = document.getElementById('clienteDoc').value.trim();
    const equipo = document.getElementById('equipoDetalle').value.trim();

    const items = recolectarItems();
    const manoObra = recolectarManoObra();
    const pagos = recolectarPagos();
    const tasaImpuesto = Number(document.getElementById('tasaImpuesto').value) || 0;

    const subtotalItems = items.reduce((s, i) => s + i.total, 0);
    const subtotalMO = manoObra.reduce((s, i) => s + i.total, 0);
    const subtotal = subtotalItems + subtotalMO;
    const impuesto = subtotal * (tasaImpuesto / 100);
    const total = subtotal + impuesto;
    const totalPagado = pagos.reduce((s, p) => s + p.monto, 0);
    const saldoAntesEfectivo = Math.max(total - totalPagado, 0);
    const efectivoRecibido = Number(document.getElementById('efectivoRecibido').value) || 0;
    const cambio = Math.max(efectivoRecibido - saldoAntesEfectivo, 0);
    const saldo = Math.max(saldoAntesEfectivo - efectivoRecibido, 0);

    contadorFactura++;
    const numeroFactura = 'FAC-' + contadorFactura;

    let estadoClase, estadoTexto;
    if (saldo <= 0){
      estadoClase = 'pagado'; estadoTexto = 'PAGADO';
    } else if (totalPagado > 0 || efectivoRecibido > 0){
      estadoClase = 'parcial'; estadoTexto = 'PAGO PARCIAL';
    } else {
      estadoClase = 'pendiente'; estadoTexto = 'PENDIENTE DE PAGO';
    }

    const filasItemsHTML = items.map(i =>
      `<div class="recibo-item"><span>${i.desc} ×${i.cant}</span><span>${formatoMoneda(i.total)}</span></div>`
    ).join('') || '<div class="recibo-item"><span>— sin repuestos registrados —</span><span></span></div>';

    const filasMOHTML = manoObra.map(i =>
      `<div class="recibo-item"><span>${i.desc}</span><span>${formatoMoneda(i.total)}</span></div>`
    ).join('') || '<div class="recibo-item"><span>— sin mano de obra registrada —</span><span></span></div>';

    const filasPagosHTML = pagos.map(p =>
      `<div class="recibo-item"><span>${p.fecha} · ${p.metodo}</span><span>${formatoMoneda(p.monto)}</span></div>`
    ).join('') || '<div class="recibo-item"><span>— sin pagos registrados —</span><span></span></div>';

    zonaRecibo.innerHTML = `
      <div class="recibo">
        <div class="recibo-encabezado">
          <div class="num">${numeroFactura}</div>
          <div>Orden ${ordenId} · ${fechaOrden}</div>
        </div>

        <div class="recibo-linea"><span>Cliente</span><span>${cliente}</span></div>
        ${clienteDoc ? `<div class="recibo-linea"><span>Identificación</span><span>${clienteDoc}</span></div>` : ''}
        ${equipo ? `<div class="recibo-linea"><span>Equipo</span><span>${equipo}</span></div>` : ''}

        <div class="recibo-seccion">
          <h3>Repuestos y servicios</h3>
          ${filasItemsHTML}
        </div>

        <div class="recibo-seccion">
          <h3>Mano de obra</h3>
          ${filasMOHTML}
        </div>

        <div class="recibo-totales">
          <div class="fila-total"><span>Subtotal</span><span>${formatoMoneda(subtotal)}</span></div>
          <div class="fila-total"><span>IVA (${tasaImpuesto}%)</span><span>${formatoMoneda(impuesto)}</span></div>
          <div class="fila-total gran-total"><span>Total factura</span><span>${formatoMoneda(total)}</span></div>
        </div>

        <div class="recibo-seccion">
          <h3>Pagos registrados</h3>
          ${filasPagosHTML}
          <div class="fila-total" style="margin-top:8px;"><span>Total pagado (registrado)</span><span>${formatoMoneda(totalPagado)}</span></div>
          ${efectivoRecibido > 0 ? `<div class="fila-total"><span>Efectivo recibido</span><span>${formatoMoneda(efectivoRecibido)}</span></div>
          <div class="fila-total"><span>Cambio entregado</span><span>${formatoMoneda(cambio)}</span></div>` : ''}
          <div class="fila-total"><span>Saldo pendiente</span><span>${formatoMoneda(saldo)}</span></div>
        </div>

        <span class="estado-pago ${estadoClase}">${estadoTexto}</span>

        <div class="recibo-pie">Comprobante generado automáticamente a partir de la orden de servicio.</div>
      </div>
      <div class="acciones-recibo">
        <button type="button" class="btn-imprimir" id="btnImprimir">Imprimir / guardar PDF</button>
        <button type="button" class="btn-nuevo" id="btnNuevaOrden">Nueva orden</button>
      </div>
    `;

    document.getElementById('btnImprimir').addEventListener('click', () => window.print());
    document.getElementById('btnNuevaOrden').addEventListener('click', () => {
      document.getElementById('ordenId').value = '';
      document.getElementById('clienteNombre').value = '';
      document.getElementById('clienteDoc').value = '';
      document.getElementById('equipoDetalle').value = '';
      listaItems.innerHTML = ''; filaItem();
      listaManoObra.innerHTML = ''; filaManoObra();
      document.getElementById('horasMO').value = 0;
      document.getElementById('tarifaMO').value = 0;
      listaPagos.innerHTML = ''; filaPago();
      document.getElementById('efectivoRecibido').value = 0;
      actualizarResumenPagos();
      zonaRecibo.innerHTML = '<div class="placeholder-recibo">Completa la orden y presiona «Generar factura y comprobante» para ver el documento aquí.</div>';
    });

    zonaRecibo.scrollIntoView({ behavior:'smooth', block:'start' });
  });
})();