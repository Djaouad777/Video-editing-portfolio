/* =====================================================
   LANGUES / LANGUAGES  —  FR (par défaut) · EN
   Tous les textes du site sont ici. Pour changer un texte, modifiez-le ci-dessous.
   Les descriptions des vidéos sont plus bas (section "PROJETS").
   ===================================================== */
(function () {
  const D = {
    fr: {
      "meta.title": "Djaouad — Monteur vidéo",
      "meta.desc": "Monteur vidéo : Reels, vidéos produit en hypermotion IA et UGC IA. Sélection de projets.",
      "nav.work": "Projets", "nav.about": "À propos", "nav.services": "Services", "nav.contact": "Contact",
      "hero.l1": "Je monte", "hero.l2": "des vidéos", "hero.l3a": "qui", "hero.l3b": "captent", "hero.l3c": "l'attention.",
      "hero.p": "Monteur indépendant pour marques, créateurs et artistes. L'histoire d'abord, le rythme toujours.",
      "hero.cta1": "Voir les projets", "hero.cta2": "Me contacter",
      "tick.1": "Accroches", "tick.2": "Rythme", "tick.3": "Sous-titres", "tick.4": "Sound design", "tick.5": "Rétention",
      "work.title": "Projets choisis", "filter.all": "Tous",
      "about.label": "À propos",
      "about.bio": "Monteur vidéo, je crée des Reels, des vidéos produit en hypermotion IA et des UGC IA pour des marques de beauté, de parfum et d'immobilier. Une accroche forte, un rythme précis et des sous-titres lisibles.",
      "about.tools": "Outils", "tool.pr": "Montage", "tool.ae": "Motion design", "tool.cc": "Reels & effets",
      "svc.label": "Services",
      "svc1.t": "Reels & contenus verticaux", "svc1.p": "Reels, TikToks et Shorts pensés pour la rétention : accroches, rythme, sous-titres et son.",
      "svc2.t": "Vidéos produit IA & hypermotion", "svc2.p": "Visuels produit générés par IA et animés en hypermotion : mouvements de caméra impossibles, transitions fluides, rendu premium.",
      "svc3.t": "Accroches & sous-titres", "svc3.p": "Des hooks percutants dans les premières secondes et des sous-titres dynamiques pour maximiser la rétention.",
      "svc4.t": "Motion design & effets", "svc4.p": "Transitions, effets visuels et habillage graphique pour des vidéos qui se démarquent.",
      "contact.h2": "Vous avez<br>une <em>idée&nbsp;?</em>",
      "contact.pre": "Transformons-la en",
      "typed": ["un Reel qui explose.", "un clip mémorable.", "une pub qui convertit.", "un film qui marque."],
      "wa.label": "Sur WhatsApp", "wa.cta": "Écrivez-moi",
      "wa.msg": "Bonjour ! J'ai une idée de projet vidéo 💡",
      "footer.rights": "Tous droits réservés.", "footer.top": "Haut de page ↑",
      "m.close": "Fermer", "m.client": "Client", "m.year": "Année", "m.cat": "Catégorie", "m.tools": "Outils", "m.dur": "Durée",
      "m.empty": "Pas encore de vidéo.", "m.view": "Voir", "m.menu": "Menu", "m.lang": "Langue"
    },
    en: {
      "meta.title": "Djaouad — Video Editor",
      "meta.desc": "Video editor: Reels, AI hypermotion product videos and AI UGC. Selected work.",
      "nav.work": "Work", "nav.about": "About", "nav.services": "Services", "nav.contact": "Contact",
      "hero.l1": "I edit", "hero.l2": "videos", "hero.l3a": "that", "hero.l3b": "grab", "hero.l3c": "attention.",
      "hero.p": "Independent editor for brands, creators and artists. Story first, rhythm always.",
      "hero.cta1": "View projects", "hero.cta2": "Contact me",
      "tick.1": "Hooks", "tick.2": "Pacing", "tick.3": "Captions", "tick.4": "Sound design", "tick.5": "Retention",
      "work.title": "Selected work", "filter.all": "All",
      "about.label": "About",
      "about.bio": "Video editor creating Reels, AI hypermotion product videos and AI UGC for beauty, fragrance and real-estate brands. A strong hook, precise rhythm and readable captions.",
      "about.tools": "Tools", "tool.pr": "Editing", "tool.ae": "Motion design", "tool.cc": "Reels & effects",
      "svc.label": "Services",
      "svc1.t": "Reels & vertical content", "svc1.p": "Reels, TikToks and Shorts built for retention: hooks, pacing, captions and sound.",
      "svc2.t": "AI product videos & hypermotion", "svc2.p": "AI-generated product visuals brought to life in hypermotion: impossible camera moves, fluid transitions, a premium look.",
      "svc3.t": "Hooks & captions", "svc3.p": "Punchy hooks in the first seconds and dynamic captions to maximize retention.",
      "svc4.t": "Motion design & effects", "svc4.p": "Transitions, visual effects and graphic styling for videos that stand out.",
      "contact.h2": "Got an<br><em>idea?</em>",
      "contact.pre": "Let's turn it into",
      "typed": ["a Reel that blows up.", "a memorable clip.", "an ad that converts.", "a film that stands out."],
      "wa.label": "On WhatsApp", "wa.cta": "Message me",
      "wa.msg": "Hi! I have a video project idea 💡",
      "footer.rights": "All rights reserved.", "footer.top": "Back to top ↑",
      "m.close": "Close", "m.client": "Client", "m.year": "Year", "m.cat": "Category", "m.tools": "Tools", "m.dur": "Duration",
      "m.empty": "No video yet.", "m.view": "View", "m.menu": "Menu", "m.lang": "Language"
    }
  };

  /* ---------- PROJETS : titre + petite description de chaque vidéo ----------
     La clé (ex. "reel-1") correspond au champ id dans script.js. */
  const P = {
    fr: {
      "reel-1": { title: "Reel face caméra", desc: "Montage dynamique d'un talking-head : coupes rythmées, sous-titres animés en arabe et habillage graphique." },
      "reel-2": { title: "Prestige Promotion", desc: "Reel immobilier : visite d'un intérieur avec titre animé, sous-titres et rythme fluide pour valoriser le bien." },
      "reel-3": { title: "Maruderm", desc: "Reel pour la marque de soins Maruderm : sous-titres dynamiques et visuels doux pour mettre le produit en avant." },
      "reel-4": { title: "Reel illustré", desc: "Reel animé avec illustrations : personnages, textes à l'écran et rythme soutenu pour expliquer un sujet simplement." },
      "reel-5": { title: "Talking-head – Creator edit", desc: "Captions animées mot par mot, texte derrière le sujet (masking), icônes animées et motion design.\nMontage : Premiere Pro · Exercice personnel – rushes non personnels, montage 100 % réalisé par moi." },
      "ai-1": { title: "Hypermotion — Désert", desc: "Vidéo hypermotion générée par IA : plan cinématographique d'un désert, lumière dorée et mouvement de caméra fluide.", tools: "IA générative" },
      "ai-2": { title: "Hypermotion — EGO", desc: "Vidéo produit en hypermotion IA pour un parfum EGO : bouteille, matières et ingrédients en mouvement.", tools: "IA générative" },
      "ugc-1": { title: "UGC IA — Témoignage", desc: "Contenu UGC généré par IA : personnage face caméra, ton naturel de témoignage, prêt pour les réseaux sociaux.", tools: "IA générative" },
      "ugc-2": { title: "UGC IA — Glow Me", desc: "UGC IA pour la gamme de soins Glow Me : avis spontané face caméra dans une routine skincare.", tools: "IA générative" }
    },
    en: {
      "reel-1": { title: "Talking-head Reel", desc: "Dynamic talking-head edit: rhythmic cuts, animated Arabic subtitles and graphic styling." },
      "reel-2": { title: "Prestige Promotion", desc: "Real-estate Reel: an interior walkthrough with an animated title, subtitles and smooth pacing to showcase the property." },
      "reel-3": { title: "Maruderm", desc: "Reel for the skincare brand Maruderm: dynamic subtitles and soft visuals that put the product first." },
      "reel-4": { title: "Illustrated Reel", desc: "Animated Reel with illustrations: characters, on-screen text and steady pacing to explain a topic simply." },
      "reel-5": { title: "Talking-head – Creator edit", desc: "Word-by-word animated captions, text behind the subject (masking), animated icons and motion design.\nEditing: Premiere Pro · Personal exercise – footage not mine, editing 100% done by me." },
      "ai-1": { title: "Hypermotion — Desert", desc: "AI-generated hypermotion video: a cinematic desert shot with golden light and fluid camera movement.", tools: "Generative AI" },
      "ai-2": { title: "Hypermotion — EGO", desc: "AI hypermotion product video for an EGO fragrance: bottle, textures and ingredients in motion.", tools: "Generative AI" },
      "ugc-1": { title: "AI UGC — Testimonial", desc: "AI-generated UGC: a person talking to camera in a natural testimonial tone, ready for social media.", tools: "Generative AI" },
      "ugc-2": { title: "AI UGC — Glow Me", desc: "AI UGC for the Glow Me skincare range: a spontaneous review to camera inside a skincare routine.", tools: "Generative AI" }
    }
  };
  const CAT = {
    fr: { "Reels": "Reels", "Hypermotion IA": "Hypermotion IA", "AI UGC": "AI UGC" },
    en: { "Reels": "Reels", "Hypermotion IA": "AI Hypermotion", "AI UGC": "AI UGC" }
  };

  const WA = "https://wa.me/213775904983?text=";
  let lang = "fr";
  try { const s = localStorage.getItem("lang"); if (s === "fr" || s === "en") lang = s; } catch (e) {}
  const listeners = [];

  const get = k => { const v = D[lang][k]; return v === undefined ? D.fr[k] : v; };

  function apply() {
    document.documentElement.lang = lang;
    document.title = get("meta.title");
    const md = document.querySelector('meta[name="description"]'); if (md) md.content = get("meta.desc");
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = get(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = get(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", get(el.dataset.i18nAria)); });
    document.querySelectorAll("[data-i18n-cursor]").forEach(el => { el.dataset.cursor = get(el.dataset.i18nCursor); });
    const wa = document.querySelector(".wa-btn"); if (wa) wa.href = WA + encodeURIComponent(get("wa.msg"));
    document.querySelectorAll(".lang button").forEach(b => {
      const on = b.dataset.lang === lang; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
    });
    listeners.forEach(fn => fn(lang));
  }
  function set(l) {
    if (l !== "fr" && l !== "en") return;
    lang = l; try { localStorage.setItem("lang", l); } catch (e) {}
    apply();
  }

  window.I18N = {
    get lang() { return lang; },
    t: get,
    proj: id => (P[lang] && P[lang][id]) || (P.fr[id]) || {},
    cat: c => (CAT[lang] && CAT[lang][c]) || c,
    set, apply, onChange: fn => listeners.push(fn)
  };

  document.addEventListener("click", e => {
    const b = e.target.closest(".lang button"); if (b) set(b.dataset.lang);
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
})();
