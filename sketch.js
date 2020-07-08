let pesols = [];
let buttons = [];
let click1 = -1;
let radius = 25;
let infos = [];

let xx = 0;

let initialPopulation = 4;
let genesNumber = 4;
let mutationsNumber = {
  max: 3,
  min: 1,
  number: 0
};
let generationPopulation = {
  max: 6,
  min: 3
}
let numberGenerations = {
  max: 5,
  min: 3
}
let menusActivated = false;


function setup() {
  createCanvas(600, 600);
  //població inicial
  for(var i = 0; i < initialPopulation; i++){
    let g = new Genoma();
    let p = new Pesol(g, (i+1)*(width -50)/(initialPopulation+1), radius, null, 0);
    pesols.push(p);
  }
  //fills generats
  generatePopulation();
  
  //mutacions
  generateMutations();
  
  textFont('monospace');
}

function draw() {
  background(color(232, 248, 245));
  if(menusActivated == false){
    backGround();
    topGround();
    for(var i = 0; i < pesols.length; i++){
      pesols[i].show();
    }
    for(var i = 0; i < infos.length; i++){
      infos[i].show();
    }
  }else{
    infoMenu();
  }
}

class Pesol{
  constructor(genoma, x, y, parents, generacio){
    this.generacio = generacio;
    this.genoma = genoma;
    this.mutated = false;
    this.parents = parents;
    this.x = x;
    this.y = y;
    this.stroke = false;
    this.shape = 1;
    this.c = 0;
    this.found = false;
  }
  
  show(){
    for(var i = 0; i < this.genoma.genes.length; i++){
      if(this.genoma.genes[i].a == true || this.genoma.genes[i].b == true){
        if(i == 0){this.c = color(46, 204, 113);}
        if(i == 1){this.c.setAlpha(255);}
        if(i == 4){}
      }
      if(this.genoma.genes[i].a == false && this.genoma.genes[i].b == false){
        if(i == 0){this.c = color(241, 196, 15);}
        if(i == 1){this.c.setAlpha(100);}
        if(i == 2){this.shape = 2;}
        if(i == 3){this.stroke = true;}
        if(i == 4){}
      }
    }
    push();
    if(this.parents != null){
      line(pesols[this.parents.a].x, pesols[this.parents.a].y, this.x, this.y);
      line(pesols[this.parents.b].x, pesols[this.parents.b].y, this.x, this.y);
    }
    if(this.stroke == false){noStroke();}
    if(this.found == true){
      push();
      strokeWeight(3);
      stroke(255, 0, 0, 150);
      noFill();
      circle(this.x, this.y, radius + 10);
      pop();
    }
    if(this.mutated == true){
      push();
      strokeWeight(2);
      stroke(0, 150, 0);
      noFill();
      circle(this.x, this.y, radius + 6);
      pop();
    }
    fill(this.c);
    if(this.shape == 1){circle(this.x, this.y, radius);}
    if(this.shape == 2){
      rectMode(CENTER);
      square(this.x, this.y, radius);
    }
    pop();
  }
}

class Genoma{
  constructor(parent1, parent2){
    this.genes = [];
    if(parent1 == null){
      for(var i = 0; i < genesNumber; i++){
        let g = {
          a: boolean(round(random(0,1))),
          b: boolean(round(random(0,1))),
        }
        this.genes.push(g);
      }
    }else{
      for(var i = 0; i < parent1.genes.length; i++){
        let rand = round(random(1,4));
        let g;
        if(rand == 1){
          g ={
            a : parent1.genes[i].a,
            b : parent2.genes[i].a
          }
        }
        if(rand == 2){
          g ={
            a : parent1.genes[i].a,
            b : parent2.genes[i].b
          }
        }
        if(rand == 3){
          g ={
            a : parent1.genes[i].b,
            b : parent2.genes[i].a
          }
        }
        if(rand == 4){
          g ={
            a : parent1.genes[i].b,
            b : parent2.genes[i].b
          }
        }
        this.genes.push(g);
      }
    }
  }
}

class Info{
  constructor(x, y, pesol){
    this.width = 100;
    this.height = 200;
    if(x < 2*width/3){
      this.x = x;
    }else{
      this.x = x - this.width;
    }
    if(y < 2*height/3){
      this.y = y;
    }else{
      this.y = y - this.height;
    }
    this.pesol = pesol;
  }
  show(){
    push();
    noStroke();
    fill(color(118, 215, 196));
    rect(this.x -5, this.y -5, this.width +10, this.height +10, 10);
    fill(color(209, 242, 235));
    rect(this.x, this.y, this.width, this.height, 10);
    for(var i = 0; i < pesols[this.pesol].genoma.genes.length; i++){
      let a;
      let b;
      if(pesols[this.pesol].genoma.genes[i].a == 1){
        a = "A";
      }else{
        a = "a";
      }
      if(pesols[this.pesol].genoma.genes[i].b == 1){
        b = "A";
      }else{
        b = "a";
      }
      fill(0);
      textSize(16);
      text("GEN #" + i + ":", this.x + 5, this.y + 60 + i*30);
      textSize(20);
      text(a + b, this.x + this.width - 30, this.y + 60 + i*30);
    }
    fill(0);
    textAlign(CENTER);
    textSize(24);
    text("INFO", this.x + this.width/2, this.y + 30);
    pop();
  }
}

function generatePopulation(){
  let generacions = round(random(numberGenerations.min, numberGenerations.max));
  for(var k = 1; k < generacions; k++){
    let poblacioGeneracio = round(random(generationPopulation.min, generationPopulation.max));
    for(var i = 0; i < poblacioGeneracio; i++){
      let x = (i+1)*(width -50)/(poblacioGeneracio+1);
      let y = k*(height-50)/generacions;
      let posibleParents = [];
      for(var l = 0; l < pesols.length; l++){
        if(k - pesols[l].generacio == 1){
          posibleParents.push(l);
        }
      }
      let a = 0;
      let b = 0;
      while(a == b){
        a = round(random(0, (posibleParents.length-1)));
        b = round(random(0, (posibleParents.length-1)));
      }
      let parents = {
          a: posibleParents[a],
          b: posibleParents[b]
      }
      let g = new Genoma(pesols[parents.a].genoma, pesols[parents.b].genoma);
      let p = new Pesol(g, x, y, parents, k);
      pesols.push(p);
    }
  }
}

function generateMutations(){
  mutationsNumber.number = round(random(mutationsNumber.min, mutationsNumber.max));
  for(var i = 0; i < mutationsNumber.number; i++){
    let rand = round(random(initialPopulation -1, pesols.length -1));
    let found = false;
    for(var k = 0; k < genesNumber; k++){
      if(pesols[rand].parents != null){
        if(pesols[pesols[rand].parents.a].genoma.genes[k].a == pesols[pesols[rand].parents.a].genoma.genes[k].b && pesols[pesols[rand].parents.b].genoma.genes[k].a == pesols[pesols[rand].parents.b].genoma.genes[k].b){
          if(round(random(0, 1)) == 1){
            pesols[rand].genoma.genes[k].a = !pesols[rand].genoma.genes[k].a;
          }else{
            pesols[rand].genoma.genes[k].b = !pesols[rand].genoma.genes[k].b;
          }
          found = true;
          pesols[rand].mutated = true;
          break;
        }
      }
    }
    if(found == false){i--}
  }
}

function topGround(){
  push();
  for(var i = 0; i < 6; i++){
    noStroke();
    fill(color(118, 215, 196));
    rect(width - 255 + 30*i, height - 55, 110, 210, 10);
    fill(color(209, 242, 235));
    rect(width - 250 + 30*i, height - 50, 100, 200, 10);
  }
  fill(118, 215, 196);
  circle(560, 510, 60);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("INFO", width - 200 + 30*5, height - 20);
  text("✓", 560, 510);
  pop();
}

function backGround(){
  push();
  xx+= deltaTime/1000;
  noStroke();
  for(var x = 0; x < 250; x+= 6){ 
    let y = 40*sin(xx +x) + x + 400;
    let yy = -40*sin(xx +x) + x + 400;
    fill(color(115, 198, 182));
    circle(x, y, 10);
    fill(color(17, 122, 101));
    circle(x, yy, 10);
  }
  fill(0);
  textSize(14);
  text("Joan Font Perelló 2020", 10, height - 10);
  pop();
}

function infoMenu(){
  push();
  scale(2.4);
  rectMode(CENTER);
  noStroke();
  fill(color(118, 215, 196));
  rect(width/4.8, height/4.8, 110, 210, 10);
  fill(color(209, 242, 235));
  rect(width/4.8, height/4.8, 104, 204, 10);
  fill(0);
  textAlign(CENTER);
  textSize(24);
  text("INFO", width/4.8, 62);
  for(var i = 0; i < pesols[0].genoma.genes.length; i++){
    fill(0);
    textSize(10);
    text("GEN #" + i + ":", width/4.8 - 30, 90 + i*30);
    textSize(5);
    text("Dominant:", width/4.8 - 36, 97 + i*30);
    text("Recessiu:", width/4.8 - 36, 105 + i*30);
  }
  
  textSize(10);
  textAlign(LEFT);
  if(pesols[0].genoma.genes.length > 0){text("Color", width/4.8, 90);}
  if(pesols[0].genoma.genes.length > 1){text("Foscor", width/4.8, 120);}
  if(pesols[0].genoma.genes.length > 2){text("Forma", width/4.8, 150);}
  if(pesols[0].genoma.genes.length > 3){text("Traç", width/4.8, 180);}
  
  push();
  if(pesols[0].genoma.genes.length > 0){
    fill(color(46, 204, 113));
    circle(width/4.8 -10, 95, 7);
    fill(color(241, 196, 15));
    circle(width/4.8 -10, 103, 7);
  }
  if(pesols[0].genoma.genes.length > 1){
  fill(color(46, 204, 113));
  circle(width/4.8 -10, 125, 7);
  fill(color(46, 204, 113, 100));
  circle(width/4.8 -10, 133, 7);
  }
  if(pesols[0].genoma.genes.length > 2){
  fill(color(46, 204, 113));
  circle(width/4.8 -10, 155, 7);
  square(width/4.8 -10, 163, 7);
  }
  if(pesols[0].genoma.genes.length > 3){
  circle(width/4.8 -10, 185, 7);
  stroke(0);
  strokeWeight(0.5);
  circle(width/4.8 -10, 193, 7);
  }
  pop();
  pop();
}
/*function mouseDragged(){
  for(var i = 0; i < pesols.length; i++){
    if(dist(mouseX, mouseY, pesols[i].x, pesols[i].y) <= radius/2 + 5){
      pesols[i].x = mouseX;
      pesols[i].y = mouseY;
      break;
    }
  }
  return false;
}*/

function mouseClicked(){
  if(menusActivated == true){
    menusActivated = false;
  }
  if(menusActivated == false && height - mouseY <= 55 && width - mouseX <= 255){
    menusActivated = true;
  }
  if(infos.length != 0){
      infos.length = 0;
  }
  for(var i = 0; i < pesols.length; i++){
    if(dist(mouseX, mouseY, pesols[i].x, pesols[i].y) <= radius/2 + 2 && infos.length == 0){
      let k = new Info(mouseX, mouseY, i);
      infos.push(k);
    }
  }
  if(dist(mouseX, mouseY, 560, 510) < 30){
    check();
  }
}

function doubleClicked(){
  for(var i = 0; i < pesols.length; i++){
    if(dist(mouseX, mouseY, pesols[i].x, pesols[i].y) <= radius/2){
      pesols[i].found = !pesols[i].found;
    }
  }
  return false;
}

function check(){
  noLoop();
  let correct = true;
  for(var i = 0; i < pesols.length; i++){
    if(pesols[i].found != pesols[i].mutated){
      correct = false;
      lost();
    }
  }
  if(correct == true){won();}
}

function lost(){
  push();
  textSize(400);
  textAlign(CENTER, CENTER);
  fill(color(255, 0, 0));
  text("X", width/2, height/2);
  pop();
}

function won(){
  push();
  textSize(400);
  textAlign(CENTER, CENTER);
  fill(color(0, 255, 0));
  text("✓", width/2, height/2);
  pop();
}


