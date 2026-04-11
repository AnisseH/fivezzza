// Set everything invisible before animating in
gsap.set('.hero__ring',      { scale: 0, opacity: 0 });
gsap.set('.hero__ring-text', { opacity: 0 });
gsap.set('.hero__corner',    { scale: 0, opacity: 0 });
gsap.set('.hero__eyebrow',   { y: 24, opacity: 0 });
gsap.set('.hero__title',     { y: 48, opacity: 0 });
gsap.set('.hero__tagline',   { y: 24, opacity: 0 });
gsap.set('.hero__ctas',      { y: 24, opacity: 0 });

var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl
  // Logo ring scales in with a slight bounce
  .to('.hero__ring',      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' })
  // Text ring fades in right after the ring appears
  .to('.hero__ring-text', { opacity: 1, duration: 0.5 }, '-=0.2')
  // Corner checker squares fade in staggered
  .to('.hero__corner',    { scale: 1, opacity: 0.28, duration: 0.5, stagger: 0.08 }, '-=0.3')
  // Text slides up in sequence
  .to('.hero__eyebrow',   { y: 0, opacity: 1, duration: 0.45 }, '-=0.15')
  .to('.hero__title',     { y: 0, opacity: 1, duration: 0.55 }, '-=0.15')
  .to('.hero__tagline',   { y: 0, opacity: 1, duration: 0.45 }, '-=0.1')
  .to('.hero__ctas',      { y: 0, opacity: 1, duration: 0.45 }, '-=0.1')
  // Once everything is visible, start the slow text ring rotation
  .add(function () {
    gsap.to('.hero__ring-text', {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });

    // Heartbeat: lub-dub double-beat, pause, repeat
    var beat = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    beat
      .to('.hero__ring-img', { scale: 1.10, duration: 0.12, ease: 'power1.out', transformOrigin: '50% 50%' })
      .to('.hero__ring-img', { scale: 1.00, duration: 0.18, ease: 'power1.in' })
      .to('.hero__ring-img', { scale: 1.07, duration: 0.10, ease: 'power1.out' })
      .to('.hero__ring-img', { scale: 1.00, duration: 0.22, ease: 'power1.in' });
  });
