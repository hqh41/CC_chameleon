var role;
var mic;
var height;
var diff=0;
var isUp=false;
var isDown=false;
var isLock=false;
var isVoiceLock = false;

var Min = 400;
var Max = 600;
var num_l = 5;
var wide = 100;
var speed = 25;
var min_interspace = 50;
var max_interspace = 300;
var frameCount = 0;

var recHeight;

var radius = 8.0;
var snowSpeed = 0.01;
var a = 50.0;
var arm = new Array(18);
var spots = new Array(18);

var r = new Array(num_l);

var accLevel;

var center = new Array(6);
var poinStart = 20;
var cloudY;
var cloudX;

var cloudColor = "#f7c90fb5"; //yellow
var colorFlag=0;      //yellow
var rectColor = false; //yellow

function setup() {
  /****************initialisation varibales*****************/
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn()
  mic.start();
  height = windowHeight/2
  cloudY = height+wide+7;
  cloudX = windowWidth/6+110
  diff=0
  isUp=false;
  isDown=false;
  isLock=false;
  role = loadImage("lapin.gif")
  role2 = loadImage("gameover.jpg")
  recHeight=height+wide+30;
  accLevel=0

  frameRate(20);
  /****************draw rectangles*****************/
  var start = 0;
  var i;
  r[0] = new Rectangle(start, windowWidth/2);
  start += windowWidth/2;
  for( i = 1; i < num_l; i++){
    var tmp = Math.random() * (Max - Min) + Min;
    var interspace =Math.random() * (max_interspace - min_interspace) + min_interspace;
    colorFlag=random(0,10);
    r[i] =new Rectangle(start+interspace, tmp,colorFlag);
    start += (tmp + interspace);
  }
  /****************snow background*****************/
  smooth();
  noStroke();
  for(i = 0; i < 10; i++){
    var y = random(200, 500);
    arm[i] = new SpinArm(a, y, snowSpeed);
    spots[i] = new SpinSpots(a, y, snowSpeed);
    a += 150.0;
  }
  a = 0.0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  height =windowHeight/2
  recHeight=height+wide+30
  cloudX = windowWidth/6+110
  cloudY = height+wide+7;
}

function draw() {
  /****************draw of background*****************/
  background('#fff3f3');
  fill(0, 23);
  rect(0, 0, windowWidth, windowHeight);
  stroke(242, 156, 177);

  /****************draw game role with cloud*****************/
  image(role,windowWidth/6,height-diff-30,role.width/2,role.height/2)
  center[0] = new myPoint(poinStart, 0 , cloudX, cloudY-diff);
  center[1] = new myPoint(2.5*poinStart, 0,cloudX, cloudY-diff);
  center[2] = new myPoint(3*poinStart, 0.3*poinStart,cloudX, cloudY-diff);
  center[3] = new myPoint(2.5*poinStart, 0.5*poinStart,cloudX, cloudY-diff);
  center[4] = new myPoint(1.5*poinStart, 0.7*poinStart,cloudX, cloudY-diff);
  center[5] = new myPoint(0, 0.3*poinStart,cloudX, cloudY-diff);
  var i
  for(i = 0; i < 6; i++){
    center[i].draw_pEllipse();
  }
  /****************draw game role with cloud*****************/
  frameCount++;

  var i,e;
  for(i = 0; i < num_l; i++){
    r[i].color = r[i].draw_rect();
  }
  for( e in  r){

    r[e].beginX -= speed;
  }
  //si le premier rectangle est disparu d'écran, on ajoute un nouveau(il y a toujours num_l rectangles dans r)
  if(r[0].beginX + r[0].len < 0 ){
    for(i = 1; i < num_l; i++){
      r[i - 1] = r[i];
    }
    colorFlag=random(0,10);
    r[num_l - 1] = new Rectangle(random(r[num_l - 2].beginX + r[num_l - 2].len+min_interspace, r[num_l - 2].beginX + r[num_l - 2].len + max_interspace), random(Min, Max),colorFlag);
  }


  /****************draw snow background*****************/
  for(i = 0; i < 10; i++){
    arm[i].draw_SpinArm();
    spots[i].draw_SpinSpots();
  }

  /****************acceletation for jump*****************/
  accLevel = accelerationX;
  if(speed>0&&accLevel>3) {
    if(!isLock) {
      isUp = true;
      isLock=true;
    }
  }

  if(isUp&&diff===140)
  {
    isUp=false;
    isDown=true;
  }
  if(isUp&&diff<140)
    diff+=20

  if(isDown&&diff>=0)
    diff-=20
  if(isDown&&diff===0)
  {
    isDown=false
    isLock=false
  }

  /****************voice for change color*****************/
  micLevel = mic.getLevel();
  if(speed>0&&micLevel>0.03) {
        console.log("voice")
    if(!isVoiceLock) {
      isVoiceLock=true;
      if(cloudColor === "#f7c90fb5") {
        cloudColor = "#eab4d4";
      }
      else {
        cloudColor = "#f7c90fb5"
      }
    }
  }
  if(speed>0&&micLevel<0.02)
  {
      isVoiceLock=false;
  }

  /****************check game over*****************/


   if((!at_rec(windowWidth/6+role.width/5))&&(diff===0))
   {
       //height+=10
       //height+=20
       //cloudY+10
       //cloudY+=20
       speed=0
       image(role2,windowWidth/4,0,role2.width,role2.height)
       document.getElementById('button').setAttribute("style", "display: block")
   }
  if(cloudColor !== rec_color(windowWidth/6+role.width/5) && at_rec(windowWidth/6+role.width/5))
  {
      speed = 0;
  }

}

