/* Portfolio behaviour — vanilla JS, no dependencies. Content lives in data.js. */
(() => {
  "use strict";
  const $ = (s, e = document) => e.querySelector(s);
  const $$ = (s, e = document) => [...e.querySelectorAll(s)];
  const { SITE, CATS, PROJECTS, BRANDS, BRAND_LABELS, ROLES, FR } = window;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const safe = (fn) => { try { return fn(); } catch (_) { return undefined; } };

  /* ---------------- i18n ---------------- */
  const EN = {
    "work.all": "All", "work.view": "View project", "brands.ig": "Instagram followers", "brands.proj": "project(s)",
    "m.overview": "Overview", "m.objective": "Creative objective", "m.role": "My responsibilities", "m.cut": "What's in the cut",
    "m.approach": "Creative approach", "m.ctx": "Campaign context", "m.format": "Format", "m.duration": "Duration", "m.category": "Category", "m.brand": "Brand",
    "m.vertical": "Vertical 9:16", "m.landscape": "Landscape 16:9", "m.close": "Close", "m.details": "Details",
    "m.ctx.dtc": "This ad is part of the brand's paid-social creative work. Account-level campaign data (not video-level) is shown in the Results section.",
    "m.ctx.brand": "The TikTok accounts shown in Results include campaigns for this brand.",
    "m.ctx.ai": "I present this project as AI-assisted: generated visuals, creative direction and editing combined. Not everything is automatically generated.",
    "m.ctx.personal": "This is a personal exercise, not a client commission.", "m.ctx.results": "See campaign results",
    "theme.dark": "Switch to dark mode", "theme.light": "Switch to light mode", "contact.copied": "Copied!", "contact.copy": "Copy email", "mail.subject": "Video editing inquiry", "work.count": "projects",
  };
  Object.assign(FR, {
    "m.ctx.brand": "Les comptes TikTok affichés dans la section Résultats incluent des campagnes pour cette marque.",
    "mail.subject": "Demande de montage vidéo", "m.details": "Détails",
    "theme.dark": "Passer en mode sombre", "theme.light": "Passer en mode clair",
  });
  let lang = safe(() => localStorage.getItem("dj-lang")) === "fr" ? "fr" : "en";
  const ui = (k) => (lang === "fr" ? FR[k] ?? EN[k] : EN[k]) ?? k;
  const tr = (pair) => pair[lang === "fr" ? 1 : 0];

  /* ---------------- helpers ---------------- */
  const pBySlug = (s) => PROJECTS.find((p) => p.slug === s);
  const catOf = (p) => CATS.find((c) => c.id === p.cat);
  const brandName = (p) => (BRANDS.find((b) => b.id === p.brand) || {}).name || BRAND_LABELS[p.brand] || "";
  const poster = (p) => `media/poster/${p.slug}.webp`;
  const posterDims = (p) => (p.fmt === "16:9" ? [960, 540] : [540, 960]);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------- nav ---------------- */
  const nav = $("#nav"), menu = $("#menu"), burger = $("#burger");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const closeMenu = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); };
  burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", String(o)); });
  menu.addEventListener("click", (e) => e.target.closest("a") && closeMenu());
  addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) $$("a", menu).forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["work", "brands", "results", "about", "contact"].forEach((id) => spy.observe($("#" + id)));

  /* ---------------- hero tiles (muted, short, lazy) ---------------- */
  const HERO = ["ego-light-skin-hypermotion", "prestige-promotion-real-estate", "dentavia-dtc"];
  const heroBox = $("#heroReelTiles");
  heroBox.innerHTML = HERO.map((s) => {
    const p = pBySlug(s), d = posterDims(p);
    return `<button class="tile" type="button" data-open="${s}" aria-label="${esc(brandName(p))} — ${esc(tr(p.title))}">
      <img src="${poster(p)}" width="${d[0]}" height="${d[1]}" alt="" decoding="async" ${s === HERO[0] ? 'fetchpriority="high"' : ""}>
      ${reduced || saveData ? "" : `<video muted loop playsinline autoplay preload="metadata" src="media/preview/${s}.mp4" aria-hidden="true"></video>`}
      <span class="cap">${esc(brandName(p))}</span></button>`;
  }).join("");
  $$("video", heroBox).forEach((v) => v.addEventListener("playing", () => v.classList.add("on"), { once: true }));
  if ("IntersectionObserver" in window) {
    const vis = new IntersectionObserver((es) => es.forEach((e) => { const v = $("video", e.target); if (v) e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: .15 });
    $$(".tile", heroBox).forEach((t) => vis.observe(t));
  }

  /* ---------------- work: filters + categories + cards ---------------- */
  let filter = "all";
  const filtersEl = $("#filters"), catsEl = $("#cats");
  function renderFilters() {
    const chip = (id, label, n) => `<button class="chip" role="tab" type="button" data-f="${id}" aria-selected="${filter === id}">${esc(label)} <small>${n}</small></button>`;
    filtersEl.innerHTML = chip("all", ui("work.all"), PROJECTS.length) +
      CATS.map((c) => chip(c.id, tr(c.chip),PROJECTS.filter((p) => p.cat === c.id).length)).join("");
  }
  function card(p) {
    const d = posterDims(p), c = catOf(p);
    return `<button class="card" type="button" data-slug="${p.slug}" aria-label="${esc(brandName(p))} — ${esc(tr(p.title))}. ${esc(ui("work.view"))}">
      <img src="${poster(p)}" width="${d[0]}" height="${d[1]}" alt="" loading="lazy" decoding="async">
      <span class="tag">${esc(tr(c.short))}</span><span class="len">${p.dur}</span>
      <span class="info"><small>${esc(brandName(p))}</small><b>${esc(tr(p.title))}</b><span class="view">${esc(ui("work.view"))} <span aria-hidden="true">↗</span></span></span>
    </button>`;
  }
  function renderCats() {
    catsEl.innerHTML = CATS.map((c) => `<section class="cat" data-cat="${c.id}" aria-label="${esc(tr(c.title))}" ${filter !== "all" && filter !== c.id ? "hidden" : ""}>
      <header class="cat-head"><span class="cat-n" aria-hidden="true">${c.n}</span><h3>${esc(tr(c.title))}</h3><p>${esc(tr(c.desc))}</p>${c.tools ? `<p class="cat-tools mono">${esc(tr(c.tools))}</p>` : ""}</header>
      <div class="grid">${PROJECTS.filter((p) => p.cat === c.id).map(card).join("")}</div></section>`).join("");
  }
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    filter = b.dataset.f;
    $$(".chip", filtersEl).forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    $$(".cat", catsEl).forEach((s) => (s.hidden = filter !== "all" && s.dataset.cat !== filter));
  });
  // hover previews: created on demand, silent, short
  if (canHover && !reduced && !saveData) {
    const play = (c) => {
      let v = $("video", c);
      if (!v) {
        v = document.createElement("video");
        Object.assign(v, { muted: true, loop: true, playsInline: true, preload: "auto" });
        v.setAttribute("aria-hidden", "true"); v.src = `media/preview/${c.dataset.slug}.mp4`;
        c.insertBefore(v, $("img", c).nextSibling);
      }
      c.classList.add("hov");
      v.play().then(() => v.classList.add("on")).catch(() => {});
    };
    const stop = (c) => { c.classList.remove("hov"); const v = $("video", c); if (v) { v.pause(); v.classList.remove("on"); } };
    catsEl.addEventListener("mouseover", (e) => { const c = e.target.closest(".card"); if (c && !c.contains(e.relatedTarget)) play(c); });
    catsEl.addEventListener("mouseout", (e) => { const c = e.target.closest(".card"); if (c && !c.contains(e.relatedTarget)) stop(c); });
    catsEl.addEventListener("focusin", (e) => { const c = e.target.closest(".card"); c && play(c); });
    catsEl.addEventListener("focusout", (e) => { const c = e.target.closest(".card"); c && stop(c); });
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-slug], [data-open]"); if (!t) return;
    openProject(t.dataset.slug || t.dataset.open, { user: true, opener: t });
  });

  /* ---------------- brands ---------------- */
  function renderBrands() {
    $("#brandGrid").innerHTML = BRANDS.map((b) => {
      const projects = PROJECTS.filter((p) => p.brand === b.id);
      const logo = b.logo ? `<img class="brand-logo" src="media/brands/${b.logo}" width="96" height="96" alt="" loading="lazy">`
        : `<span class="brand-mono" aria-hidden="true">${esc(b.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2))}</span>`;
      const meta = (b.ig ? `<b>${b.ig}</b>${esc(ui("brands.ig"))}<br>` : "") + (projects.length ? `${projects.length} ${esc(ui("brands.proj"))}` : "");
      const inner = `<span class="brand-top">${logo}<span class="brand-name">${esc(b.name)}</span></span><span class="brand-meta">${meta}</span>`;
      return projects.length
        ? `<li><button type="button" class="brand-card" data-slug="${projects[0].slug}" aria-label="${esc(b.name)} — ${esc(ui("work.view"))}">${inner}</button></li>`
        : `<li><div class="brand-card">${inner}</div></li>`;
    }).join("");
  }

  /* ---------------- project modal (case study) ---------------- */
  const modal = $("#modal"), mMedia = $("#mMedia"), mContent = $("#mContent");
  let current = null, lastFocus = null;
  function section(title, body) { return `<div class="m-sec"><h4>${esc(title)}</h4>${body}</div>`; }
  function buildContent(p) {
    const c = catOf(p), idx = PROJECTS.indexOf(p);
    $("#mKicker").innerHTML = `<b>${c.n}</b><span>${esc(tr(c.title))}</span><span>/</span><span>${esc(brandName(p))}</span>`;
    $("#mTitle").textContent = tr(p.title);
    let html = section(ui("m.overview"), `<p>${esc(tr(p.ov))}</p>`) + section(ui("m.objective"), `<p>${esc(tr(p.obj))}</p>`);
    html += section(ui("m.role"), `<ul>${p.roles.map((r) => `<li>${esc(tr(ROLES[r]))}</li>`).join("")}</ul>`);
    html += section(ui("m.cut"), `<ul>${p.feat.map((f) => `<li>${esc(tr(f))}</li>`).join("")}</ul>`);
    html += section(ui("m.approach"), `<p>${esc(tr(p.appr))}</p>`);
    let ctx = "";
    if (p.cat === "dtc") {
      ctx = ui("m.ctx.dtc") + (["ego", "glowme", "dentavia"].includes(p.brand) ? " " + ui("m.ctx.brand") : "");
      ctx = `<p class="note">${esc(ctx)} <a href="#results" data-jump>${esc(ui("m.ctx.results"))}</a></p>`;
    } else if (p.cat === "ai") ctx = `<p class="note">${esc(ui("m.ctx.ai"))}</p>`;
    else if (p.brand === "personal") ctx = `<p class="note">${esc(ui("m.ctx.personal"))}</p>`;
    if (ctx) html += section(ui("m.ctx"), ctx);
    html += section(ui("m.details"), `<dl class="m-meta">
      <div><dt>${esc(ui("m.brand"))}</dt><dd>${esc(brandName(p))}</dd></div>
      <div><dt>${esc(ui("m.category"))}</dt><dd>${esc(tr(c.short))}</dd></div>
      <div><dt>${esc(ui("m.format"))}</dt><dd>${esc(p.fmt === "16:9" ? ui("m.landscape") : ui("m.vertical"))}</dd></div>
      <div><dt>${esc(ui("m.duration"))}</dt><dd>${p.dur}</dd></div></dl>`);
    mContent.innerHTML = html;
    $("#mPrev").hidden = idx === 0; $("#mNext").hidden = idx === PROJECTS.length - 1;
  }
  function openProject(slug, { user = false, opener = null, replace = false } = {}) {
    const p = pBySlug(slug); if (!p) return;
    if (!modal.hidden && current === p) return;
    current = p;
    if (modal.hidden) { lastFocus = opener || document.activeElement; }
    buildContent(p);
    const d = posterDims(p);
    mMedia.innerHTML = `<video controls playsinline preload="metadata" poster="${poster(p)}" src="media/video/${p.slug}.mp4" width="${d[0]}" height="${d[1]}" aria-label="${esc(tr(p.title))}"></video>`;
    const v = $("video", mMedia);
    if (user) v.play().catch(() => { v.muted = true; v.play().catch(() => {}); }); // user-initiated only; never on page load
    modal.hidden = false; modal.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll");
    $("#mBody").scrollTop = 0; $(".modal-box", modal).scrollTop = 0;
    $(".modal-box", modal).classList.toggle("is-land", p.fmt === "16:9");
    if (!replace) safe(() => history.replaceState(null, "", "#project=" + slug));
    $(".m-close", modal).focus({ preventScroll: true });
  }
  function closeProject() {
    if (modal.hidden) return;
    const v = $("video", mMedia); if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    mMedia.innerHTML = ""; modal.hidden = true; modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll");
    safe(() => history.replaceState(null, "", location.pathname + location.search));
    current = null; lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  const step = (n) => { const i = PROJECTS.indexOf(current) + n; if (PROJECTS[i]) openProject(PROJECTS[i].slug, { user: true }); };
  $("#mPrev").addEventListener("click", () => step(-1));
  $("#mNext").addEventListener("click", () => step(1));
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeProject();
    const j = e.target.closest("[data-jump]");
    if (j) { e.preventDefault(); closeProject(); $("#results").scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }
  });
  addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeProject();
    else if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && e.target.tagName !== "VIDEO") step(e.key === "ArrowLeft" ? -1 : 1);
    else if (e.key === "Tab") { // simple focus trap
      const f = $$("button:not([hidden]), a[href], video[controls]", modal).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------- results: count-up + lightbox ---------------- */
  const fmtNum = (n, dec) => n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  function countUp(el) {
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0), pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    const t0 = performance.now(), dur = 1500;
    (function f(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = pre + fmtNum(to * e, dec) + suf;
      if (k < 1) requestAnimationFrame(f); else el.textContent = pre + fmtNum(to, dec) + suf;
    })(t0);
  }
  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); } }), { threshold: .6 });
    $$(".num").forEach((n) => { n.textContent = (n.dataset.prefix || "") + fmtNum(0, +(n.dataset.dec || 0)) + (n.dataset.suffix || ""); io.observe(n); });
  }
  const lb = $("#lightbox"), lbImg = $("#lbImg"); let lbOpener = null;
  document.addEventListener("click", (e) => {
    const z = e.target.closest("[data-zoom]");
    if (z) { lbOpener = z; lbImg.src = z.dataset.zoom; lbImg.alt = z.dataset.alt || ""; lb.hidden = false; document.body.classList.add("no-scroll"); $(".m-close", lb).focus(); }
    else if (!lb.hidden && (e.target.closest("[data-lb-close]") || e.target === lb)) closeLb();
  });
  function closeLb() { lb.hidden = true; document.body.classList.remove("no-scroll"); lbOpener && lbOpener.focus(); }
  addEventListener("keydown", (e) => e.key === "Escape" && !lb.hidden && closeLb());

  /* ---------------- contact ---------------- */
  function renderContact() {
    $$("#cEmail, [data-c=email]").forEach((a) => (a.href = `mailto:${SITE.email}?subject=${encodeURIComponent(ui("mail.subject"))}`));
    $$("#cWa, [data-c=wa]").forEach((a) => (a.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg[lang === "fr" ? 1 : 0])}`));
    $("#cEmailText").textContent = SITE.email;
    const ph = $("#cPhone"); ph.href = "tel:" + SITE.phone; ph.textContent = SITE.phoneLabel;
    $$("#cLi, [data-c=li]").forEach((li) => { if (SITE.linkedin) { li.href = SITE.linkedin; li.hidden = false; } else li.hidden = true; });
    $$("#cCv, [data-c=cv]").forEach((a) => (a.href = SITE.cv));
  }
  $("#cCopy").addEventListener("click", async (e) => {
    const b = e.currentTarget;
    try { await navigator.clipboard.writeText(SITE.email); }
    catch (_) { const t = document.createElement("textarea"); t.value = SITE.email; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
    b.textContent = ui("contact.copied"); setTimeout(() => (b.textContent = ui("contact.copy")), 1800);
  });

  /* ---------------- language ---------------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => {
      if (!("en" in el.dataset)) el.dataset.en = el.innerHTML;
      el.innerHTML = lang === "fr" && FR[el.dataset.i18n] != null ? FR[el.dataset.i18n] : el.dataset.en;
    });
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.title = lang === "fr" ? "Djaouad Hassounat — Monteur vidéo réseaux sociaux & producteur vidéo créatif" : "Djaouad Hassounat — Social Media Video Editor & Creative Video Producer";
    renderFilters(); renderCats(); renderBrands(); renderContact();
    $$(".tile", heroBox).forEach((t) => t.setAttribute("aria-label", `${brandName(pBySlug(t.dataset.open))} — ${tr(pBySlug(t.dataset.open).title)}`));
    if (current) buildContent(current);
    syncTheme();
  }
  $$(".lang button").forEach((b) => b.addEventListener("click", () => { lang = b.dataset.lang; safe(() => localStorage.setItem("dj-lang", lang)); applyLang(); }));

  /* ---------------- theme (day by default, night on request) ---------------- */
  const themeBtn = $("#themeBtn");
  const isDark = () => document.documentElement.dataset.theme === "dark";
  function syncTheme() {
    themeBtn.setAttribute("aria-label", ui(isDark() ? "theme.light" : "theme.dark"));
    const m = $('meta[name="theme-color"]'); if (m) m.content = isDark() ? "#0b0b0c" : "#f6f2ea";
  }
  themeBtn.addEventListener("click", () => {
    if (isDark()) delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = "dark";
    safe(() => localStorage.setItem("dj-theme", isDark() ? "dark" : "light")); syncTheme();
  });

  /* ---------------- reveal on scroll ---------------- */
  function reveal() {
    if (reduced || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .06, rootMargin: "0px 0px -6% 0px" });
    $$(".sec-head, .filters, .brands, .warn, .panel, .about-main, .about-side, .contact .wrap > *").forEach((el) => { el.classList.add("rv"); io.observe(el); });
  }

  /* ---------------- init ---------------- */
  $("#yr").textContent = new Date().getFullYear();
  applyLang();
  reveal();
  const m = /^#project=([\w-]+)$/.exec(location.hash);
  if (m) openProject(m[1], { user: false, replace: true });
  addEventListener("hashchange", () => { const h = /^#project=([\w-]+)$/.exec(location.hash); if (h) openProject(h[1]); else if (!modal.hidden && location.hash === "") closeProject(); });
})();
