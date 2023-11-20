const head = document.querySelector("#colorHead");
const hex = document.querySelector("#setHex");
const main = document.querySelector("#colorMain");
const bod = document.querySelector("body");
const APIColor = document.querySelector("#APIColor");
const a1 = document.querySelector("#i1");
const a2 = document.querySelector("#i2");
const a3 = document.querySelector("#i3");
const state = {
  color: [],
  r: [],
  g: [],
  b: [],
};

head.style.background = "rgb(" + [255, 255, 255, 0.75].join(",") + ")";
bod.style.background = "rgb(" + [a1.value, a2.value, a3.value].join(",") + ")";
APIColor.addEventListener("click", function () {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((Response) => {
      return Response.json();
    })
    .then((dataRGB) => {
      state.r = dataRGB.rgb.r;
      state.g = dataRGB.rgb.g;
      state.b = dataRGB.rgb.b;
      state.color = dataRGB.color;
      a1.value = state.r;
      i2.value = state.g;
      i3.value = state.b;
      bod.style.background =
        "rgb(" + [state.r, state.g, state.b].join(",") + ")";
      hex.innerHTML = state.color;
    });
});

// function rgbToHex(r, g, b) {
//   r = r.toString(16);
//   g = g.toString(16);
//   b = b.toString(16);

//   if (r.length == 1) r = "0" + r;
//   if (g.length == 1) g = "0" + g;
//   if (b.length == 1) b = "0" + b;

//   hex.innerText = "#" + r + g + b;
// }
