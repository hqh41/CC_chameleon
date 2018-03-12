function Spin(xpos, ypos, s){
  this.x = xpos;
  this.y = ypos;
  this.speed = s;
}


function SpinArm(x, y, s)
{
  Spin.call(this, x, y, s);//call用于调用希望集成的构造函数，并绑定this
  var angle=0;
  var i;
  this.draw_SpinArm= function(){
    y+=1;
    strokeWeight(3);
    stroke(242, 156, 177);
    translate(x, y);
    for(i = 0; i < 8; i++){
      push();
      angle += 3.14/4;
      rotate(angle);
      line(0, 0, 24, 0);
      pop();
    }
    translate(-x, -y);
    if(y > height + radius){
      y = 0;
    }
  }
}

function F() {   //一个空对象
}

F.prototype = Spin.prototype;  //不能直接修改SpinArm的prototypy
//为Spin的prototype，这样他们共享同一个原型，修改SpinArm会影响到
//Spin，所以需要设置一个空函数F， F的原型指向Spin的原型

SpinArm.prototype = new F();//SpinArm的原型是F。F的原型是Student

SpinArm.prototype.constructor = SpinArm;//修正SpinArm的构造函数为Spin

function SpinSpots (x,y,s) {
  Spin.call(this, x,y,s);   //call用于调用希望集成的构造函数，并绑定this
  var angle=0;
  this.draw_SpinSpots=function() {
    y+=1;
    fill(255);
    noStroke();
    translate(x, y);
    push();
    //translate(x, y);
    angle += speed;
    rotate(angle);
    ellipse(-radius, 0, 2*radius, 2*radius);
    ellipse(0, -radius, 2*radius, 2*radius);
    ellipse(radius, 0, 2*radius, 2*radius);
    ellipse(0, radius, 2*radius, 2*radius);
    pop();
    translate(-x, -y);
    if(y > height + radius){
      y = 0;
    }
  }
}

function G() {
}

G.prototype = Spin.prototype;

SpinSpots.prototype = new G();

SpinSpots.prototype.constructor = SpinSpots;
