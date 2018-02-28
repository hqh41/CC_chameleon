var role;
var mic;
var height;
var diff=0;
var isUp=false;
var isDown=false;
var isLock=false;

var Min = 400;
var Max = 600;
var num_l = 5;
var wide = 100;
var speed = 25;
var min_interspace = 20;
var max_interspace = 200;
var frameCount = 0;

var recHeight;

var r = new Array(num_l);

function setup() {
    createCanvas(windowWidth, windowHeight);
    $('#defaultCanvas0').addClass('myCanvas');
    mic = new p5.AudioIn()
    mic.start();
    height =windowHeight/2
    diff=0
    isUp=false;
    isDown=false;
    isLock=false;
    role = loadGif("lapin.gif")
    recHeight=height+wide-10

    frameRate(20);
    var start = 0;
    var i;
    r[0] = new Rectangle(start, windowWidth/4);
    start += windowWidth/4;
    for( i = 1; i < num_l; i++){
        var tmp = Math.random() * (Max - Min) + Min;
        var interspace =Math.random() * (max_interspace - 20) + 20;
        r[i] =new Rectangle(start, tmp);
        start += (tmp + interspace);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    height =windowHeight/2
    recHeight=height+wide-10

}

function draw() {
    background('#fff3f3');
    micLevel = mic.getLevel();
    if (role.loaded())
        image(role,windowWidth/6,height-diff,role.width/3,role.height/3)
    if((!at_rec(windowWidth/6+role.width/6))&&(diff===0))
    {
        height+=10
        height+=20
        speed=0
    }
    if(speed>0&&micLevel>0.05) {

        if(!isLock) {
            isUp = true;
            isLock=true;
        }
    }
    if(isUp&&diff===80)
    {
        isUp=false;
        isDown=true;
    }
    if(isUp&&diff<80)
        diff+=10

    if(isDown&&diff>=0)
        diff-=10
    if(isDown&&diff===0)
    {
        isDown=false
        isLock=false
    }

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
        r[num_l - 1] = new Rectangle(random(r[num_l - 2].beginX + r[num_l - 2].len+min_interspace, r[num_l - 2].beginX + r[num_l - 2].len + max_interspace), random(Min, Max));
    }

}

function at_rec (x)
{
    if(x<r[0].beginX)
        return false
    else {
        var i
        for(i=0;i<num_l;i++)
        {
            if(x>r[i].beginX && x< r[i].beginX+r[i].len)
            {
                return true
            }
        }
    }
}

function Rectangle (beginX,len){
    this.beginX=beginX;
    this.len=len


    var c=255;
    this.draw_rect =function(){
        noStroke();
        fill("#eab4d4");
        push();
        translate(this.beginX, recHeight);

        rect(0, 0, this.len, wide);

        pop();
    }

}





