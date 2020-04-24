const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, friend3,friend2;
var backgroundImg,platform;
var friend1, slingshot;

var gameState = "onSling";

var bg = "sprites/back.jpg";

var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);

    friend3 = new Friend2(810, 370);
    friend2 = new Friend2(810, 240);

    log1 = new Log(810,260,300, PI/2);
    log2 =  new Log(810,180,300, PI/2);
    log3 = new Log(760,120,150, PI/7);
    log4 = new Log(870,120,150, -PI/7);

    friend1 = new Friend1(200,70);

    slingshot = new SlingShot(friend1.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    noStroke();
    textSize(35);
    fill("black");
    text("Score: "+score,width-300,50);
    textSize(15);
    text("Press 'Space' to attach the ball with the sling", width - 300, 75)

    Engine.update(engine);
   
    ground.display();
    platform.display();
    
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    
    friend3.display();
    friend2.display();

    log1.display();
    log2.display();
    log3.display();
    log4.display();
        
    friend1.display();
    
    slingshot.display();

    friend3.score();
    friend2.score();
}

function mouseDragged(){
        Matter.Body.setPosition(friend1.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){

    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        friend1.trajectory = [];
        Matter.Body.setPosition(friend1.body,{x:200,y:50});
        slingshot.attach(friend1.body);
    }
}

async function getBackgroundImg() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);

    if(hour>=06 && hour<=18) {
        bg = "sprites/back.jpg";

    }else {
        bg = "sprites/back.jpg";
  
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}



function getBackgroundImg() {
    backgroundImg = loadImage(bg);
}