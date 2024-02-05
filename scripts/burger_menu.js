const burger = document.querySelector(".burger");
const navMenu = document.querySelector(".nav-menu");
const links = document.querySelectorAll(".nav-menu-link");
const body = document.querySelector("body");

const x = window.matchMedia("(max-width: 768px)");


function generalToggle() {
  burger.classList.toggle("active");
  navMenu.classList.toggle("active");
  body.classList.toggle("lock");
}

burger.addEventListener("click", () => generalToggle());

window.addEventListener("resize", () => {
  if (!x.matches && burger.classList.contains("active")) {
    generalToggle();
  }
});

links.forEach((link) => {
  link.addEventListener("click", function(event) {
    if (x.matches) {
      event.preventDefault();
      generalToggle();
      setTimeout(() => {
        window.location = this.href;
      }, 1000);
    }
  });
});

