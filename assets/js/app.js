(function () {
  const S = window.HM.store;

  const ICONS = {
    lock: '<path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/>',
    truck: '<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
    insta: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    whats: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    chevDown: '<polyline points="6 9 12 15 18 9"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    package: '<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    creditCard: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  };

  function icon(name, size = 20) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
  }

  const isProduct = document.body.classList.contains("page-produto");
  const prefix = isProduct ? "index.html" : "";

  function buildHeader() {
    const header = document.createElement("header");
    header.className = isProduct ? "site-header solid" : "site-header transparent";
    header.innerHTML = `
      <div class="container">
        <a class="header-brand" href="${prefix || '/'}">HM STORE</a>
        <span class="header-product-name"></span>
        <nav class="header-nav">
          <a href="${prefix}#colecao">Coleção</a>
          <a href="${prefix}#historia">Sobre</a>
          <a href="${prefix}#contato">Contato</a>
          <a class="ig-link" href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
            ${icon("insta", 18)}
          </a>
        </nav>
        <button class="menu-toggle" aria-label="Menu" aria-expanded="false">
          <i></i><i></i><i></i>
        </button>
      </div>`;
    return header;
  }

  function buildMobileMenu() {
    const menu = document.createElement("div");
    menu.className = "mobile-menu";
    menu.innerHTML = `
      ${isProduct ? `<a href="index.html">← Voltar para coleção</a>` : ""}
      <a href="${prefix}#colecao">Coleção</a>
      <a href="${prefix}#historia">Sobre</a>
      <a href="${prefix}#contato">Contato</a>
      <a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener">Instagram</a>
      <a href="${window.HM.wa()}" target="_blank" rel="noopener">WhatsApp</a>`;
    return menu;
  }

  function buildFooter() {
    const watches = window.HM.watches;
    return `
      <footer class="site-footer" id="contato">
        <div class="container">
          <div class="footer-wa">
            <a class="btn btn-wa" href="${window.HM.wa()}" target="_blank" rel="noopener">
              ${icon("whats", 20)} Fale conosco no WhatsApp
            </a>
          </div>
          <div class="footer-top">
            <div class="footer-brand">
              <span class="brand-name">HM Store</span>
              <span class="tagline">${S.tagline}<br>Releituras curadas. Envio para todo o Brasil.</span>
              <div class="social">
                <a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("insta", 18)}</a>
                <a href="${window.HM.wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whats", 18)}</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Coleção</h4>
              ${watches.map(w => `<a href="produto.html?id=${w.id}">${w.name}</a>`).join("")}
            </div>
            <div class="footer-col">
              <h4>Atendimento</h4>
              <a href="${window.HM.wa()}" target="_blank" rel="noopener">WhatsApp</a>
              <a href="mailto:${S.email}">E-mail</a>
              <a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener">@${S.instagram}</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span class="footer-copy">&copy; 2026 HM Store. Todos os direitos reservados.</span>
            <span class="footer-disclaimer">Não somos afiliados à Swatch Group ou Omega.</span>
          </div>
        </div>
      </footer>`;
  }

  function buildWA() {
    const wrap = document.createElement("div");
    wrap.className = "wa-float";
    wrap.innerHTML = `
      <span class="tip">Fale com a gente</span>
      <a class="fab" href="${window.HM.wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">
        ${icon("whats", 28)}
      </a>`;
    return wrap;
  }

  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    if (isProduct) return;
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("transparent", entry.isIntersecting);
        header.classList.toggle("solid", !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(hero);
  }

  function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // stagger animation delays
    menu.querySelectorAll("a").forEach((a, i) => {
      a.style.transitionDelay = `${i * 80}ms`;
    });
  }

  // Shared reveal observer (single instance) — pdp.js injects .reveal AFTER
  // initial DOMContentLoaded, so we expose .observe() for late-injected nodes.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  window.HMReveal = {
    observe(scope) {
      const root = scope || document;
      root.querySelectorAll(".reveal:not(.visible)").forEach(el => revealObserver.observe(el));
    },
  };

  function initReveal() {
    window.HMReveal.observe();
  }

  function initWAFloat() {
    const waFloat = document.querySelector(".wa-float");
    if (!waFloat) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        waFloat.classList.toggle("visible", !entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const hero = document.querySelector(".hero");
    if (hero) observer.observe(hero);
  }

  function initLoading() {
    const overlay = document.querySelector(".loading-overlay");
    if (!overlay) return;
    window.addEventListener("load", () => {
      setTimeout(() => {
        overlay.classList.add("done");
        setTimeout(() => overlay.remove(), 700);
      }, 300);
    });
  }

  function mount() {
    const headerEl = buildHeader();
    document.body.prepend(buildMobileMenu());
    document.body.prepend(headerEl);

    const footerSlot = document.getElementById("hm-footer");
    if (footerSlot) footerSlot.innerHTML = buildFooter();

    document.body.appendChild(buildWA());

    initHeader();
    initMobileMenu();
    initReveal();
    initWAFloat();
    initLoading();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();

  window.HMUtil = { icon };
})();
