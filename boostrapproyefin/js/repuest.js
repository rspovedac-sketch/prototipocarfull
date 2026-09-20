// Para mostrar la foto real del repuesto, pega el link de la imagen en "imagen".
  // Si se deja vacío (""), la tarjeta muestra el ícono de respaldo automáticamente.

  const partes = [
    { sku:"FR-1042", nombre:"Pastillas de freno delanteras", categoria:"frenos", fits:"Sedán compacto 2015-2021", precio:78000, stock:"ok", icon:"⏺", imagen:"https://www.firststop.es/adobe/dynamicmedia/deliver/dm-aid--a8e95afe-7259-4ac8-8744-d00afb9e8ebd/pastillas-de-freno.png?preferwebp=true&quality=100" },
    { sku:"FR-1088", nombre:"Disco de freno ventilado", categoria:"frenos", fits:"SUV mediano 2016-2023", precio:145000, stock:"ok", icon:"◎", imagen:"https://tse3.mm.bing.net/th/id/OIP.-uYDgO2YedtrxD5XfI8-EAHaER?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { sku:"FR-1120", nombre:"Líquido de frenos DOT 4", categoria:"frenos", fits:"Universal", precio:32000, stock:"low", icon:"🛢", imagen:"https://www.mundodelmotor.net/wp-content/uploads/2023/03/Tipos-de-liquido-de-frenos-DOT3-DOT4-DOT5.jpg" },
    { sku:"MT-2004", nombre:"Filtro de aceite", categoria:"motor", fits:"Motores 1.4L - 2.0L", precio:24000, stock:"ok", icon:"⛃", imagen:"https://tse1.mm.bing.net/th/id/OIP.rb9y0MGI41_dNpjEnaJW2gHaGa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { sku:"MT-2011", nombre:"Bujía de encendido (juego x4)", categoria:"motor", fits:"Motores a gasolina", precio:56000, stock:"ok", icon:"✦", imagen:"https://img.freepik.com/fotos-premium/bujia-encendido-electrodo-platino-bujias-automotrices_488220-74145.jpg?w=2000" },
    { sku:"MT-2033", nombre:"Correa de distribución", categoria:"motor", fits:"Motores 1.6L - 1.8L", precio:98000, stock:"low", icon:"⟲", imagen:"https://m.media-amazon.com/images/I/61bXrcemrhL._AC_SL1500_.jpg" },
    { sku:"MT-2077", nombre:"Bomba de agua", categoria:"motor", fits:"Motores 1.6L - 2.4L", precio:132000, stock:"out", icon:"⛲", imagen:"https://i.ytimg.com/vi/9omxVFOBb_k/hqdefault.jpg" },
    { sku:"SU-3009", nombre:"Amortiguador delantero", categoria:"suspension", fits:"Sedán / Hatchback", precio:167000, stock:"ok", icon:"⌇", imagen:"https://definicion.de/wp-content/uploads/2020/12/Amortiguador-de-coche.jpg" },
    { sku:"SU-3015", nombre:"Terminal de dirección", categoria:"suspension", fits:"Universal liviano", precio:41000, stock:"ok", icon:"⌁", imagen:"https://sv.superrepuestos.com/Multimedia/GetMultimediaProducto?idProducto=66d6db5c-d399-4e48-ad28-3b966a7cf937&idMultimedia=6dc234aa-0331-4741-8a19-1638e5a1c9ae&ancho=500&alto=500&qa=90" },
    { sku:"SU-3022", nombre:"Rótula de suspensión", categoria:"suspension", fits:"SUV / Camioneta", precio:63000, stock:"low", icon:"◍", imagen:"https://tse1.mm.bing.net/th/id/OIP.qdN50ygdPJ0vpjpTAJfgzAHaGq?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { sku:"EL-4001", nombre:"Batería 12V 45Ah", categoria:"electrico", fits:"Universal liviano", precio:280000, stock:"ok", icon:"⚡", imagen:"https://tse1.mm.bing.net/th/id/OIP.R4sMMUeo4myZgjWtefsLxwHaDt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { sku:"EL-4019", nombre:"Alternador remanufacturado", categoria:"electrico", fits:"Motores 1.6L - 2.0L", precio:310000, stock:"out", icon:"🔌", imagen:"https://autolab.com.co/wp-content/uploads/image-16.png" },
    { sku:"EL-4030", nombre:"Bombillo led H4", categoria:"electrico", fits:"Universal", precio:35000, stock:"ok", icon:"💡", imagen:"https://tse4.mm.bing.net/th/id/OIP.DotKH8j0WGkk5aPTuozU1AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { sku:"FI-5002", nombre:"Filtro de aire", categoria:"filtros", fits:"Motores 1.4L - 2.0L", precio:29000, stock:"ok", icon:"▦", imagen:"https://static.retail.autofact.cl/blog/c_url_original.127by0x8ljq8ami3.jpg" },
    { sku:"FI-5010", nombre:"Filtro de cabina / polen", categoria:"filtros", fits:"Universal", precio:26000, stock:"ok", icon:"▤", imagen:"https://riseautos.cl/wp-content/uploads/2025/12/9954048-3.png" },
    { sku:"FI-5014", nombre:"Filtro de combustible", categoria:"filtros", fits:"Motores diésel", precio:38000, stock:"low", icon:"⛽", imagen:"https://www.lubricantesvaldes.cl/wp-content/uploads/2024/01/OIP-14.jpg" },
    { sku:"CA-6003", nombre:"Espejo retrovisor lateral", categoria:"carroceria", fits:"Sedán compacto 2018-2022", precio:95000, stock:"ok", icon:"▭", imagen:"https://http2.mlstatic.com/D_NQ_NP_752809-CBT81414810378_122024-O.webp" },
    { sku:"CA-6011", nombre:"Manija de puerta exterior", categoria:"carroceria", fits:"Universal", precio:47000, stock:"ok", icon:"▯", imagen:"https://http2.mlstatic.com/D_NQ_NP_651352-CBT81211872766_122024-O.webp" },
    { sku:"TR-7004", nombre:"Kit de embrague", categoria:"transmision", fits:"Motores 1.6L manual", precio:245000, stock:"low", icon:"⚙", imagen:"https://www.c3carecarcenter.com/wp-content/uploads/2025/03/kit-de-embrague-coche.webp" },
    { sku:"TR-7012", nombre:"Aceite de caja automática", categoria:"transmision", fits:"Cajas automáticas", precio:52000, stock:"ok", icon:"🛢", imagen:"https://www.c3carecarcenter.com/wp-content/uploads/2025/12/promo-aceite-caja-automatica-1038x576.webp" },
    { sku:"RF-8005", nombre:"Radiador de aluminio", categoria:"refrigeracion", fits:"Motores 1.6L - 2.4L", precio:189000, stock:"ok", icon:"▥", imagen:"https://mercadoracing.com/imagenes-anuncios/6/495920/radiador-de-aluminio-racing-rally-varios.jpg" },
    { sku:"RF-8009", nombre:"Termostato", categoria:"refrigeracion", fits:"Motores a gasolina", precio:31000, stock:"ok", icon:"◐", imagen:"https://mecanicaymotores.com/wp-content/uploads/2022/11/el-termostato-1.jpg" },
  ];

  const categorias = [
    { id:"todos", nombre:"Todos los repuestos" },
    { id:"motor", nombre:"Motor" },
    { id:"frenos", nombre:"Frenos" },
    { id:"suspension", nombre:"Suspensión y dirección" },
    { id:"electrico", nombre:"Eléctrico" },
    { id:"filtros", nombre:"Filtros" },
    { id:"carroceria", nombre:"Carrocería" },
    { id:"transmision", nombre:"Transmisión y embrague" },
    { id:"refrigeracion", nombre:"Refrigeración" },
  ];

  const badgeInfo = {
    ok:  { label:"Disponible", cls:"ok" },
    low: { label:"Bajo stock", cls:"low" },
    out: { label:"Agotado", cls:"out" }
  };

  let activeCat = "todos";
  let searchTerm = "";
  let sortMode = "default";
  let cart = 0;

  const fmt = (n) => "$" + n.toLocaleString("es-CO");

  function renderMenu(){
    const menuList = document.getElementById("menuList");
    menuList.innerHTML = "";
    categorias.forEach(cat => {
      const count = cat.id === "todos"
        ? partes.length
        : partes.filter(p => p.categoria === cat.id).length;
      const item = document.createElement("div");
      item.className = "menu-item" + (cat.id === activeCat ? " active" : "");
      item.innerHTML = `<span>${cat.nombre}</span><span class="count">${count}</span>`;
      item.addEventListener("click", () => {
        activeCat = cat.id;
        renderMenu();
        renderGrid();
      });
      menuList.appendChild(item);
    });
  }

  function getFiltered(){
    let list = partes.filter(p => activeCat === "todos" || p.categoria === activeCat);
    if(searchTerm.trim() !== ""){
      const t = searchTerm.toLowerCase();
      list = list.filter(p =>
        p.nombre.toLowerCase().includes(t) ||
        p.sku.toLowerCase().includes(t) ||
        p.fits.toLowerCase().includes(t)
      );
    }
    if(sortMode === "price-asc") list = [...list].sort((a,b)=>a.precio-b.precio);
    if(sortMode === "price-desc") list = [...list].sort((a,b)=>b.precio-a.precio);
    if(sortMode === "name-asc") list = [...list].sort((a,b)=>a.nombre.localeCompare(b.nombre));
    return list;
  }

  function renderGrid(){
    const grid = document.getElementById("grid");
    const empty = document.getElementById("emptyState");
    const list = getFiltered();

    document.getElementById("catTitle").textContent =
      categorias.find(c => c.id === activeCat).nombre;
    document.getElementById("catCount").textContent =
      `${list.length} producto${list.length === 1 ? "" : "s"} encontrado${list.length === 1 ? "" : "s"}`;

    grid.innerHTML = "";
    empty.classList.toggle("show", list.length === 0);

    list.forEach(p => {
      const b = badgeInfo[p.stock];
      const card = document.createElement("div");
      card.className = "card";
      const mediaHtml = p.imagen && p.imagen.trim() !== ""
        ? `<img src="${p.imagen}" alt="${p.nombre}" onerror="this.parentElement.innerHTML='${p.icon}';">`
        : p.icon;
      card.innerHTML = `
        <div class="card-icon">${mediaHtml}</div>
        <div class="card-body">
          <div class="sku">REF. ${p.sku}</div>
          <h3>${p.nombre}</h3>
          <div class="fits">Aplica: ${p.fits}</div>
          <span class="badge ${b.cls}">${b.label}</span>
          <div class="card-footer">
            <span class="price">${fmt(p.precio)}</span>
            <button class="add-btn" ${p.stock === "out" ? "disabled" : ""}>
              ${p.stock === "out" ? "Sin stock" : "Agregar"}
            </button>
          </div>
        </div>
      `;
      const btn = card.querySelector(".add-btn");
      if(p.stock !== "out"){
        btn.addEventListener("click", () => {
          cart++;
          document.getElementById("cartPill").textContent = `PEDIDO (${cart})`;
          btn.textContent = "Agregado ✓";
          btn.classList.add("added");
          setTimeout(() => {
            btn.textContent = "Agregar";
            btn.classList.remove("added");
          }, 1000);
        });
      }
      grid.appendChild(card);
    });
  }

  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderGrid();
  });
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    sortMode = e.target.value;
    renderGrid();
  });

  renderMenu();
  renderGrid();