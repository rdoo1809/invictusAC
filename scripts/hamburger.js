const hamburgBtn = document.getElementById("hamburger");
const navList = document.getElementById("nav-list");

function toggleButton() {
  navList.classList.toggle("show");
}

hamburgBtn.addEventListener("click", toggleButton);
