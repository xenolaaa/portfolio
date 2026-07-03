/* ============================================================
   LA SCHAFFER — Portfolio interactions
   Vanilla JS, no dependencies. Everything degrades gracefully
   and respects prefers-reduced-motion.
   ============================================================ */
(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- YEAR ---------- */
  $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

  /* ---------- NAV: shrink + hide-on-scroll ---------- */
  const nav = $(".nav");
  if (nav) {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 40);
      if (y > last && y > 400) nav.classList.add("hidden");
      else nav.classList.remove("hidden");
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- MOBILE MENU (built from existing nav links) ---------- */
  if (nav) {
    const links = nav.querySelector(".nav__links");
    if (links) {
      const toggle = document.createElement("button");
      toggle.className = "nav__toggle";
      toggle.setAttribute("aria-label", "Open menu");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = "<span></span><span></span><span></span>";
      nav.appendChild(toggle);

      const overlay = document.createElement("nav");
      overlay.className = "nav-overlay";
      overlay.setAttribute("aria-label", "Mobile menu");
      Array.from(links.querySelectorAll("a")).forEach((a, i) => {
        const c = document.createElement("a");
        c.href = a.getAttribute("href");
        if (a.target) c.target = a.target;
        if (a.rel) c.rel = a.rel;
        c.innerHTML = '<span class="idx">0' + (i + 1) + "</span>" + a.textContent.trim();
        overlay.appendChild(c);
      });
      document.body.appendChild(overlay);

      const setOpen = (open) => {
        nav.classList.toggle("menu-open", open);
        overlay.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      };
      toggle.addEventListener("click", () => setOpen(!nav.classList.contains("menu-open")));
      overlay.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    }
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = $$(".reveal, .mask-line");
  if (revealEls.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      revealEls.forEach(el => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(el => io.observe(el));
    }
  }

  /* ---------- COUNT-UP STATS ---------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split(".")[1] || "").length;
      const dur = 1600;
      if (reduce) { el.textContent = target.toFixed(dec); return; }
      let start = null;
      const step = (t) => {
        if (!start) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(dec);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach(el => io.observe(el));
    } else counters.forEach(run);
  }

  /* ---------- HERO WORD ROTATOR ---------- */
  const rotator = $("[data-rotate]");
  if (rotator) {
    const words = JSON.parse(rotator.dataset.rotate);
    const colors = ["var(--pink)", "var(--orange)", "var(--green)", "var(--purple)"];
    let i = 0;
    rotator.textContent = words[0];
    rotator.style.color = colors[0];
    if (!reduce && words.length > 1) {
      setInterval(() => {
        rotator.style.transition = "opacity .35s, transform .35s";
        rotator.style.opacity = "0"; rotator.style.transform = "translateY(8px)";
        setTimeout(() => {
          i = (i + 1) % words.length;
          rotator.textContent = words[i];
          rotator.style.color = colors[i % colors.length];
          rotator.style.opacity = "1"; rotator.style.transform = "none";
        }, 350);
      }, 2400);
    }
  }

  /* ---------- MARQUEE: duplicate content for seamless loop ---------- */
  $$(".marquee__track").forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- MAGNETIC BUTTONS ---------- */
  if (fine && !reduce) {
    $$("[data-magnetic]").forEach(el => {
      const strength = parseFloat(el.dataset.magnetic) || 0.3;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  if (fine && !reduce) {
    const ring = document.createElement("div"); ring.className = "cursor";
    const dot = document.createElement("div"); dot.className = "cursor__dot";
    document.body.append(ring, dot);
    let rx = 0, ry = 0, mx = 0, my = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    const hoverSel = "a, button, [data-magnetic], .work-item, input, textarea";
    document.addEventListener("mouseover", (e) => { if (e.target.closest(hoverSel)) ring.classList.add("hover"); });
    document.addEventListener("mouseout", (e) => { if (e.target.closest(hoverSel)) ring.classList.remove("hover"); });
    document.addEventListener("mousedown", () => ring.classList.add("down"));
    document.addEventListener("mouseup", () => ring.classList.remove("down"));
    document.addEventListener("mouseleave", () => { ring.style.opacity = "0"; dot.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { ring.style.opacity = "1"; dot.style.opacity = "1"; });
  }

  /* ---------- CLIENT WALL: random accent color on hover ---------- */
  (() => {
    const names = $$(".work-more__logos li");
    if (!names.length) return;
    const palette = ["--pink", "--orange", "--green", "--purple"];
    names.forEach((li) => {
      li.addEventListener("mouseenter", () => {
        li.style.color = `var(${palette[Math.floor(Math.random() * palette.length)]})`;
      });
      li.addEventListener("mouseleave", () => { li.style.color = ""; });
    });
  })();

  /* ---------- SMOOTH ANCHOR SCROLL (respects reduce) ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });
})();
