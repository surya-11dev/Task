const cube = document.querySelector(".cuboid");
const cubeSides = document.querySelectorAll(".cuboid__side")

cube.addEventListener("click", () => {
  cube.classList.toggle("clicked");
  cubeSides.forEach(cubeSide =>{
      cubeSide.classList.toggle("clicked")

  })
});
