let id;

let detections = [];
let pesols = [];
let buttons = [];
let click1 = -1;
let radius = 25;
let infos = [];

let puntuation;

let difficulty = 3;
let help = 2;

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
let menusActivated = {
  any: false,
  info: false,
  end: false,
  start: true,
  help: false,
  error: false
  
};


function setup() {
  createCanvas(600, 600);
  textFont('monospace');
}

function draw() {
  background(color(232, 248, 245));
  if(menusActivated.info == true || menusActivated.start == true || menusActivated.end == true || menusActivated.error == true || menusActivated.help == true){
    menusActivated.any = true;
  }else{
    menusActivated.any = false;
  }
  if(menusActivated.any == false){
    backGround();
    topGround();
    for(var i = 0; i < pesols.length; i++){
      pesols[i].show();
    }
    for(var i = 0; i < infos.length; i++){
      infos[i].show();
    }
    for(var i = 0; i < detections.length; i++){
      detections[i].show();
    }
  }else{
    if(menusActivated.info == true){
      infoMenu();
    }
    if(menusActivated.end == true){
      endMenu();
    }
    if(menusActivated.start == true){
      startMenu();
    }
    if(menusActivated.help == true){
      helpMenu();
    }
    if(menusActivated.error == true){
      errorMenu();
    }
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
    /*if(this.mutated == true){
      push();
      strokeWeight(2);
      stroke(0, 150, 0);
      noFill();
      circle(this.x, this.y, radius + 6);
      pop();
    }*/
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
  if(mutationsNumber.min == mutationsNumber.max){mutationsNumber.number = mutationsNumber.max}
  let nothing = 0;
  let i = 0;
  console.log(mutationsNumber);
  while(i < mutationsNumber.number){
    let rand = round(random(initialPopulation -1, pesols.length -1));
    console.log(rand);
    let found = false;
    for(var k = 0; k < genesNumber; k++){
      if(pesols[rand].parents != null){
        if(pesols[pesols[rand].parents.a].genoma.genes[k].a == pesols[pesols[rand].parents.a].genoma.genes[k].b && pesols[pesols[rand].parents.b].genoma.genes[k].a == pesols[pesols[rand].parents.b].genoma.genes[k].b && pesols[rand].mutated == false){
          if(round(random(0, 1)) == 1){
            pesols[rand].genoma.genes[k].a = !pesols[rand].genoma.genes[k].a;
          }else{
            pesols[rand].genoma.genes[k].b = !pesols[rand].genoma.genes[k].b;
          }
          found = true;
          nothing = 0;
          pesols[rand].mutated = true;
          i++
          break;
        }
      }
    }
    if(found == false){nothing++}
    if(nothing == 60){generator();}
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
  circle(560, 430, 60);
  circle(560, 350, 60);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("INFO", width - 200 + 30*5, height - 20);
  text("✓", 560, 510);
  text("⟳", 560, 350);
  text("?", 560, 430);
  pop();
}

function backGround(){
  push();
  xx+= deltaTime/1000;
  noStroke();
  for(var x = 0; x < 250; x+= 6){ 
    let y = 45*sin(xx +x) + x + 400;
    let yy = -45*sin(xx +x) + x + 400;
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

function mouseClicked(){
  if(menusActivated.info == true){
    menusActivated.info = false;
  }
  if(menusActivated.help == true){
    menusActivated.help = false;
  }
  if(menusActivated.error == true){
    menusActivated.error = false;
  }
  if(menusActivated.end == true){
    if(dist(mouseX, mouseY, width - 30, height - 30) <= 50){
      saveCanvas('mendelResultats', 'png');
    }else{
      menusActivated.end = false;
      menusActivated.start = true;
    }
  }
  if(menusActivated.start == true && height - mouseY <= 55 && width - mouseX <= 255){
    generator();
    menusActivated.start = false;
  }
  if(menusActivated.any == false){
    if(menusActivated.info == false && height - mouseY <= 55 && width - mouseX <= 255){
      if(help <= 4){
        menusActivated.info = true;
      }else{
        menusActivated.error = true;
      }
    }
    if(infos.length != 0){
        infos.length = 0;
    }
    if(help <= 2){
      for(var i = 0; i < pesols.length; i++){
        if(dist(mouseX, mouseY, pesols[i].x, pesols[i].y) <= radius/2 + 2 && infos.length == 0){
          let k = new Info(mouseX, mouseY, i);
          infos.push(k);
        }
      }
    }
  
    if(dist(mouseX, mouseY, 560, 510) < 30){
    check();
    }
    if(dist(mouseX, mouseY, 560, 430) < 30){
    menusActivated.help = true;
    }
    if(dist(mouseX, mouseY, 560, 350) < 30){
    menusActivated.start = true;
    }
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
  id = makeid(10);
  puntuation = map(difficulty, 1, 5, 0, 10) + map(help, 1, 5, 0, 10);
  let correct = true;
  for(var i = 0; i < pesols.length; i++){
    if(pesols[i].found != pesols[i].mutated){
      correct = false;
      puntuation = map(puntuation, 0, 35, -3, 11);
      menusActivated.end = true;
      break;
    }
  }
  if(correct == true){
    puntuation += 15;
    puntuation = map(puntuation, 0, 35, -3, 11);
    menusActivated.end = true;
  }
}

function endMenu(){
  push();
  textSize(60);
  textAlign(CENTER, CENTER);
  fill(0);
  text("RESULTATS", width/2, height/7);
  textSize(12);
  textAlign(RIGHT, CENTER);
  text("Expedient: " + id, width - 20, 20);
  textSize(30);
  text("DIFICULTAT:", width/2 - 5, 2*height/7);
  text("AJUDES:", width/2 - 5, 2.5*height/7);
  textAlign(LEFT, CENTER);
  textSize(12);
  text(day() +"/" + month()+"/" + year(), 20, 20);
  textSize(14);
  text("Joan Font Perelló 2020", 10, height - 10);
  textSize(20);
  var difficultyText;
  if(difficulty == 1){difficultyText = "Molt Baixa"}
  if(difficulty == 2){difficultyText = "Baixa"}
  if(difficulty == 3){difficultyText = "Mitjana"}
  if(difficulty == 4){difficultyText = "Alta"}
  if(difficulty == 5){difficultyText = "Molt Alta"}
  var helpText;
  if(help == 1){helpText = "Totes"}
  if(help == 2){helpText = "Significatives"}
  if(help == 3){helpText = "Significatives"}
  if(help == 4){helpText = "Insignificants"}
  if(help == 5){helpText = "Cap"}
  if(difficulty == 5 && help == 5 && puntuation == 5){puntuation = 4.9}
  text(difficultyText, width/2 + 5, 2*height/7);
  text(helpText, width/2 + 5, 2.5*height/7);
  fill(0,0);
  beginShape(QUAD_STRIP);
  vertex(width/6, height/2 + 20);
  vertex(width/6, height/2 - 10);
  vertex(width/3, height/2 + 20);
  vertex(width/3, height/2 - 10);
  vertex(width/2, height/2 + 20);
  vertex(width/2, height/2 - 10);
  vertex(2*width/3, height/2 + 20);
  vertex(2*width/3, height/2 - 10);
  vertex(5*width/6, height/2 + 20);
  vertex(5*width/6, height/2 - 10);
  endShape();
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(nfc(puntuation, 2), 3*width/12, height/2 + 5);
  text(nfc(map(puntuation, 0, 10, 0, 4), 2), 5*width/12, height/2 + 5);
  var USA;
  if(puntuation >= 10){USA = "A"}
  if(puntuation < 10){USA = "A-"}
  if(puntuation < 9.5){USA = "B+"}
  if(puntuation < 9){USA = "B"}
  if(puntuation < 8.5){USA = "B-"}
  if(puntuation < 8){USA = "C+"}
  if(puntuation < 7.5){USA = "C"}
  if(puntuation < 7){USA = "C-"}
  if(puntuation < 6.5){USA = "D+"}
  if(puntuation < 6){USA = "D"}
  if(puntuation < 5.5){USA = "D-"}
  if(puntuation < 5){USA = "F"}
  if(puntuation < 0){USA = "Z"}
  text(USA, 7*width/12, height/2 + 5);
  text(nfc(map(puntuation, 0, 10, 0, 13), 2), 9*width/12, height/2 + 5);
  text("ESP", 3*width/12, height/2 - 30);
  text("GER", 5*width/12, height/2 - 30);
  text("USA", 7*width/12, height/2 - 30);
  text("SWE", 9*width/12, height/2 - 30);
  text("Aquest joc certifica que el posseïdor del diploma", width/2, 2*height/3);
  var greeting;
  if(puntuation > 10){greeting = "ha hackejat o fet trampes d'alguna manera \nper superar aquesta prova."}
  if(puntuation <= 10){greeting = "hagués pogut desbancar a Mendel si hagués \nnascut un poc abans."}
  if(puntuation < 8){greeting = "té un gran domini en l'àmbit de la genètica."}
  if(puntuation < 6){greeting = "entén les lleis de Mendel, demostrant \nmolt de potencial."}
  if(puntuation <= 5){greeting = "ha de repassar un poc."}
  if(puntuation == 0){greeting = "s'hauria de mirar el tema abans de tornar \na jugar."}
  if(puntuation < 0){greeting = "no te remei."}
  textAlign(CENTER, TOP);
  text(greeting, width/2, 2*height/3 + 20);
  fill(23, 165, 137);
  circle(width - 30, height - 30, 100);
  fill(232, 248, 245);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("DNA\nCertified", width - 35, height - 35);
  pop();
}

function helpMenu(){
  push();
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(40);
  text("Has demanat ajuda?", width/2, 1*height/7);
  textSize(16);
  textStyle(ITALIC);
  text("En aquest joc hauràs de trobar els individus mutats aplicant\nels teus coneixements respecte la genètica mendeliana.", width/2, 2.5*height/7);
  textStyle(NORMAL);
  text("Si tens l'opció sel·leccionada, fes clic sobre els pesols per \nconeixer la informació genètica exacta de cada individu.\n\nLa llegenda es desplega pitjant sobre les targetes de la part\ninferior dreta.\n\nEl detector generacional de mutacions t'ajuda marcant només\n les generacions que tenen algun individu mutat.", width/2, 3*height/5);
  text("Per a marcar un individu com a mutat, fes doble clic sobre ell.", width/2, 5.7*height/7);
  textStyle(ITALIC);
  text("Clica per continuar", width/2, 6.3*height/7);
  pop();
}

function errorMenu(){
  push();
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(color(255, 0, 0));
  text("NO ES POT UTILITZAR ☹", width/2, height/2);
  fill(0);
  textSize(20);
  text("Reinicia la partida i sel·lecciona més ", width/2, 4*height/5 + 40);
  text("ajudes per desblocar aquesta opció!", width/2, 4*height/5 + 60);
  textStyle(ITALIC);
  text("Clica per continuar", width/2, 4*height/5);
  pop();
}

function startMenu(){
  push();
  noStroke();
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  text("Mendel!", width/2, 40);
  textSize(20);
  text("Dificultat:", 70, 2*height/5);
  var difficultyText;
  if(difficulty == 1){difficultyText = "Terraplanista"; fill(76, 175, 80)}
  if(difficulty == 2){difficultyText = "Encara m'he de mirar el tema"; fill(251, 192, 45)}
  if(difficulty == 3){difficultyText = "Vull repassar abans de l'examen"; fill(230, 126, 34)}
  if(difficulty == 4){difficultyText = "Genetista"; fill(229, 57, 53)}
  if(difficulty == 5){difficultyText = "Dement"; fill(33, 33, 33)}
  text(difficultyText, width/2, 2*height/5 - 40);
  rect(width/2, 2*height/5, width/2, 10, 5);
  circle(width/2 + map(difficulty, 1, 5, -width/4, width/4), 2*height/5, 30);
  fill(0);
  text("Ajudes:", 70, 3*height/5);
  var helpText;
  if(help == 1){helpText = "Totes"; fill(76, 175, 80)}
  if(help == 2){helpText = "Informació genètica exacta"; fill(251, 192, 45)}
  if(help == 3){helpText = "Detector generacional de mutacions"; fill(230, 126, 34)}
  if(help == 4){helpText = "Només llegenda"; fill(229, 57, 53)}
  if(help == 5){helpText = "Cap"; fill(33, 33, 33)}
  textAlign(CENTER, CENTER);
  text(helpText, width/2, 3*height/5 - 40);
  rect(width/2, 3*height/5, width/2, 10, 5);
  circle(width/2 + map(help, 1, 5, -width/4, width/4), 3*height/5, 30);
  
  
  rectMode(CORNER);
  for(var i = 0; i < 6; i++){
    noStroke();
    fill(color(118, 215, 196));
    rect(width - 255 + 30*i, height - 55, 110, 210, 10);
    fill(color(209, 242, 235));
    rect(width - 250 + 30*i, height - 50, 100, 200, 10);
  }
  fill(0);
  textSize(18);
  text("Començar!", width - 200 + 30*5, height - 20);
  pop();
}

function mouseDragged(){
  if(menusActivated.start == true){
    if(abs(mouseY - 2*height/5) < 15 && mouseX >= width/4 && mouseX <= 3*width/4){
      difficulty = round(map(mouseX, width/4, 3*width/4, 1, 5));
    }
    if(abs(mouseY - 3*height/5) < 15 && mouseX >= width/4 && mouseX <= 3*width/4){
      help = round(map(mouseX, width/4, 3*width/4, 1, 5));
    }
  }
}

function generator(){
  if(difficulty == 1){
    initialPopulation = 2;
    genesNumber = 1;
    mutationsNumber.min = 1;
    mutationsNumber.max = 1;
    generationPopulation.min = 2;
    generationPopulation.max = 4;
    numberGenerations.min = 3;
    numberGenerations.max = 3;
  }
  if(difficulty == 2){
    initialPopulation = 3;
    genesNumber = 2;
    mutationsNumber.min = 1;
    mutationsNumber.max = 2;
    generationPopulation.min = 2;
    generationPopulation.max = 4;
    numberGenerations.min = 3;
    numberGenerations.max = 3;
  }
  if(difficulty == 3){
    initialPopulation = 3;
    genesNumber = 3;
    mutationsNumber.min = 2;
    mutationsNumber.max = 3;
    generationPopulation.min = 3;
    generationPopulation.max = 5;
    numberGenerations.min = 3;
    numberGenerations.max = 4;
  }
  if(difficulty == 4){
    initialPopulation = 4;
    genesNumber = 4;
    mutationsNumber.min = 2;
    mutationsNumber.max = 4;
    generationPopulation.min = 3;
    generationPopulation.max = 6;
    numberGenerations.min = 4;
    numberGenerations.max = 5;
  }
  if(difficulty == 5){
    initialPopulation = 5;
    genesNumber = 4;
    mutationsNumber.min = 3;
    mutationsNumber.max = 5;
    generationPopulation.min = 4;
    generationPopulation.max = 6;
    numberGenerations.min = 5;
    numberGenerations.max = 6;
  }

  
  //població inicial
  pesols.length = 0;
  detections.length = 0;
  for(var i = 0; i < initialPopulation; i++){
    let g = new Genoma();
    let p = new Pesol(g, (i+1)*(width -50)/(initialPopulation+1), radius, null, 0);
    pesols.push(p);
  }
  //fills generats
  generatePopulation();
  
  //mutacions
  generateMutations();
  mutationDetector();
}

function mutationDetector(){
  if(help == 3 || help == 1){
    for(var i = 0; i < pesols.length; i++){
      if(pesols[i].mutated == true){
        let found = false;
        for(var k = 0; k < detections.length; k++){
          if(detections[k].y == pesols[i].y){
            found = true;
          }
        }
        if(found == false){
          let d = new Detection(pesols[i].y);
          detections.push(d);
        }
      }
    }
  }
}

class Detection{
  constructor(y){
    this.y = y;
  }
  
  show(){
    push();
    fill(231, 76, 60);
    noStroke();
    circle(20, this.y, 30);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(20);
    text("!", 20, this.y);
    pop();
  }
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
