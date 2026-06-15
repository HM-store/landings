(function () {
  const id = new URLSearchParams(location.search).get("id");
  const w = id && window.HM.byId(id);
  if (!w) { location.href = "index.html#colecao"; return; }

  const S = window.HM.store;
  const isMobile = () => window.innerWidth < 768;
  const imgBase = `assets/img/watches/${w.id}/`;

  function setMeta() {
    const title = `MoonSwatch ${w.name} — Releitura HM Store`;
    const desc = w.description;
    document.title = title;
    document.getElementById("page-h1").textContent = `MoonSwatch ${w.name} — Releitura HM Store`;
    const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
    set('meta[name="description"]', "content", desc);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", desc);
  }

  function renderBreadcrumb() {
    document.getElementById("breadcrumb").innerHTML =
      `<a href="index.html">Início</a><span class="sep">›</span>` +
      `<a href="index.html#colecao">Coleção</a><span class="sep">›</span>` +
      `<span>${w.name}</span>`;
  }

  // ---------- HERO TEMÁTICO ----------
  function renderHero() {
    const hero = document.getElementById("pdp-hero");
    hero.setAttribute("data-planet", w.planet);

    const heroTag = w.heroTag || `Releitura · biocerâmica · ${w.caseColor}`;
    const heroHeadline = (w.heroHeadline || w.subtitle).replace(/\n/g, "<br>");
    const heroSub = w.heroSub || w.description;
    const ctaHref = window.HM.enjoeiLink(w);
    const ctaText = w.limited ? "Consultar disponibilidade" : "Comprar no Enjoei";
    const priceLine = `<span class="hero-price-now" style="font-size:14px;letter-spacing:.12em">Ver preço no Enjoei</span>`;

    hero.innerHTML = `
      <div class="pdp-hero-pattern" aria-hidden="true">${patternSVG(w.planet)}</div>
      <div class="pdp-hero-inner">
        <div class="pdp-hero-copy">
          <span class="pdp-hero-tag">${heroTag}</span>
          <h2 class="pdp-hero-headline">${heroHeadline}</h2>
          <p class="pdp-hero-sub">${heroSub}</p>
          <div class="pdp-hero-price">${priceLine}</div>
          <a class="btn pdp-hero-cta" href="${ctaHref}" target="_blank" rel="noopener">
            ${ctaText}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <p class="pdp-hero-microcopy">Compra protegida pelo Enjoei · 7 dias para devolver · Envio para todo Brasil</p>
        </div>
        <div class="pdp-hero-visual">
          <img src="${imgBase}${w.images[0]}" alt="${w.name}" class="pdp-hero-img" loading="eager">
        </div>
      </div>
    `;
  }

  // ---------- SVG PATTERNS POR PLANETA ----------
  function patternSVG(planet) {
    if (planet === "moon") {
      // Órbitas concêntricas + crateras espalhadas
      return `
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="moonGrad" cx="78%" cy="40%" r="65%">
              <stop offset="0%" stop-color="#3a3a44" stop-opacity="0.55"/>
              <stop offset="100%" stop-color="#0E0E12" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#moonGrad)"/>
          <g stroke="#fff" stroke-opacity="0.07" fill="none">
            <circle cx="940" cy="380" r="120"/>
            <circle cx="940" cy="380" r="200"/>
            <circle cx="940" cy="380" r="290"/>
            <circle cx="940" cy="380" r="390"/>
            <circle cx="940" cy="380" r="500"/>
            <circle cx="940" cy="380" r="620"/>
          </g>
          <g fill="#fff" fill-opacity="0.05">
            <circle cx="920" cy="320" r="14"/>
            <circle cx="990" cy="430" r="9"/>
            <circle cx="860" cy="410" r="6"/>
            <circle cx="1020" cy="350" r="5"/>
            <circle cx="900" cy="470" r="11"/>
            <circle cx="780" cy="380" r="4"/>
          </g>
        </svg>`;
    }
    if (planet === "mars") {
      // Ondas concêntricas estilo moiré Swatch em vermelho→laranja
      return `
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="marsGrad" cx="50%" cy="50%" r="75%">
              <stop offset="0%" stop-color="#FF7A45" stop-opacity="0.18"/>
              <stop offset="60%" stop-color="#C41E1E" stop-opacity="0.10"/>
              <stop offset="100%" stop-color="#5a0606" stop-opacity="0.04"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#marsGrad)"/>
          <g stroke="#C41E1E" stroke-opacity="0.18" fill="none" stroke-width="1.2">
            ${Array.from({ length: 22 }, (_, i) => `<circle cx="600" cy="400" r="${60 + i * 38}"/>`).join("")}
          </g>
          <g stroke="#FF7A45" stroke-opacity="0.12" fill="none" stroke-width="0.8">
            ${Array.from({ length: 18 }, (_, i) => `<circle cx="600" cy="400" r="${85 + i * 42}"/>`).join("")}
          </g>
        </svg>`;
    }
    if (planet === "uranus") {
      return `
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="urGrad" cx="50%" cy="50%" r="75%">
              <stop offset="0%" stop-color="#BCE5F4" stop-opacity="0.45"/>
              <stop offset="100%" stop-color="#5B8FA8" stop-opacity="0.10"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#urGrad)"/>
          <g stroke="#5B8FA8" stroke-opacity="0.20" fill="none" stroke-width="1">
            ${Array.from({ length: 20 }, (_, i) => `<circle cx="600" cy="400" r="${70 + i * 40}"/>`).join("")}
          </g>
        </svg>`;
    }
    if (planet === "saturn") {
      return `
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="satGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#E8D4A8" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#A67C52" stop-opacity="0.10"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#satGrad)"/>
          <g stroke="#A67C52" stroke-opacity="0.18" stroke-width="1">
            ${Array.from({ length: 18 }, (_, i) => `<line x1="0" y1="${i * 50 + 30}" x2="1200" y2="${i * 50 + 30}"/>`).join("")}
          </g>
        </svg>`;
    }
    // Default (lua, super-blue, fallback): gradient suave
    if (planet === "lua") {
      const isDark = w.id === "mission-super-blue";
      const c1 = isDark ? "#1c3a6b" : "#E8E8E8";
      const c2 = isDark ? "#0a1530" : "#cfcfcf";
      return `
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="lunaGrad" cx="78%" cy="40%" r="65%">
              <stop offset="0%" stop-color="${c1}" stop-opacity="0.55"/>
              <stop offset="100%" stop-color="${c2}" stop-opacity="0.05"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#lunaGrad)"/>
          <g stroke="${isDark ? '#88aaee' : '#9d9d9d'}" stroke-opacity="0.12" fill="none">
            <circle cx="940" cy="380" r="160"/>
            <circle cx="940" cy="380" r="260"/>
            <circle cx="940" cy="380" r="370"/>
            <circle cx="940" cy="380" r="490"/>
          </g>
        </svg>`;
    }
    return "";
  }

  // ---------- GALERIA (sem sticky) ----------
  function renderGallery() {
    const el = document.getElementById("pdp-gallery");
    if (isMobile()) {
      el.innerHTML =
        `<div class="gallery-carousel">${w.images.map((img, i) =>
          `<div class="gallery-slide"><img src="${imgBase}${img}" alt="${w.name} — foto ${i + 1}"></div>`
        ).join("")}</div>` +
        `<div class="gallery-dots">${w.images.map((_, i) =>
          `<span class="gallery-dot${i === 0 ? " active" : ""}"></span>`
        ).join("")}</div>`;
    } else {
      el.innerHTML = w.images.map((img, i) =>
        `<div class="gallery-stack-item"><img src="${imgBase}${img}" alt="${w.name} — foto ${i + 1}" loading="${i === 0 ? "eager" : "lazy"}"></div>`
      ).join("");
    }
  }

  // ---------- INFO (coluna direita, sem duplicação) ----------
  function renderInfo() {
    const priceHTML = `<span class="pdp-price-now" style="font-size:15px;letter-spacing:.12em">Ver preço no Enjoei</span>`;

    const ctaHref = window.HM.enjoeiLink(w);
    const ctaText = w.limited ? "Consultar disponibilidade" : "Comprar no Enjoei";
    const ctaMicro = w.limited
      ? "Estoque limitado. Disponibilidade sujeita a confirmação."
      : "Compra protegida pelo Enjoei. 7 dias para devolver.";

    const icon = window.HMUtil ? window.HMUtil.icon : () => "";

    document.getElementById("pdp-info").innerHTML = `
      <span class="pdp-brand">Releitura HM · MoonSwatch</span>
      <h2 class="pdp-name" id="pdp-title">${w.name}</h2>
      <span class="pdp-ref">Ref. ${w.ref}</span>
      <p class="pdp-subtitle">${w.subtitle}</p>
      <div class="pdp-price">${priceHTML}</div>
      <div class="pdp-cta-area" id="pdp-cta-area">
        <a class="btn btn-dark pdp-cta-primary" href="${ctaHref}" target="_blank" rel="noopener">
          ${ctaText}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
        <p class="pdp-cta-micro">${ctaMicro}</p>
        ${!w.limited ? `<a class="pdp-cta-secondary" href="${window.HM.wa(`Tenho uma dúvida sobre o ${w.name} (${w.ref}).`)}" target="_blank" rel="noopener">Dúvidas? Fale no WhatsApp</a>` : ""}
      </div>
      <div class="pdp-trust">
        <div class="pdp-trust-item">${icon("check", 18)}<span>Fotos reais — você compra o que vê</span></div>
        <div class="pdp-trust-item">${icon("truck", 18)}<span>Envio rastreado para todo o Brasil</span></div>
        <div class="pdp-trust-item">${icon("whats", 18)}<span>Atendimento no WhatsApp · 7 dias pra devolver</span></div>
      </div>`;

    renderStickyCTA(ctaHref, ctaText);
  }

  function renderStickyCTA(href, text) {
    const bar = document.createElement("div");
    bar.className = "pdp-sticky-cta";
    bar.id = "pdp-sticky-cta";
    bar.innerHTML = `<a class="btn btn-dark pdp-sticky-btn" href="${href}" target="_blank" rel="noopener" style="width:100%">${text}</a>`;
    document.body.appendChild(bar);
  }

  // ---------- BAND TEMÁTICA (display type gigante) ----------
  function renderBand() {
    const band = document.getElementById("pdp-band");
    band.setAttribute("data-planet", w.planet);
    const tag = w.storyTag || w.planet;
    const headline = (w.storyHeadline || w.subtitle).replace(/\n/g, "<br>");
    const hook = w.storyHook || w.description;

    band.innerHTML = `
      <div class="pdp-band-pattern" aria-hidden="true">${patternSVG(w.planet)}</div>
      <div class="container-wide pdp-band-inner">
        <span class="pdp-band-tag">${tag}</span>
        <h2 class="pdp-band-headline">${headline}</h2>
        <p class="pdp-band-hook">${hook}</p>
      </div>
    `;
  }

  // ---------- EDITORIAL (split-screen narrativo) ----------
  function renderEditorial(slotId, editorial) {
    const el = document.getElementById(slotId);
    if (!el || !editorial) return;
    el.setAttribute("data-planet", w.planet);
    el.setAttribute("data-side", editorial.side || "right");
    el.innerHTML = `
      <div class="pdp-editorial-pattern" aria-hidden="true">${patternSVG(w.planet)}</div>
      <div class="pdp-editorial-inner">
        <div class="pdp-editorial-visual">
          <img src="${imgBase}${w.images[0]}" alt="${w.name}" class="pdp-editorial-img" loading="lazy">
        </div>
        <div class="pdp-editorial-copy">
          <span class="pdp-editorial-eyebrow">${editorial.eyebrow}</span>
          <h3 class="pdp-editorial-title">${editorial.title}</h3>
          <p class="pdp-editorial-body">${editorial.body}</p>
        </div>
      </div>
    `;
  }

  // ---------- SPEC DETAIL (Swatch-style: imagem + lista detalhada) ----------
  function renderSpecDetail() {
    const el = document.getElementById("pdp-spec-detail");
    if (!el) return;
    const detail = w.specDetail || [];
    if (!detail.length) { el.style.display = "none"; return; }

    el.innerHTML = `
      <div class="pdp-spec-detail-inner">
        <div class="pdp-spec-detail-visual">
          <img src="${imgBase}${w.images[0]}" alt="${w.name}" class="pdp-spec-detail-img" loading="lazy">
        </div>
        <div class="pdp-spec-detail-list">
          <h3 class="pdp-spec-detail-title">${w.name.toUpperCase()} <span class="pdp-spec-detail-ref">${w.ref}</span></h3>
          <dl class="pdp-spec-detail-dl">
            ${detail.map(d => `
              <div class="pdp-spec-row">
                <dt>${d.label}</dt>
                <dd>${d.value}</dd>
              </div>`).join("")}
          </dl>
        </div>
      </div>
    `;
  }

  // ---------- SPECS VISUAIS (4 highlights) ----------
  function renderSpecsVisual() {
    const wrap = document.getElementById("pdp-specs-visual");
    const highlights = w.specHighlights || [
      { label: "Material", value: "Biocerâmica" },
      { label: "Diâmetro", value: "42mm" },
      { label: "Movimento", value: "Quartzo" },
      { label: "Resistência", value: "3 bar" },
    ];
    wrap.innerHTML = `
      <div class="container-wide">
        <div class="specs-visual-grid">
          ${highlights.map(h => `
            <div class="spec-highlight">
              <span class="spec-highlight-value">${h.value}</span>
              <span class="spec-highlight-label">${h.label}</span>
            </div>`).join("")}
        </div>
      </div>
    `;
  }

  // ---------- MOONPHASE (Swatch-style: split-screen, data display, navegação) ----------
  function renderMoonphase() {
    if (w.id !== "mission-super-blue" || !window.HMMoon) return;
    const section = document.getElementById("moonphase-section");
    section.style.display = "";
    section.setAttribute("data-planet", w.planet);

    const today = new Date();
    let offset = 0;

    function dataFor(off) {
      const d = new Date(today);
      d.setDate(d.getDate() + off);
      const age = window.HMMoon.getMoonAge(d);
      const norm = age / window.HMMoon.SYNODIC_MONTH;
      const tx = norm <= 0.5 ? 100 - (norm * 200) : -100 + ((norm - 0.5) * 200);
      return {
        date: d, age, tx,
        phase: window.HMMoon.getPhaseName(age),
        daysFull: window.HMMoon.daysUntilFullMoon(d),
        dateStr: d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }).toUpperCase(),
      };
    }

    section.innerHTML = `
      <div class="moonphase-inner">
        <div class="moonphase-stage">
          <div class="moonphase-display">
            <span class="moonphase-date" id="mp-date"></span>
            <span class="moonphase-phase" id="mp-phase"></span>
            <span class="moonphase-fullin" id="mp-fullin"></span>
          </div>
          <div class="moonphase-visual">
            <button class="moonphase-nav prev" id="mp-prev" aria-label="Dia anterior" type="button">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="moonphase-moon" id="mp-moon">
              <div class="moon-disc">
                <span class="moon-crater" style="width:18px;height:18px;top:25%;left:55%"></span>
                <span class="moon-crater" style="width:10px;height:10px;top:60%;left:35%"></span>
                <span class="moon-crater" style="width:14px;height:14px;top:40%;left:25%"></span>
                <span class="moon-crater" style="width:8px;height:8px;top:70%;left:60%"></span>
                <span class="moon-crater" style="width:6px;height:6px;top:20%;left:40%"></span>
              </div>
              <div class="moon-shadow" id="mp-shadow"></div>
            </div>
            <button class="moonphase-nav next" id="mp-next" aria-label="Próximo dia" type="button">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <button class="moonphase-today" id="mp-today" type="button">Voltar para hoje</button>
        </div>
        <div class="moonphase-explain">
          <span class="moonphase-explain-eyebrow">Indicador das fases da lua</span>
          <h3 class="moonphase-explain-title">Um pedaço do céu,<br>calibrado no pulso.</h3>
          <p class="moonphase-explain-body">Quando a Lua completa a sua órbita em torno da Terra, apresenta uma série de formas conhecidas como fases lunares. No total, são oito fases ao longo do ciclo de 29 dias, 12 horas e 44 minutos. Relógios equipados com indicador de fase lunar representam essas fases com precisão.</p>
          <p class="moonphase-explain-note">No seu ${w.name}, o subdial é mecanicamente funcional — acompanha a lua real, dia após dia.</p>
        </div>
      </div>`;

    function update() {
      const data = dataFor(offset);
      document.getElementById("mp-date").textContent = data.dateStr;
      document.getElementById("mp-phase").textContent = data.phase;
      document.getElementById("mp-fullin").textContent = data.daysFull
        ? `${data.daysFull} ${data.daysFull === 1 ? "dia" : "dias"} até à lua cheia`
        : "Lua cheia hoje";
      document.getElementById("mp-shadow").style.transform = `translateX(${data.tx}%)`;
      const todayBtn = document.getElementById("mp-today");
      todayBtn.style.opacity = offset === 0 ? "0" : "1";
      todayBtn.style.pointerEvents = offset === 0 ? "none" : "auto";
    }

    document.getElementById("mp-prev").addEventListener("click", () => { offset--; update(); });
    document.getElementById("mp-next").addEventListener("click", () => { offset++; update(); });
    document.getElementById("mp-today").addEventListener("click", () => { offset = 0; update(); });

    update();
  }

  function renderSpecs() {
    document.getElementById("specs-details").innerHTML = `
      <h3 class="reveal">Especificações completas</h3>
      <table class="specs-table reveal">
        <tbody>${Object.entries(w.specs).map(([k, v]) =>
          `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
        </tbody>
      </table>`;

    document.getElementById("specs-faq").innerHTML = `
      <h3 class="reveal">Perguntas Frequentes</h3>
      <div class="faq-list reveal">
        ${w.faq.map(([q, a]) => `
          <div class="faq-item">
            <div class="faq-item-q">${q}</div>
            <div class="faq-item-a">${a}</div>
          </div>`).join("")}
        <a class="faq-wa-link" href="${window.HM.wa(`Tenho uma dúvida sobre o ${w.name} (${w.ref}).`)}" target="_blank" rel="noopener">Tem outra dúvida? Fale no WhatsApp →</a>
      </div>`;
  }

  function renderRelated() {
    const related = window.HM.watches.filter(x => x.id !== w.id).slice(0, 3);
    document.getElementById("related-grid").innerHTML = related.map(r => `
      <a href="produto.html?id=${r.id}" class="related-card reveal reveal-stagger" data-planet="${r.planet}">
        <div class="related-card-img">
          <img src="${r.image}" alt="${r.name}" loading="lazy">
        </div>
        <div class="related-card-body">
          <span class="related-card-name">${r.name}</span>
          <span class="related-card-price">Ver no Enjoei</span>
        </div>
      </a>`).join("");
  }

  function renderStructuredData() {
    const data = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${w.name} — Releitura HM Store`,
      "description": w.description,
      "sku": w.ref,
      "brand": { "@type": "Brand", "name": "HM Store" },
      "material": "Biocerâmica",
      "color": `${w.caseColor}/${w.dialColor}`,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "BRL",
        "availability": w.limited
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/InStock",
        "url": window.HM.enjoeiLink(w),
        "seller": { "@type": "Organization", "name": "HM Store" },
      },
    };
    document.getElementById("ld-product").textContent = JSON.stringify(data);
  }

  function bindGallery() {
    if (isMobile()) {
      const carousel = document.querySelector(".gallery-carousel");
      const dots = document.querySelectorAll(".gallery-dot");
      if (!carousel || !dots.length) return;
      carousel.addEventListener("scroll", () => {
        const idx = Math.round(carousel.scrollLeft / carousel.offsetWidth);
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      }, { passive: true });
    }
  }

  function bindStickyCTA() {
    const heroCta = document.querySelector(".pdp-hero-cta");
    const stickyBar = document.getElementById("pdp-sticky-cta");
    if (!heroCta || !stickyBar) return;

    const observer = new IntersectionObserver(([entry]) => {
      stickyBar.classList.toggle("visible", !entry.isIntersecting);
    }, { threshold: 0, rootMargin: "-64px 0px 0px 0px" });
    observer.observe(heroCta);
  }

  function bindBandParallax() {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) return;

    const band = document.getElementById("pdp-band");
    const pattern = band && band.querySelector(".pdp-band-pattern");
    if (!pattern) return;

    let target = 0, current = 0, ticking = false;
    const STRENGTH = 0.18; // sutil — 18% do delta de scroll dentro da band

    function update() {
      const rect = band.getBoundingClientRect();
      const vh = window.innerHeight;
      // ratio: 0 quando band entra na viewport, 1 quando sai
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      target = (progress - 0.5) * 80 * STRENGTH;
      if (!ticking) {
        requestAnimationFrame(render);
        ticking = true;
      }
    }

    function render() {
      current += (target - current) * 0.18;
      pattern.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      if (Math.abs(target - current) > 0.05) {
        requestAnimationFrame(render);
      } else {
        ticking = false;
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function bindHeaderProductName() {
    const el = document.querySelector(".header-product-name");
    const title = document.getElementById("pdp-title");
    if (!el || !title) return;
    el.textContent = w.name;
    const observer = new IntersectionObserver(([entry]) => {
      document.querySelector(".site-header")
        ?.classList.toggle("show-product-name", !entry.isIntersecting);
    }, { threshold: 0, rootMargin: "-64px 0px 0px 0px" });
    observer.observe(title);
  }

  function init() {
    // Sempre abrir PDP no topo (evita browser restaurar scroll histórico)
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    document.body.setAttribute("data-planet", w.planet);
    document.body.setAttribute("data-product", w.id);
    setMeta();
    renderHero();
    renderBreadcrumb();
    renderGallery();
    renderInfo();
    renderBand();
    const eds = w.editorials || [];
    renderEditorial("pdp-editorial-1", eds[0]);
    renderSpecDetail();
    renderEditorial("pdp-editorial-2", eds[1]);
    renderSpecsVisual();
    renderMoonphase();
    renderSpecs();
    renderRelated();
    renderStructuredData();
    bindGallery();
    bindStickyCTA();
    bindBandParallax();
    bindHeaderProductName();

    // Re-observar .reveal injetados acima (FAQ, related, specs).
    // Sem isso, ficam opacity:0 para sempre (app.js já passou).
    if (window.HMReveal) window.HMReveal.observe();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
