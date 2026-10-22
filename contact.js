/* Typewriter line in the contact card */
(function () {
  const el = document.getElementById("typed");
  if (!el) return;
  const words = ["un Reel qui explose.", "un clip mémorable.", "une pub qui convertit.", "un film qui marque."];
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) { el.textContent = words[0]; return; }
  let w = 0, i = 0, del = false;
  (function tick() {
    const full = words[w];
    el.textContent = full.slice(0, i);
    if (!del && i === full.length) { del = true; return setTimeout(tick, 1700); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; return setTimeout(tick, 350); }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 28 : 65);
  })();
})();
