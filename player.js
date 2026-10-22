/* Custom player controls (play/pause, scrubbable timeline, time, mute) for videos opened in the modal */
(function () {
  const player = document.getElementById("player");
  if (!player) return;

  const fmt = s => {
    if (!isFinite(s)) return "0:00";
    s = Math.max(0, Math.floor(s));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  };
  const ICON = {
    play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    vol: '<svg viewBox="0 0 24 24"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="m15.5 9.5 5 5m0-5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  function attach(v) {
    if (v.dataset.pc) return;
    v.dataset.pc = "1";
    v.controls = false;
    v.loop = true;

    const bar = document.createElement("div");
    bar.className = "pc";
    bar.innerHTML =
      '<button type="button" class="pc-btn pc-play" aria-label="Lecture / pause"></button>' +
      '<span class="pc-time">0:00</span>' +
      '<input class="pc-range" type="range" min="0" max="1000" step="1" value="0" aria-label="Position dans la vidéo">' +
      '<span class="pc-time pc-dur">0:00</span>' +
      '<button type="button" class="pc-btn pc-mute" aria-label="Son"></button>';
    player.append(bar);

    const play = bar.querySelector(".pc-play"), mute = bar.querySelector(".pc-mute");
    const range = bar.querySelector(".pc-range"), cur = bar.querySelector(".pc-time"), dur = bar.querySelector(".pc-dur");
    let scrubbing = false;

    const paint = () => {
      play.innerHTML = v.paused ? ICON.play : ICON.pause;
      mute.innerHTML = v.muted || v.volume === 0 ? ICON.mute : ICON.vol;
      player.classList.toggle("is-paused", v.paused);
    };
    const setRange = () => {
      const p = v.duration ? v.currentTime / v.duration : 0;
      if (!scrubbing) range.value = Math.round(p * 1000);
      range.style.setProperty("--p", (range.value / 10) + "%");
      cur.textContent = fmt(v.currentTime);
    };
    const toggle = () => (v.paused ? v.play() : v.pause());

    play.addEventListener("click", toggle);
    v.addEventListener("click", toggle);
    mute.addEventListener("click", () => { v.muted = !v.muted; paint(); });
    v.addEventListener("play", paint);
    v.addEventListener("pause", paint);
    v.addEventListener("volumechange", paint);
    v.addEventListener("timeupdate", setRange);
    v.addEventListener("loadedmetadata", () => { dur.textContent = fmt(v.duration); setRange(); });
    if (v.readyState >= 1) dur.textContent = fmt(v.duration);

    // scrubbing: drag or tap anywhere on the timeline
    range.addEventListener("pointerdown", () => { scrubbing = true; });
    range.addEventListener("input", () => {
      if (v.duration) v.currentTime = (range.value / 1000) * v.duration;
      range.style.setProperty("--p", (range.value / 10) + "%");
      cur.textContent = fmt(v.currentTime);
    });
    const end = () => { scrubbing = false; };
    range.addEventListener("pointerup", end);
    range.addEventListener("change", end);
    addEventListener("pointerup", end);

    paint();
  }

  // attach whenever the modal inserts a <video>
  new MutationObserver(() => {
    const v = player.querySelector("video");
    if (v) attach(v);
  }).observe(player, { childList: true });

  // keyboard: space = play/pause, arrows = seek 5s
  addEventListener("keydown", e => {
    const v = player.querySelector("video");
    if (!v || !document.getElementById("modal").classList.contains("open")) return;
    if (e.code === "Space") { e.preventDefault(); v.paused ? v.play() : v.pause(); }
    if (e.key === "ArrowRight") v.currentTime = Math.min(v.duration || 0, v.currentTime + 5);
    if (e.key === "ArrowLeft") v.currentTime = Math.max(0, v.currentTime - 5);
  });
})();
