// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let dcgan;
let button;
let cnv;
let clicks = 0;

const imageNumber = 7;
const firstAndLastOffset = 100;
const startOffset = 0;
const offset = 400;

const imageGenerationDelay = 100;

function preload() {
  dcgan = ml5.DCGAN("model/fullData/manifest.json");
}

function setup() {
  
  cnv = createCanvas(2400, 3508);
  background(255);
  smooth();



  // Reduce size of preview
  let scalePreview = 0.25;
  cnv = document.getElementById("defaultCanvas0");
  cnv.style.width = round(width * scalePreview) + "px";
  cnv.style.height = round(height * scalePreview) + "px";

  
  button = createButton("Génère ton image ma race");
  button.mousePressed(GANGeneration);
// Button to generate an image
}

function draw() {
  
  textSize(40);
  textStyle(ITALIC);
  textFont("Times");
  textAlign(LEFT);

  text("À la Recherche", 60, width + 40);

  textAlign(CENTER);
  textStyle(NORMAL);
  text("Génération", width / 2, width + 40);

  textAlign(RIGHT);
  textStyle(NORMAL);
  stroke(255);
  strokeWeight(20)
  text(clicks, width - 60, width + 40);
  noStroke();
}

function keyPressed() {
  if (keyCode === 83) {
    // Saves the canvas as an image
    save(clicks+"_Generations_ÀlaRecherche.jpg");
  }
}

function GANGeneration() {
  button.attribute('disabled', '');
  setTimeout(() => {
    Array.from(Array(imageNumber).keys()).forEach(index => {
      setTimeout(() => {
      dcgan.generate(displayImageGeneric(index));
      }, index * imageGenerationDelay);
    });
    button.removeAttribute('disabled');
  }, 50);
}

function displayImageGeneric(index) {
  return function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    clicks++;
    imageMode(CENTER);
    let size = width - offset * index + startOffset;
    if (index === 0 || index === imageNumber - 1)
      size -= firstAndLastOffset;
    image(result.image, width / 2, width / 2, size, size);
  }
}