// Ticket dinámico

  document.getElementById('ticketNum').textContent = String(Math.floor(1000 + Math.random()*8999));

  // Fecha/hora actual por defecto

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById('fechaIngreso').value = now.toISOString().slice(0,16);

  // Placa en mayúsculas automáticamente

  document.getElementById('placa').addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
  });

  // Checklist de estado (Bien / Revisar)

  document.querySelectorAll('.check-item .opts').forEach(group => {
    group.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('button').forEach(b => b.classList.remove('active-ok','active-bad'));
        btn.classList.add(btn.dataset.state === 'ok' ? 'active-ok' : 'active-bad');
      });
    });
  });

  // Nivel de combustible

  const fuelInput = document.getElementById('combustible');
  const fuelPct = document.getElementById('fuelPct');
  fuelInput.addEventListener('input', () => {
    fuelPct.textContent = fuelInput.value + '%';
  });

  // Envío del formulario
  
  document.getElementById('ingresoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  });