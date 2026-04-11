function drift(el) {
  gsap.to(el, {
    x: gsap.utils.random(-200, 200),
    y: gsap.utils.random(-150, 150),
    duration: gsap.utils.random(2, 4),
    ease: 'none',
    onComplete: function () { drift(el); },
  });
}

document.querySelectorAll('.menu__deco, .about__deco').forEach(function (el) {
  drift(el);
});
