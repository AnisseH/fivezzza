var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl
  .from('.hero__ring',      { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.4)' })
  .from('.hero__ring-text', { opacity: 0, duration: 0.5 }, '-=0.2')
  .from('.hero__eyebrow',   { y: 24, opacity: 0, duration: 0.45 }, '-=0.15')
  .from('.hero__title',     { y: 48, opacity: 0, duration: 0.55 }, '-=0.15')
  .from('.hero__tagline',   { y: 24, opacity: 0, duration: 0.45 }, '-=0.1')
  .from('.hero__ctas',      { y: 24, opacity: 0, duration: 0.45 }, '-=0.1')
  .add(function () {
    gsap.to('.hero__ring-text', {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
    });

    // Heartbeat: lub-dub double-beat, pause, repeat
    var beat = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    beat
      .to('.hero__ring-img', { scale: 1.10, duration: 0.12, ease: 'power1.out' })
      .to('.hero__ring-img', { scale: 1.00, duration: 0.18, ease: 'power1.in' })
      .to('.hero__ring-img', { scale: 1.07, duration: 0.10, ease: 'power1.out' })
      .to('.hero__ring-img', { scale: 1.00, duration: 0.22, ease: 'power1.in' });
  });
