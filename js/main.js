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
var max_interspace = 200;
var frameCount = 0;

var recHeight;

var radius = 8.0;
var snowSpeed = 0.01;
var a = 50.0;
var arm = new Array(18);
var spots = new Array(18);

var r = new Array(num_l);

var colorFlag=0
var accLevel

var center = new Array(6);
var poinStart = 30;
var p;

var cloudColor = false;

function setup() {
    /****************initialisation varibales*****************/
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn()
    mic.start();
    height = windowHeight/2
    q = windowHeight/2 + 100
    diff=0
    isUp=false;
    isDown=false;
    isLock=false;
    role = loadImage("lapin.gif")
    p = windowWidth/4
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
    recHeight=height+wide-10

}

function draw() {
  /****************draw of background*****************/
  background('#fff3f3');
  fill(0, 23);
  rect(0, 0, windowWidth, windowHeight);
  stroke(242, 156, 177);

  /****************draw game role with cloud*****************/
  image(role,windowWidth/6,height-diff-42,role.width/2,role.height/2)

  center[0] = new myPoint(poinStart, 0);
  center[1] = new myPoint(2.5*poinStart, 0);
  center[2] = new myPoint(3*poinStart, 0.3*poinStart);
  center[3] = new myPoint(2.5*poinStart, 0.5*poinStart);
  center[4] = new myPoint(1.5*poinStart, 0.7*poinStart);
  center[5] = new myPoint(0, 0.3*poinStart);
  var i
  for(i = 0; i < 6; i++){
    center[i].draw_pEllipse();
  }
  /****************draw game role with cloud*****************/
  frameCount++;

  var i,e;
  for(i = 0; i < num_l; i++){
    r[i].draw_rect();
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

  if(isUp&&diff===120)
  {
    isUp=false;
    isDown=true;
  }
  if(isUp&&diff<120)
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
      cloudColor = !cloudColor;
    }
  }
  if(speed>0&&micLevel<0.02)
  {
      isVoiceLock=false;
  }

  /****************check game over*****************/


  // if((!at_rec(windowWidth/6+role.width/5))&&(diff===0))
  // {
  //     height+=10
  //     height+=20
  //     speed=0
  // }

}

