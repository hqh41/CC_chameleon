//float y = 50;
boolean bl_snow = true;
float snow[] = new float[50];
float radius = 8.0;
float speed = 0.01;
float a = 50.0;
SpinArm arm[] = new SpinArm[18];
SpinSpots spots[] = new SpinSpots[18];

void setup(){
  size(1000, 1000);
  smooth();
  noStroke();
  for(int i = 0; i < 10; i++){
    float y = random(200, 500);
    arm[i] = new SpinArm(a, y, speed);
    spots[i] = new SpinSpots(a, y, speed);
    a += 100.0;
  }
  a = 0.0;
}

void draw(){
  fill(0, 23);
  rect(0, 0, width, height);
  stroke(242, 156, 177);
  for(int i = 0; i < 10; i++){
    arm[i].draw_SpinArm();
    arm[i].y += 1;
    spots[i].draw_SpinSpots();
    spots[i].y += 1;
    if(arm[i].y > height + radius){
       arm[i].y = 0;
    }
    if(spots[i].y > height + radius){
      spots[i].y = 0;
    }
  }
}

class Spin{
  float x, y, speed;
  float angle = 0.0;
  
  Spin(float xpos, float ypos, float s){
    x = xpos;
    y = ypos;
    speed = s;
  }
}

class SpinArm extends Spin{
  SpinArm(float x, float y, float s){
    super(x, y, s);
  }
  
  void draw_SpinArm(){
    strokeWeight(3);
    stroke(242, 156, 177);
    translate(x, y);
    for(int i = 0; i < 8; i++){
      pushMatrix();
      angle += PI/4;
      rotate(angle);
      line(0, 0, 24, 0);
      popMatrix();
    }
    translate(-x, -y);
  } 
}

class SpinSpots extends Spin{
  
  SpinSpots(float x, float y, float s){
    super(x, y, s);
  }
  
  void draw_SpinSpots(){
    fill(255);
    noStroke();
    translate(x, y);
    pushMatrix();
    //translate(x, y);
    angle += speed;
    rotate(angle);
    ellipse(-radius, 0, 2*radius, 2*radius);
    ellipse(0, -radius, 2*radius, 2*radius);
    ellipse(radius, 0, 2*radius, 2*radius);
    ellipse(0, radius, 2*radius, 2*radius);
    popMatrix();
    translate(-x, -y);
  }
}