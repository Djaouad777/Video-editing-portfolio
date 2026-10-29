/* Typewriter line in the contact card (follows the active language) */
(function () {
  const el = document.getElementById("typed");
  if (!el) return;
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let words = I18N.t("typed"), w = 0, i = 0, del = false, timer = null, run = 0;

  function restart() {
    clearTimeout(timer); run++;
    words = I18N.t("typed"); w = 0; i = 0; del = false;
    if (reduce) { el.textContent = words[0]; return; }
    tick(run);
  }
  function tick(id) {
    if (id !== run) return;
    const full = words[w];
    el.textContent = full.slice(0, i);
    if (!del && i === full.length) { del = true; timer = setTimeout(() => tick(id), 1700); return; }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; timer = setTimeout(() => tick(id), 350); return; }
    i += del ? -1 : 1;
    timer = setTimeout(() => tick(id), del ? 28 : 65);
  }
  I18N.onChange(restart);
  restart();
})();
