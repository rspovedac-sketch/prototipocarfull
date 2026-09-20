
  // Folio dinámico simple
  document.getElementById('folioNum').textContent =
    new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random()*8999));

  // Fecha por defecto = hoy

  document.getElementById('fecha').value = new Date().toISOString().slice(0,10);

  // Agregar fila de materiales

  document.getElementById('addRow').addEventListener('click', () => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="text" placeholder="Descripción"></td>
      <td class="qty"><input type="number" min="0" value="1"></td>
      <td><input type="text" placeholder="Unidad"></td>
      <td><input type="text" placeholder="$0"></td>
      <td class="row-actions"><button type="button" class="del-row" title="Eliminar fila">✕</button></td>
    `;
    document.getElementById('matBody').appendChild(row);
  });

  // Eliminar fila (delegación)

  document.getElementById('matBody').addEventListener('click', (e) => {
    if(e.target.classList.contains('del-row')){
      const rows = document.querySelectorAll('#matBody tr');
      if(rows.length > 1) e.target.closest('tr').remove();
    }
  });

  // Envío
  
  document.getElementById('otForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  });