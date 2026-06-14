(function () {
  const SYNODIC_MONTH = 29.53059;
  const KNOWN_NEW_MOON = new Date(2024, 0, 11, 11, 57);

  function getMoonAge(date) {
    const diff = date.getTime() - KNOWN_NEW_MOON.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  }

  function getPhaseName(age) {
    const norm = age / SYNODIC_MONTH;
    if (norm < 0.0625) return "Lua Nova";
    if (norm < 0.1875) return "Quarto Crescente";
    if (norm < 0.3125) return "Lua Crescente Gibosa";
    if (norm < 0.4375) return "Lua Cheia";
    if (norm < 0.5625) return "Lua Cheia";
    if (norm < 0.6875) return "Lua Minguante Gibosa";
    if (norm < 0.8125) return "Quarto Minguante";
    if (norm < 0.9375) return "Lua Minguante";
    return "Lua Nova";
  }

  function setShadow(age) {
    const shadow = document.querySelector(".moon-shadow");
    const label = document.querySelector(".moon-phase-label");
    if (!shadow) return;

    const norm = age / SYNODIC_MONTH;
    let tx;

    if (norm <= 0.5) {
      tx = 100 - (norm * 200);
    } else {
      tx = -100 + ((norm - 0.5) * 200);
    }

    shadow.style.transform = `translateX(${tx}%)`;
    if (label) label.textContent = getPhaseName(age);
  }

  function initSlider() {
    const slider = document.querySelector(".moon-slider");
    if (!slider) return;

    const today = new Date();
    const currentAge = getMoonAge(today);
    const sliderValue = (currentAge / SYNODIC_MONTH) * 100;
    slider.value = sliderValue;
    setShadow(currentAge);

    slider.addEventListener("input", () => {
      const age = (parseFloat(slider.value) / 100) * SYNODIC_MONTH;
      setShadow(age);
    });

    // Touch swipe on watch face
    const watchFace = document.querySelector(".hero-watch");
    if (!watchFace) return;
    let startX = 0;
    let startVal = 0;

    watchFace.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startVal = parseFloat(slider.value);
    }, { passive: true });

    watchFace.addEventListener("touchmove", (e) => {
      const dx = e.touches[0].clientX - startX;
      const range = window.innerWidth * 0.6;
      const delta = (dx / range) * 100;
      const newVal = Math.max(0, Math.min(100, startVal + delta));
      slider.value = newVal;
      const age = (newVal / 100) * SYNODIC_MONTH;
      setShadow(age);
    }, { passive: true });
  }

  function initClock() {
    const hourHand = document.querySelector(".watch-hand.hour");
    const minHand = document.querySelector(".watch-hand.minute");
    const secHand = document.querySelector(".watch-hand.second");
    if (!hourHand || !minHand || !secHand) return;

    function update() {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hour = (now.getHours() % 12) + min / 60;

      hourHand.style.setProperty("--hour-deg", `${hour * 30}deg`);
      minHand.style.setProperty("--min-deg", `${min * 6}deg`);
      secHand.style.setProperty("--sec-deg", `${sec * 6}deg`);

      requestAnimationFrame(update);
    }
    update();
  }

  function generateStars() {
    const container = document.querySelector(".hero-stars");
    if (!container) return;

    for (let i = 0; i < 80; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.style.left = `${(i * 37 + 13) % 100}%`;
      star.style.top = `${(i * 53 + 7) % 100}%`;
      star.style.animationDelay = `${(i * 0.7) % 3}s`;
      star.style.width = star.style.height = `${1 + (i % 3)}px`;
      container.appendChild(star);
    }
  }

  function daysUntilFullMoon(fromDate) {
    for (let i = 0; i <= 30; i++) {
      const future = new Date(fromDate);
      future.setDate(future.getDate() + i);
      const age = getMoonAge(future);
      if (getPhaseName(age) === "Lua Cheia") return i;
    }
    return null;
  }

  function init() {
    generateStars();
    initSlider();
    initClock();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.HMMoon = { getMoonAge, getPhaseName, setShadow, SYNODIC_MONTH, daysUntilFullMoon };
})();
