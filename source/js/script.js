var menu_button = document.querySelector(".main-nav__toogle");
var menu = document.querySelector(".site-list");

if (!menu.classList.contains("site-list--hide") || !menu.classList.contains("site-list--show")) {
  menu.classList.add("site-list--hide");
}

menu_button.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (menu.classList.contains("site-list--hide")) {
    menu.classList.remove("site-list--hide");
    menu.classList.add("site-list--show");
  } else {
    menu.classList.remove("site-list--show");
    menu.classList.add("site-list--hide");
  }
});
