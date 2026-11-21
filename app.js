(() => {
  "use strict";
  const M = window.MENU;
  const SYNC = (window.SYNC_URL || "").replace(/\/+$/, "");
  const $app = document.getElementById("app");
  const $top = document.getElementById("top");
  const $badge = document.getElementById("badge");

  const DIAS = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const ORDEN = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  const NOMBRE_DIA = { lunes: "Lunes", martes: "Martes", miercoles: "Miércoles", jueves: "Jueves", viernes: "Viernes", sabado: "Sábado", domingo: "Domingo" };
  const CORTO = { lunes: "L", martes: "M", miercoles: "X", jueves: "J", viernes: "V", sabado: "S", domingo: "D" };
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const nb = (q) => String(q).replace(/ (?=(g|kg|ud|latas?|bolsas?)\b)/g, "\u00a0").replace(/(\d) × (\d)/g, "$1\u00a0×\u00a0$2");
  const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;

  const hoyKey = () => DIAS[new Date().getDay()];
  const minutos = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  function comidaActual() {
    const d = new Date(), ahora = d.getHours() * 60 + d.getMinutes();
    let actual = M.comidas[0].id;
    for (const c of M.comidas) if (ahora >= minutos(c.desde)) actual = c.id;
    return actual;
  }
  const nombreComida = (id) => M.comidas.find((c) => c.id === id).nombre;

  function tituloComida(c) {
    if (c.plato) return c.plato;
    const n = c.items.map((i) => i[0]);
    if (n.length === 1) return n[0];
    return n.slice(0, -1).join(", ") + " y " + n[n.length - 1].charAt(0).toLowerCase() + n[n.length - 1].slice(1);
  }
  function resumenComida(c) {
    return c.items.map((i) => `${i[0]} ${nb(i[1])}`).join(" · ");
  }
  function cuandoReceta(id) {
    const r = [];
    for (const d of ORDEN) for (const c of M.comidas) if (M.dias[d][c.id] && M.dias[d][c.id].receta === id) r.push(`${NOMBRE_DIA[d]} · ${c.nombre}`);
    return r;
  }

  /* =================== Estado de la compra =================== */
  const LKEY = "compra:" + M.id;
  const PKEY = "pendiente:" + M.id;
  let estado = cargar(LKEY, { checked: {}, extras: {} });
  let pendiente = cargar(PKEY, []);
  let syncEstado = SYNC ? "off" : "local";
  let soloPendientes = cargar("filtro", false);

  function cargar(k, def) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? def : v; } catch { return def; } }
  function guardar() { localStorage.setItem(LKEY, JSON.stringify(estado)); localStorage.setItem(PKEY, JSON.stringify(pendiente)); }
  function normaliza(s) { s = s || {}; return { checked: s.checked || {}, extras: s.extras || {} }; }

  const itemsBase = M.compra.flatMap((s) => s.items.map(([n, q]) => ({ id: slug(s.seccion + "-" + n), n, q, s: s.seccion })));
  const extrasLista = () => Object.entries(estado.extras).map(([id, e]) => ({ id, n: e.n, q: "", t: e.t || 0 })).sort((a, b) => a.t - b.t);
  function cuenta() {
    const todos = itemsBase.concat(extrasLista());
    const hechos = todos.filter((i) => estado.checked[i.id]).length;
    return { total: todos.length, hechos };
  }

  function aplicarRuta(path, data, merge) {
    const parts = path.split("/").filter(Boolean);
    if (!parts.length) { estado = merge ? normaliza(Object.assign({}, estado, data)) : normaliza(data); return; }
    let o = estado;
    for (let i = 0; i < parts.length - 1; i++) { o[parts[i]] = o[parts[i]] || {}; o = o[parts[i]]; }
    const last = parts[parts.length - 1];
    if (data === null) delete o[last];
    else if (merge && typeof data === "object") o[last] = Object.assign(o[last] || {}, data);
    else o[last] = data;
    estado = normaliza(estado);
  }

  function escribir(path, valor) {
    aplicarRuta(path, valor);
    if (SYNC) { pendiente.push([path, valor]); flush(); }
    guardar();
    pintarBadge();
  }

  let flushing = false;
  async function flush() {
    if (!SYNC || flushing || !pendiente.length) return;
    flushing = true;
    try {
      while (pendiente.length) {
        const [path, valor] = pendiente[0];
        const url = `${SYNC}/listas/${encodeURIComponent(M.id)}${path}.json`;
        const res = await fetch(url, valor === null ? { method: "DELETE" } : { method: "PUT", body: JSON.stringify(valor) });
        if (!res.ok) throw new Error(res.status);
        pendiente.shift();
        guardar();
      }
    } catch { setSync("off"); }
    flushing = false;
  }

  function setSync(s) { syncEstado = s; const el = document.querySelector(".sync"); if (el) { el.className = "sync " + s; el.textContent = textoSync(); } }
  const textoSync = () => ({ on: "Compartida en vivo", off: "Sin conexión · se enviará luego", local: "Solo en este móvil" }[syncEstado]);

  function conectar() {
    if (!SYNC || !window.EventSource) return;
    const es = new EventSource(`${SYNC}/listas/${encodeURIComponent(M.id)}.json`);
    const onEv = (merge) => (e) => {
      const { path, data } = JSON.parse(e.data);
      aplicarRuta(path, data, merge);
      // Reaplica lo que aún no ha llegado al servidor para no perder marcas hechas sin conexión.
      for (const [p, v] of pendiente) aplicarRuta(p, v);
      guardar();
      setSync("on");
      flush();
      if (ruta().vista === "compra") pintarCompra(true);
      pintarBadge();
    };
    es.addEventListener("put", onEv(false));
    es.addEventListener("patch", onEv(true));
    es.onerror = () => setSync("off");
    window.addEventListener("online", flush);
  }

  function pintarBadge() {
    const { total, hechos } = cuenta();
    const quedan = total - hechos;
    $badge.hidden = quedan === 0 || quedan === total;
    $badge.textContent = quedan;
  }

  /* =================== Router =================== */
  function ruta() {
    const [vista = "hoy", arg = ""] = location.hash.replace(/^#/, "").split("/");
    return { vista: vista || "hoy", arg: decodeURIComponent(arg) };
  }
  function render() {
    const { vista, arg } = ruta();
    const tab = vista === "receta" ? "recetas" : vista;
    document.querySelectorAll(".tabbar a").forEach((a) => { if (a.dataset.tab === tab) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    ({ hoy: pintarHoy, semana: pintarSemana, compra: () => pintarCompra(false), recetas: pintarRecetas, receta: pintarReceta }[vista] || pintarHoy)(arg);
    pintarBadge();
  }

  function cabecera(h1, sub, back) {
    $top.innerHTML = `<div class="inner">${back ? `<a class="back" href="${back}" aria-label="Volver">${icon("back")}</a>` : ""}<div><h1>${h1}</h1>${sub ? `<p class="sub">${sub}</p>` : ""}</div></div>`;
  }

  function listaAlimentos(items) {
    return `<ul class="alimentos">${items.map(([n, q]) => `<li><span class="n">${esc(n)}</span><span class="q">${esc(nb(q))}</span></li>`).join("")}</ul>`;
  }

  function etiquetaComida(comidaId, c) {
    return `<section class="etiqueta" aria-labelledby="et-h"><div class="etiqueta-in">
      <span class="banderola">${esc(nombreComida(comidaId))}</span>
      <h2 id="et-h">${esc(tituloComida(c))}</h2>
      ${listaAlimentos(c.items)}
      ${c.nota ? `<p class="nota">${esc(c.nota)}</p>` : ""}
      <p class="para">Cantidades para los dos</p>
      ${c.receta ? `<a class="btn-receta" href="#receta/${c.receta}">Ver receta ${icon("arrow")}</a>` : ""}
    </div></section>`;
  }

  /* =================== Hoy =================== */
  function pintarHoy(arg) {
    const d = hoyKey(), dia = M.dias[d], ahora = comidaActual();
    const sel = M.comidas.some((c) => c.id === arg) ? arg : ahora;
    const f = new Date();
    cabecera(NOMBRE_DIA[d], `${f.getDate()} de ${MESES[f.getMonth()]} · <b>${esc(M.titulo)}</b>`);
    const idxAhora = M.comidas.findIndex((c) => c.id === ahora);
    const filas = M.comidas.filter((c) => c.id !== sel).map((c) => {
      const i = M.comidas.findIndex((x) => x.id === c.id);
      const cls = c.id === ahora ? "ahora" : i < idxAhora ? "pasada" : "";
      const x = dia[c.id];
      return `<li><a class="comida ${cls}" href="#hoy/${c.id}"><span class="m">${esc(c.nombre)}</span><span class="que">${esc(tituloComida(x))}</span>${icon("arrow").replace("<svg", '<svg class="ir"')}<span class="det">${esc(resumenComida(x))}</span></a></li>`;
    }).join("");
    $app.innerHTML = etiquetaComida(sel, dia[sel]) +
      `<section class="modulo"><div class="pestana"><h3>${sel === ahora ? "Resto del día" : "Todo el día"}</h3></div><ul class="comidas">${filas}</ul></section>`;
  }

  /* =================== Semana =================== */
  function pintarSemana(arg) {
    const hk = hoyKey();
    const d = ORDEN.includes(arg) ? arg : hk;
    cabecera("Semana", `${esc(M.titulo)} · <b>cantidades para 2</b>`);
    const botones = ORDEN.map((k) => `<button type="button" data-dia="${k}" class="${k === hk ? "hoy" : ""}" aria-pressed="${k === d}" aria-label="${NOMBRE_DIA[k]}">${CORTO[k]}<small>${k === hk ? "hoy" : NOMBRE_DIA[k].slice(0, 3).toLowerCase()}</small></button>`).join("");
    const dia = M.dias[d];
    const filas = M.comidas.map((c) => {
      const x = dia[c.id];
      const plato = x.plato ? `<a class="plato-rec" href="#receta/${x.receta}">${esc(x.plato)}</a>` : "";
      const items = x.items.map((i) => `${esc(i[0])} <b>${esc(nb(i[1]))}</b>`).join(" · ");
      return `<li><div class="comida"><span class="m">${esc(c.nombre)}</span><span class="que">${plato || items}</span><span></span>${plato ? `<span class="det">${items}</span>` : ""}${x.nota ? `<span class="det">${esc(x.nota)}</span>` : ""}</div></li>`;
    }).join("");
    $app.innerHTML = `<div class="dias" role="group" aria-label="Día de la semana">${botones}</div>
      <section class="modulo"><div class="pestana"><h3>${NOMBRE_DIA[d]}</h3>${d === hk ? '<span class="cuenta">Hoy</span>' : ""}</div><ul class="comidas">${filas}</ul></section>
      <section class="modulo"><div class="pestana"><h3>Pautas del nutricionista</h3></div><ul class="pautas">${M.pautas.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></section>
      <div style="height:24px"></div>`;
    $app.querySelectorAll(".dias button").forEach((b) => b.addEventListener("click", () => history.replaceState(null, "", "#semana/" + b.dataset.dia) || pintarSemana(b.dataset.dia)));
  }

  /* =================== Compra =================== */
  function filaArt(i, extra) {
    const on = !!estado.checked[i.id];
    const btn = `<button type="button" class="art" role="checkbox" aria-checked="${on}" data-id="${i.id}"><span class="caja">${icon("check")}</span><span class="n">${esc(i.n)}</span>${i.q ? `<span class="q">${esc(i.q)}</span>` : ""}</button>`;
    return extra ? `<li class="fila-extra">${btn}<button type="button" class="quitar" data-quitar="${i.id}" aria-label="Quitar ${esc(i.n)}">${icon("x")}</button></li>` : `<li>${btn}</li>`;
  }

  function pintarCompra(soloRefresco) {
    const { total, hechos } = cuenta();
    const focoId = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.id : null;
    const scroll = window.scrollY;
    cabecera("Compra", `${esc(M.titulo)} · <b>para 2</b>`);
    $top.insertAdjacentHTML("beforeend", `<div class="progreso"><div class="inner">
      <div class="progreso-txt"><span><b>${hechos}</b> de ${total} en el carro</span><span class="sync ${syncEstado}">${textoSync()}</span></div>
      <div class="barra ${hechos === total ? "llena" : ""}"><i style="width:${total ? (hechos / total) * 100 : 0}%"></i></div></div></div>`);

    const secciones = M.compra.map((s) => ({ seccion: s.seccion, items: itemsBase.filter((i) => i.s === s.seccion) }));
    const ex = extrasLista();
    const bloque = (titulo, items, extra) => {
      const hechosS = items.filter((i) => estado.checked[i.id]).length;
      const visibles = soloPendientes ? items.filter((i) => !estado.checked[i.id]) : items;
      if (soloPendientes && !visibles.length) return "";
      return `<section class="modulo"><div class="pestana"><h3>${esc(titulo)}</h3><span class="cuenta ${hechosS === items.length ? "ok" : ""}">${hechosS}/${items.length}</span></div>
        <ul class="lista">${visibles.map((i) => filaArt(i, extra)).join("")}</ul></section>`;
    };
    const cuerpo = (ex.length ? bloque("Añadido por nosotros", ex, true) : "") + secciones.map((s) => bloque(s.seccion, s.items)).join("");
    $app.innerHTML = `<div class="herramientas">
        <form class="anadir" id="f-anadir"><input id="nuevo" aria-label="Añadir algo a la lista" name="n" autocomplete="off" enterkeyhint="done" placeholder="Añadir algo más…" maxlength="60" /><button aria-label="Añadir">${icon("plus")}</button></form>
        <button type="button" class="filtro" id="filtro" aria-pressed="${soloPendientes}">Ocultar<br>lo cogido</button>
      </div>
      ${cuerpo || `<section class="modulo"><p class="vacia">Todo en el carro. ¡A casa!</p></section>`}
      <div class="pie"><button type="button" class="btn-quiet" id="reset">Empezar la lista de nuevo</button>
      <p>${syncEstado === "local" ? "Las marcas se guardan en este móvil." : "Las marcas se comparten entre los dos móviles."} Cuando llegue un menú nuevo, la lista se renueva sola.</p></div>`;

    $app.querySelectorAll(".art").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.id, on = !estado.checked[id];
      escribir(`/checked/${id}`, on ? true : null);
      if (soloPendientes) { pintarCompra(true); return; }
      b.setAttribute("aria-checked", on);
      actualizarProgreso();
    }));
    $app.querySelectorAll("[data-quitar]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.quitar;
      escribir(`/checked/${id}`, null);
      escribir(`/extras/${id}`, null);
      pintarCompra(true);
    }));
    document.getElementById("f-anadir").addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = e.target.n, n = inp.value.trim();
      if (!n) { inp.focus(); return; }
      const id = "extra-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
      escribir(`/extras/${id}`, { n, t: Date.now() });
      pintarCompra(true);
      document.getElementById("nuevo").focus();
    });
    document.getElementById("filtro").addEventListener("click", () => { soloPendientes = !soloPendientes; localStorage.setItem("filtro", soloPendientes); pintarCompra(true); });
    document.getElementById("reset").addEventListener("click", () => {
      const dlg = document.getElementById("confirm");
      document.getElementById("confirm-text").textContent = SYNC ? "Se desmarcará todo y se borrará lo añadido, también en el otro móvil." : "Se desmarcará todo y se borrará lo añadido.";
      dlg.returnValue = "";
      dlg.showModal();
      dlg.addEventListener("close", function h() {
        dlg.removeEventListener("close", h);
        if (dlg.returnValue !== "si") return;
        escribir("/checked", null); escribir("/extras", null);
        pintarCompra(true);
      });
    });
    if (soloRefresco) {
      window.scrollTo(0, scroll);
      if (focoId) { const el = $app.querySelector(`[data-id="${focoId}"]`); if (el) el.focus({ preventScroll: true }); }
    }
  }
  function actualizarProgreso() {
    const { total, hechos } = cuenta();
    const t = $top.querySelector(".progreso-txt b"); if (t) t.textContent = hechos;
    const bar = $top.querySelector(".barra"); if (bar) { bar.classList.toggle("llena", hechos === total); bar.firstElementChild.style.width = (hechos / total) * 100 + "%"; }
    $app.querySelectorAll(".modulo").forEach((m) => {
      const btns = m.querySelectorAll(".art"); if (!btns.length) return;
      const h = [...btns].filter((b) => b.getAttribute("aria-checked") === "true").length;
      const c = m.querySelector(".cuenta"); c.textContent = `${h}/${btns.length}`; c.classList.toggle("ok", h === btns.length);
    });
  }

  /* =================== Recetas =================== */
  function pintarRecetas() {
    const ids = Object.keys(M.recetas);
    cabecera("Recetas", `${ids.length} recetas · <b>para 2</b>`);
    const filas = (q) => {
      const t = slug(q || "");
      const r = ids.filter((id) => !t || slug(M.recetas[id].nombre + " " + M.recetas[id].ingredientes.join(" ")).includes(t));
      if (!r.length) return `<li class="vacia">Ninguna receta lleva «${esc(q)}».</li>`;
      return r.map((id) => `<li><a class="receta-fila" href="#receta/${id}"><span class="t">${esc(M.recetas[id].nombre)}</span><span class="c">${esc(cuandoReceta(id).join(" · "))}</span>${icon("arrow")}</a></li>`).join("");
    };
    $app.innerHTML = `<div class="buscar"><input type="search" id="q" placeholder="Buscar receta o ingrediente…" aria-label="Buscar receta o ingrediente" /></div>
      <section class="modulo"><div class="pestana"><h3>Esta semana</h3></div><ul class="lista" id="rl">${filas("")}</ul></section><div style="height:24px"></div>`;
    document.getElementById("q").addEventListener("input", (e) => { document.getElementById("rl").innerHTML = filas(e.target.value); });
  }

  function pintarReceta(id) {
    const r = M.recetas[id];
    if (!r) { location.hash = "#recetas"; return; }
    const ck = cargar("ingr:" + id, {});
    cabecera("Receta", "", "#recetas");
    const cuando = cuandoReceta(id);
    $app.innerHTML = `<section class="etiqueta"><div class="etiqueta-in">
        <span class="banderola">${esc(cuando.length ? cuando[0].split(" · ")[1] : "Receta")}</span>
        <h2>${esc(r.nombre)}</h2>
        <p class="cuando">${esc(cuando.map((c) => c.split(" · ")[0]).join(" y "))}</p>
        <p class="para">Cantidades para los dos</p>
      </div></section>
      <section class="modulo ingr"><div class="pestana"><h3>Ingredientes</h3><span class="cuenta" id="ic"></span></div>
        <ul class="lista">${r.ingredientes.map((t, i) => `<li><button type="button" class="art" role="checkbox" aria-checked="${!!ck[i]}" data-i="${i}"><span class="caja">${icon("check")}</span><span class="n">${esc(t)}</span></button></li>`).join("")}</ul></section>
      <section class="modulo"><div class="pestana"><h3>Elaboración</h3></div><ol class="pasos">${r.pasos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol></section>
      <div style="height:24px"></div>`;
    const cnt = () => { const h = Object.values(ck).filter(Boolean).length; const el = document.getElementById("ic"); el.textContent = h ? `${h}/${r.ingredientes.length} listos` : "Márcalos al sacarlos"; el.classList.toggle("ok", h === r.ingredientes.length); };
    cnt();
    $app.querySelectorAll(".ingr .art").forEach((b) => b.addEventListener("click", () => {
      const i = b.dataset.i; ck[i] = !ck[i]; b.setAttribute("aria-checked", ck[i]);
      localStorage.setItem("ingr:" + id, JSON.stringify(ck)); cnt();
    }));
  }

  /* =================== Arranque =================== */
  // Si cambia el menú, limpia los datos guardados de menús anteriores.
  Object.keys(localStorage).forEach((k) => { if (/^(compra|pendiente):/.test(k) && !k.endsWith(":" + M.id)) localStorage.removeItem(k); });

  window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
  render();
  conectar();
  flush();
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
})();
