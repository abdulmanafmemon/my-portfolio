/* =========================================================
   ABDUL MANAF — PORTFOLIO SCRIPT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const burger = document.querySelector('.burger');
  const mainNav = document.querySelector('.main-nav');
  if (burger && mainNav) {
    burger.addEventListener('click', () => {
      const opening = !mainNav.classList.contains('open');
      burger.classList.toggle('active', opening);
      mainNav.classList.toggle('open', opening);
      document.body.classList.toggle('nav-open', opening);
    });
  }

  /* ---------- Dropdown (hover on desktop via CSS, tap-toggle on mobile) ---------- */
  document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        const parent = toggle.closest('.has-dropdown');
        document.querySelectorAll('.has-dropdown').forEach(el => {
          if (el !== parent) el.classList.remove('open');
        });
        parent.classList.toggle('open');
      }
    });
  });

  /* close mobile nav when a normal link is clicked */
  document.querySelectorAll('.main-nav a:not(.dropdown-toggle)').forEach(a => {
    a.addEventListener('click', () => {
      mainNav && mainNav.classList.remove('open');
      burger && burger.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });

  /* ---------- Active nav link highlight by current page/hash ---------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentHash = window.location.hash || '#home';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const [hrefPathRaw, hrefHashRaw] = href.split('#');
    const hrefPath = hrefPathRaw || currentPath;
    const hrefHash = hrefHashRaw ? '#' + hrefHashRaw : '';
    const samePage = hrefPath.endsWith(currentPath);
    const sameHash = hrefHash === currentHash;
    link.classList.toggle('active', samePage && sameHash);
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* stagger index for children */
  document.querySelectorAll('.stagger').forEach(group => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i));
  });

  /* ---------- Header shrink + scroll progress + to-top ---------- */
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const toTop = document.querySelector('.to-top');
  let scrollTicking = false;
  function onScrollFrame() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (header) header.style.boxShadow = scrollTop > 30 ? '0 10px 30px -14px rgba(0,0,0,.55)' : 'none';
    if (toTop) toTop.classList.toggle('show', scrollTop > 500);
    scrollTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(onScrollFrame);
      scrollTicking = true;
    }
  }, { passive: true });
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Tabs (services / solutions / saas overview on index) ---------- */
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const targetSel = tabGroup.dataset.target;
    const panels = document.querySelectorAll(targetSel + ' .tab-panel');
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => p.classList.remove('active'));
        document.querySelector(targetSel + ' #' + btn.dataset.tab).classList.add('active');
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Animated counters (stargates / hero stats) ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 }) : null;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target + suffix; return; }
      el.textContent = cur + suffix;
      requestAnimationFrame(tick);
    };
    tick();
  }
  counters.forEach(el => counterObserver ? counterObserver.observe(el) : animateCount(el));

  /* ---------- Interactive consent switch (portfolio section) ---------- */
  document.querySelectorAll('.switch').forEach(sw => {
    sw.addEventListener('click', () => sw.classList.toggle('on'));
  });

  /* ---------- Contact forms (no backend — front-end only confirmation) ---------- */
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('.form-msg');
      const nameField = form.querySelector('input[type="text"]');
      const name = nameField ? nameField.value.trim() : '';
      if (msg) {
        msg.textContent = (name ? 'Thanks, ' + name + '! ' : 'Thanks! ') + 'Your message has been received. Abdul Manaf will get back to you soon.';
        msg.classList.add('show', 'ok');
      }
      form.reset();
      setTimeout(() => { if (msg) msg.classList.remove('show'); }, 6000);
    });
  });

  /* ---------- Simple typing role text on hero ---------- */
  const roleEl = document.querySelector('[data-typing]');
  if (roleEl) {
    const roles = JSON.parse(roleEl.dataset.typing);
    let ri = 0, ci = 0, deleting = false;
    const typeSpan = roleEl.querySelector('.type-text');
    function loopType() {
      const word = roles[ri];
      if (!deleting) {
        ci++;
        typeSpan.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(loopType, 1400); return; }
      } else {
        ci--;
        typeSpan.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(loopType, deleting ? 45 : 85);
    }
    loopType();
  }

});
