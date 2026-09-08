/* ==========================================================================
   PERSONAL PORTFOLIO WEBSITE — SCRIPT
   Handles: sticky header, mobile menu, smooth scroll, active nav,
   filters (activities/projects), modals, form validation,
   scroll reveal, GPA/skill bar animation, back-to-top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. STICKY HEADER SHADOW ---------- */
  const siteHeader = document.getElementById('siteHeader');
  function handleHeaderShadow() {
    if (window.scrollY > 8) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderShadow, { passive: true });
  handleHeaderShadow();

  /* ---------- 2. MOBILE MENU (HAMBURGER) ---------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    menuBackdrop.classList.add('open');
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    menuBackdrop.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburgerBtn.addEventListener('click', function () {
    if (mobileMenu.classList.contains('open')) closeMobileMenu();
    else openMobileMenu();
  });
  menuBackdrop.addEventListener('click', closeMobileMenu);
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- 3. SMOOTH SCROLL (native CSS scroll-behavior handles most;
     this ensures mobile menu closes and offsets correctly for all anchors) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- 4. ACTIVE NAVIGATION ON SCROLL ---------- */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function setActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 140;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
    mobileLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ---------- 5. LANGUAGE SWITCH (UI mock only) ---------- */
  document.querySelectorAll('.lang-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.lang-switch button').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      /* Full translation system not implemented; this is a UI placeholder
         as noted in the project brief. */
    });
  });

  /* ---------- 6. FILTER: UNIVERSITY ACTIVITIES ---------- */
  const activityFilter = document.getElementById('activityFilter');
  const activityCards = document.querySelectorAll('#activityGrid .activity-card');
  if (activityFilter) {
    activityFilter.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      activityFilter.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      activityCards.forEach(function (card) {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  /* ---------- 7. FILTER: PROJECTS ---------- */
  const projectFilter = document.getElementById('projectFilter');
  const projectCards = document.querySelectorAll('#projectGrid .project-card');
  if (projectFilter) {
    projectFilter.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      projectFilter.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(function (card) {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  /* ---------- 8. CERTIFICATE MODAL ---------- */
  const certModal = document.getElementById('certModal');
  const certModalClose = document.getElementById('certModalClose');
  document.querySelectorAll('.cert-card').forEach(function (card) {
    card.addEventListener('click', function () {
      document.getElementById('certModalName').textContent = card.dataset.name;
      document.getElementById('certModalOrg').textContent = card.dataset.org;
      document.getElementById('certModalDate').textContent = card.dataset.date;
      document.getElementById('certModalType').textContent = card.dataset.type;
      certModal.classList.add('open');
    });
  });
  certModalClose.addEventListener('click', function () { certModal.classList.remove('open'); });
  certModal.addEventListener('click', function (e) {
    if (e.target === certModal) certModal.classList.remove('open');
  });

  /* ---------- 9. PROJECT DETAIL MODAL ---------- */
  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');
  document.querySelectorAll('.project-detail-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = btn.closest('.project-card');
      document.getElementById('projectModalName').textContent = card.dataset.name;
      document.getElementById('projectModalDesc').textContent = card.dataset.desc;
      document.getElementById('projectModalTech').textContent = card.dataset.tech;
      document.getElementById('projectModalRole').textContent = card.dataset.role;
      document.getElementById('projectModalDate').textContent = card.dataset.date;
      projectModal.classList.add('open');
    });
  });
  projectModalClose.addEventListener('click', function () { projectModal.classList.remove('open'); });
  projectModal.addEventListener('click', function (e) {
    if (e.target === projectModal) projectModal.classList.remove('open');
  });

  /* Close modals with Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      certModal.classList.remove('open');
      projectModal.classList.remove('open');
    }
  });

  /* ---------- 10. CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function setError(groupId, hasError) {
    const group = document.getElementById(groupId);
    group.classList.toggle('error', hasError);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formSuccess.classList.remove('show');

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    let valid = true;

    if (name.length === 0) { setError('group-name', true); valid = false; }
    else { setError('group-name', false); }

    if (!isValidEmail(email)) { setError('group-email', true); valid = false; }
    else { setError('group-email', false); }

    if (subject.length === 0) { setError('group-subject', true); valid = false; }
    else { setError('group-subject', false); }

    if (message.length < 10) { setError('group-message', true); valid = false; }
    else { setError('group-message', false); }

    if (valid) {
      /* No backend connected — front-end only, per project brief. */
      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(function () {
        formSuccess.classList.remove('show');
      }, 5000);
    }
  });

  /* ---------- 11. SCROLL REVEAL ANIMATION ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- 12. SKILL BAR ANIMATION ---------- */
  const skillRows = document.querySelectorAll('.skill-row');
  const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const row = entry.target;
        const level = row.dataset.level || 0;
        const fill = row.querySelector('.skill-bar-fill');
        if (fill) fill.style.width = level + '%';
        skillObserver.unobserve(row);
      }
    });
  }, { threshold: 0.3 });
  skillRows.forEach(function (row) { skillObserver.observe(row); });

  /* ---------- 13. GPA CHART BAR ANIMATION ---------- */
  const gpaBars = document.querySelectorAll('.gpa-bar');
  const gpaObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const h = bar.dataset.height || 0;
        bar.style.height = h + '%';
        gpaObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  gpaBars.forEach(function (bar) { gpaObserver.observe(bar); });

  /* ---------- 14. BACK TO TOP BUTTON ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('show', window.scrollY > 480);
  }, { passive: true });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
