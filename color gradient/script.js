var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var button = document.querySelector("button");

function setGradient(){
  body.style.background = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";
  css.textContent = body.style.background + ";"
};

function randomGradient(){
  var x1 = Math.floor(Math.random() * 256);
  var y1 = Math.floor(Math.random() * 256);
  var z1 = Math.floor(Math.random() * 256);

  var x2 = Math.floor(Math.random() * 256);
  var y2 = Math.floor(Math.random() * 256);
  var z2 = Math.floor(Math.random() * 256);

  var bgColor1 = "rgb(" + x1 + "," + y1 + "," + z1 + ")";
  var bgColor2 = "rgb(" + x2 + "," + y2 + "," + z2 + ")";

  body.style.background = "linear-gradient(to right, " + bgColor1 + ", " + bgColor2 + ")";
  css.textContent = body.style.background + ";"
}

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
button.addEventListener("click", randomGradient);