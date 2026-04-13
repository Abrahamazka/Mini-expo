const navItems = document.querySelectorAll(".nav-item");
const highlight = document.getElementById("highlight");
const navMenu = document.getElementById("navMenu");
const navWrapper = document.getElementById("navWrapper");

let activeIndex = 0;
let lastScrollY = window.scrollY;

function moveHighlight(index) {
  const item = navItems[index];
  if (!item || !highlight) return;

  highlight.style.left = item.offsetLeft + "px";
  highlight.style.width = item.offsetWidth + "px";
  highlight.style.height = item.offsetHeight + "px";
}

navItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    moveHighlight(index);
  });

  item.addEventListener("click", (e) => {
    e.preventDefault();
    activeIndex = index;
    moveHighlight(activeIndex);
  });
});

if (navMenu) {
  navMenu.addEventListener("mouseleave", () => {
    moveHighlight(activeIndex);
  });
}

window.addEventListener("load", () => moveHighlight(activeIndex));
window.addEventListener("resize", () => moveHighlight(activeIndex));

window.addEventListener("scroll", () => {
  if (!navWrapper) return;

  const currentScrollY = window.scrollY;

  if (currentScrollY <= 10) {
    navWrapper.classList.remove("-translate-y-32");
    navWrapper.classList.add("translate-y-0");
  } else if (currentScrollY > lastScrollY) {
    navWrapper.classList.remove("translate-y-0");
    navWrapper.classList.add("-translate-y-32");
  } else {
    navWrapper.classList.remove("-translate-y-32");
    navWrapper.classList.add("translate-y-0");
  }

  lastScrollY = currentScrollY;
});

const marquee = document.getElementById("marquee");

if (marquee) {
  let offset = 0;
  const speed = 0.8;

  function animateMarquee() {
    const firstTrack = marquee.querySelector(".marquee-track");
    if (!firstTrack) return;

    offset -= speed;

    const trackWidth = firstTrack.offsetWidth;

    if (Math.abs(offset) >= trackWidth) {
      offset = 0;
    }

    marquee.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
}