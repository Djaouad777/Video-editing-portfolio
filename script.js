/* =====================================================
   MODIFIEZ VOS VIDÉOS ICI  (format vertical 9:16)
   id:     identifiant unique (ex: "reel-1") — le titre et la description
           de chaque vidéo (FR + EN) se modifient dans i18n.js, section PROJETS
   cat:    "Reels" | "Hypermotion IA" | "AI UGC"   (crée automatiquement les filtres)
   type:   "file" (fichier .mp4) | "youtube" | "vimeo"
   src:    chemin du .mp4 (ex: "videos/reel-1.mp4"), ou ID YouTube / Vimeo
   thumb:  image de couverture ("" = vignette de couleur)
   preview: court .mp4 muet lu au survol (facultatif ; pour "file", src est utilisé)
   ===================================================== */
const reel = { type: "file", src: "", vertical: true };   // showreel (section masquée)

const palette = ["#ffd3c4", "#cfd6ff", "#e4fba6", "#e3d8ff", "#ffeaa6", "#ffd0e2"];   // couleurs des vignettes (tant qu'il n'y a pas d'image)
const projects = [
  { id: "reel-1", cat: "Reels",          client: "",         year: "2026", dur: "0:33", type: "file", src: "videos/reel-1.mp4", thumb: "images/reel-1.jpg", preview: "", vertical: true },
  { id: "reel-2", cat: "Reels",          client: "",         year: "2026", dur: "0:26", type: "file", src: "videos/reel-2.mp4", thumb: "images/reel-2.jpg", preview: "", vertical: true },
  { id: "reel-3", cat: "Reels",          client: "Maruderm", year: "2026", dur: "0:46", type: "file", src: "videos/reel-3.mp4", thumb: "images/reel-3.jpg", preview: "", vertical: true },
  { id: "reel-4", cat: "Reels",          client: "",         year: "2026", dur: "1:04", type: "file", src: "videos/reel-4.mp4", thumb: "images/reel-4.jpg", preview: "", vertical: true },
  { id: "ai-1",   cat: "Hypermotion IA", client: "",         year: "2026", dur: "0:20", type: "file", src: "videos/ai-1.mp4",   thumb: "images/ai-1.jpg",   preview: "", vertical: true },
  { id: "ai-2",   cat: "Hypermotion IA", client: "",         year: "2026", dur: "0:15", type: "file", src: "videos/ai-2.mp4",   thumb: "images/ai-2.jpg",   preview: "", vertical: true },
  { id: "ugc-1",  cat: "AI UGC",         client: "",         year: "2026", dur: "0:15", type: "file", src: "videos/ugc-1.mp4",  thumb: "images/ugc-1.jpg",  preview: "", vertical: true },
  { id: "ugc-2",  cat: "AI UGC",         client: "Glow Me",  year: "2026", dur: "0:15", type: "file", src: "videos/ugc-2.mp4",  thumb: "images/ugc-2.jpg",  preview: "", vertical: true },
  { id: "reel-5", cat: "Reels",          client: "",         year: "2026", dur: "0:30", type: "file", src: "videos/reel-5.mp4", thumb: "images/reel-5.jpg", preview: "", vertical: true },
  /* Pour ajouter une vidéo : copiez une ligne, changez id, cat, src et thumb,
     puis ajoutez son titre et sa description dans i18n.js (section PROJETS, en FR et en EN). */
];

/* ===================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
const hasGsap = !!(window.gsap && window.ScrollTrigger);
if (hasGsap) gsap.registerPlugin(ScrollTrigger);

/* ---------- smooth scroll ---------- */
let lenis = null;
if (false && window.Lenis && !reduced) {   // inertia scrolling disabled: native scroll feels steadier
  lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  if (hasGsap) { lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
  else (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
}
$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const id = a.getAttribute("href"); const t = id === "#top" ? 0 : $(id);
  if (t === null) return; e.preventDefault();
  lenis ? lenis.scrollTo(t, { duration: 1.6 }) : (t === 0 ? scrollTo({ top: 0, behavior: "smooth" }) : t.scrollIntoView({ behavior: "smooth" }));
  closeMenu();
}));

/* ---------- build work (re-rendered when the language changes) ---------- */
const grid = $("#grid"), filters = $("#filters");
const catKeys = [...new Set(projects.map(p => p.cat))];
let activeFilter = "all";
const txt = p => Object.assign({ title: p.id, desc: "", tools: "" }, I18N.proj(p.id));

function applyFilter() {
  $$(".card", grid).forEach(c => c.classList.toggle("hide", !(activeFilter === "all" || c.dataset.cat === activeFilter)));
}
function renderWork() {
  filters.innerHTML = ["all", ...catKeys].map(k =>
    `<button class="${k === activeFilter ? "on" : ""}" data-f="${k}" role="tab">${k === "all" ? I18N.t("filter.all") : I18N.cat(k)}</button>`).join("");
  filters.style.display = catKeys.length <= 1 ? "none" : "";   // un seul type de vidéo : pas de filtres
  grid.innerHTML = projects.map((p, i) => { const x = txt(p); return `
  <a class="card" href="#" data-i="${i}" data-cat="${p.cat}" data-cursor="${I18N.t("m.view")}">
    <div class="media"><span class="play"></span><div class="media-in">
      ${p.thumb ? `<img src="${p.thumb}" alt="${x.title}" loading="lazy">` : `<div class="ph" data-n="${String(i + 1).padStart(2, "0")}" style="--c:${p.color || palette[i % palette.length]}"></div>`}
      ${(p.preview || (p.type === "file" && p.src)) ? `<video src="${p.preview || p.src}" muted loop playsinline preload="metadata"></video>` : ""}
    </div></div>
    <div class="cap"><span class="n">${String(i + 1).padStart(2, "0")}</span><h3>${x.title}</h3><span class="m">${I18N.cat(p.cat)}</span>${x.desc ? `<p class="d">${x.desc}</p>` : ""}</div>
  </a>`; }).join("");
  applyFilter();
}
renderWork();
I18N.onChange(() => { renderWork(); hasGsap && ScrollTrigger.refresh(); });

filters.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  activeFilter = b.dataset.f;
  $$("button", filters).forEach(x => x.classList.toggle("on", x === b));
  applyFilter();
  hasGsap && ScrollTrigger.refresh();
  hasGsap && gsap.fromTo($$(".card:not(.hide)", grid), { opacity: 0 }, { opacity: 1, duration: .7, stagger: .05, ease: "power2.out" });
});

/* hover preview (delegated, so it survives re-renders) */
grid.addEventListener("mouseover", e => {
  const c = e.target.closest(".card"); if (!c || c.contains(e.relatedTarget)) return;
  const v = $("video", c); v && v.play().catch(() => {});
});
grid.addEventListener("mouseout", e => {
  const c = e.target.closest(".card"); if (!c || c.contains(e.relatedTarget)) return;
  const v = $("video", c); if (v) { v.pause(); v.currentTime = 0; }
});

/* ---------- player modal ---------- */
const modal = $("#modal"), player = $("#player");
let lastFocus = null;
function embed(o) {
  if (!o.src) return `<div class="empty">${I18N.t("m.empty")}</div>`;
  if (o.type === "youtube") return `<iframe src="https://www.youtube.com/embed/${o.src}?autoplay=1&rel=0&modestbranding=1" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen title="Vidéo"></iframe>`;
  if (o.type === "vimeo") return `<iframe src="https://player.vimeo.com/video/${o.src}?autoplay=1" allow="autoplay;fullscreen" allowfullscreen title="Vidéo"></iframe>`;
  return `<video src="${o.src}" autoplay playsinline loop></video>`;
}
function openModal(o, meta) {
  lastFocus = document.activeElement;
  player.classList.toggle("vertical", !!o.vertical);
  player.innerHTML = embed(o);
  $("#mTitle").textContent = meta.title; $("#mDesc").textContent = meta.desc || "";
  $("#mMeta").innerHTML = meta.rows.map(r => `<li>${r[0]} — <b>${r[1]}</b></li>`).join("");
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
  lenis && lenis.stop(); $(".modal-x").focus();
}
function closeModal() {
  if (!modal.classList.contains("open")) return;
  modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true");
  lenis && lenis.start();
  setTimeout(() => (player.innerHTML = ""), 600);
  lastFocus && lastFocus.focus();
}
grid.addEventListener("click", e => {
  const c = e.target.closest(".card"); if (!c) return; e.preventDefault();
  const p = projects[+c.dataset.i], x = txt(p), t = I18N.t;
  openModal(p, { title: x.title, desc: x.desc, rows: [[t("m.client"), p.client], [t("m.year"), p.year], [t("m.cat"), I18N.cat(p.cat)], [t("m.tools"), x.tools], [t("m.dur"), p.dur]].filter(r => r[1]) });
});
$("#reelFrame").addEventListener("click", () => openModal(reel, { title: "Showreel", desc: "Une sélection de projets récents.", rows: [["Année", new Date().getFullYear()]] }));
modal.addEventListener("click", e => e.target.closest("[data-close]") && closeModal());
addEventListener("keydown", e => e.key === "Escape" && closeModal());

/* ---------- reel background (silent loop) ---------- */
(function () {
  const v = $("#reelVideo");
  if (reel.src && reel.type === "file") { v.src = reel.src; $("#reelPh").remove(); v.play().catch(() => {}); }
  else v.remove();
  const t = $("#reelTime"); let s = 0;
  setInterval(() => { s = (s + 1) % 3600; t.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }, 1000);
})();

/* ---------- nav: clock, hide on scroll, menu ---------- */
const nav = $("#nav"), links = $("#links"), burger = $("#burger");
const clock = () => { $("#clock").textContent = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) + ""; };
clock(); setInterval(clock, 30000);
function closeMenu() { burger.classList.remove("on"); links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
burger.onclick = () => { const o = links.classList.toggle("open"); burger.classList.toggle("on", o); burger.setAttribute("aria-expanded", o); };
let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY; lastY = y;
}, { passive: true });

/* ---------- cursor ---------- */
if (fine) {
  const cur = $("#cursor"), lab = $("#cursorLabel");
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
  document.addEventListener("mouseleave", () => cur.classList.add("hide"));
  document.addEventListener("mouseenter", () => cur.classList.remove("hide"));
  (function loop() { cx += (x - cx) * .18; cy += (y - cy) * .18; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  document.addEventListener("mouseover", e => {
    const t = e.target.closest("[data-cursor]");
    cur.classList.toggle("label", !!t && !modal.classList.contains("open"));
    if (t) lab.textContent = t.dataset.cursor;
  });
}

/* ---------- intro ---------- */
function splitWords(el) {
  const out = []; const walk = (n, parent) => n.childNodes.forEach(c => {
    if (c.nodeType === 3) c.textContent.split(/(\s+)/).forEach(t => {
      if (!t) return; if (!t.trim()) return parent.append(t);
      const s = document.createElement("span"); s.className = "w"; s.textContent = t; parent.append(s); out.push(s);
    }); else { const k = c.cloneNode(false); parent.append(k); walk(c, k); }
  });
  const f = document.createDocumentFragment(); walk(el, f); el.textContent = ""; el.append(f); return out;
}

function intro() {
  document.body.classList.remove("is-loading");
  $$(".hero [data-lines] .ln > span").forEach((s, i) => s.style.setProperty("--i", i));
  $$(".hero [data-r]").forEach((e, i) => e.style.setProperty("--i", i));
  requestAnimationFrame(() => $(".hero").classList.add("in"));
}

(function loader() {
  const num = $("#loadNum"), L = $("#loader"), t0 = performance.now(), DUR = 1100;
  const t = setInterval(() => {
    const n = Math.min(100, Math.round(((performance.now() - t0) / DUR) * 100)); num.textContent = n;
    if (n >= 100) { clearInterval(t); setTimeout(() => { L.classList.add("done"); setTimeout(intro, 450); }, 250); }
  }, 32);
})();

/* ---------- scroll effects ---------- */
function reveal(el) { new IntersectionObserver((es, io) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .2 }).observe(el); }
$$("[data-lines]:not(.hero *)").forEach(el => { $$(".ln > span", el).forEach((s, i) => s.style.setProperty("--i", i)); reveal(el); });

const words = $("#statement") ? splitWords($("#statement")) : [];
function counters() {
  $$("[data-count]").forEach(b => new IntersectionObserver((es, io) => es.forEach(e => {
    if (!e.isIntersecting) return; io.disconnect();
    const end = +b.dataset.count, t0 = performance.now();
    (function f(t) { const p = Math.min(1, (t - t0) / 1600); b.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(f); })(t0);
  }), { threshold: .6 }).observe(b));
}
counters();

if (hasGsap && !reduced) {
  // reel opens up as it enters
  // statement: words light up with scroll
  words.length && gsap.to(words, { opacity: 1, stagger: .1, ease: "none", scrollTrigger: { trigger: "#statement", start: "top 80%", end: "bottom 45%", scrub: true } });
  // cards fade up
  $$(".card").forEach(c => gsap.from(c, { opacity: 0, duration: .8, ease: "power2.out", scrollTrigger: { trigger: c, start: "top 90%", once: true } }));
  // services rows
  $$(".svc").forEach(s => gsap.from(s, { opacity: 0, duration: .7, ease: "power2.out", scrollTrigger: { trigger: s, start: "top 92%", once: true } }));
  // contact email letter slide
} else {
  words.forEach(w => (w.style.opacity = 1));

}

["#year0", "#yr"].forEach(s => { const el = $(s); if (el) el.textContent = new Date().getFullYear(); });