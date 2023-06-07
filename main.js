let table;
let numRows, numCols;
let date = [], gsml = []
let diagramX, diagramY;
let size = [];
let buttonX,buttonY,buttonW,buttonH;
let sliderX,sliderY,sliderW,sliderH,cirX,cirY;
let c;
let showGraph1=true;

function preload(){
  table = loadTable("assets/seaLevel.csv","csv","header");
  
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  //get metadata
  numRows = table.getRowCount();
  numCols = table.getColumnCount();
  //print("rows: " + numRows + " cols: " + numCols)
  
  
  //load data
  for(let r=0; r<table.getRowCount(); r++){
    date[r] = table.getString(r,0);
    gsml[r] = table.getNum(r,1);
    //print(date[r] + " "+gsml[r])
  } 
  minMax();
  
  //variable - value
  diagramX = (width/4)*3-90;
  diagramY = height/2;
  buttonX = diagramX;
  buttonY = height-50;
  buttonW = 100;
  buttonH = 25
  c = color('black')
  sliderX = buttonX;
  sliderY = buttonY - 50;
  sliderW = 400;
  sliderH = 0.5;
  cirX = sliderX;
  cirY = sliderY;
}


function draw() {
  background(300);
  chartInfo();
  if(showGraph1){
    drawCircularGraph();
  }else{
    drawBarGraph();
  }
  
  newButton(buttonX,buttonY,buttonW,buttonH,"SWITCH GRAPH",10)
  newSlider(sliderX,sliderY,sliderW,sliderH,cirX,cirY)
  if(dist(mouseX,mouseY,cirX,cirY)<30 && mouseIsPressed){
    cirX = mouseX;
    cirY = sliderY;
    c = color('red')
  }else{
    c = color('black')
  }
}

function mousePressed(){
  if(dist(mouseX,mouseY,buttonX,buttonY)<15){
    showGraph1 = !showGraph1;
  }
}

