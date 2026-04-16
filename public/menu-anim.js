gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ toggleActions: 'play none none none', start: 'top 85%' });

// ── Hours section ────────────────────────────────────────────

gsap.from(['.hours__label', '.hours__title'], {
  y: 30, opacity: 0, duration: 0.55, ease: 'power3.out', stagger: 0.12,
  scrollTrigger: { trigger: '.hours__schedule' },
});

gsap.from('.hours__table tr', {
  x: -30, opacity: 0, duration: 0.35, ease: 'power2.out', stagger: 0.06,
  scrollTrigger: { trigger: '.hours__table', start: 'top 88%' },
});

gsap.from('.hours__info-block', {
  y: 24, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.15,
  scrollTrigger: { trigger: '.hours__contact', start: 'top 88%' },
});

gsap.from('.hours__ig-strip', {
  opacity: 0, y: 20, duration: 0.5, ease: 'power2.out',
  scrollTrigger: { trigger: '.hours__ig-strip', start: 'top 95%' },
});

// ── About section ────────────────────────────────────────────

gsap.from('.about__visual', {
  x: -60, opacity: 0, duration: 0.7, ease: 'power3.out',
  scrollTrigger: { trigger: '.about__visual' },
});

gsap.from(['.about__label', '.about__title', '.about__body', '.about__features', '.about__cta'], {
  x: 50, opacity: 0, duration: 0.55, ease: 'power3.out', stagger: 0.1,
  scrollTrigger: { trigger: '.about__text' },
});

gsap.from('.about__feature', {
  scale: 0.8, opacity: 0, duration: 0.35, ease: 'back.out(1.6)', stagger: 0.08,
  scrollTrigger: { trigger: '.about__features', start: 'top 90%' },
});

// ── Menu section ─────────────────────────────────────────────

// Category titles — slide in from left/right alternately
document.querySelectorAll('.menu__cat-title').forEach(function (el, i) {
  gsap.from(el, {
    x: i % 2 === 0 ? -60 : 60, opacity: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: el },
  });
});

// Menu items — stagger up within each list
document.querySelectorAll('.menu__list').forEach(function (list) {
  gsap.from(list.querySelectorAll('.menu__item'), {
    y: 28, opacity: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07,
    scrollTrigger: { trigger: list, start: 'top 88%' },
  });
});

// Supplement rows — fade in
document.querySelectorAll('.menu__note-row').forEach(function (row) {
  gsap.from(row, {
    opacity: 0, y: 16, duration: 0.4, ease: 'power2.out',
    scrollTrigger: { trigger: row, start: 'top 90%' },
  });
});
