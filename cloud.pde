point center[] = new point[6];
float a = 60.0;
float p = 500.0;
float q = 500.0;

void setup(){
  size(1000, 1000);
  background(255);
  noStroke();
  fill(204, 102, 0);
}

void draw(){
   center[0] = new point(a, 0);
   center[1] = new point(2.5*a, 0);
   center[2] = new point(3*a, 0.3*a);
   center[3] = new point(2.5*a, 0.5*a);
   center[4] = new point(1.5*a, 0.7*a);
   center[5] = new point(0, 0.3*a);
   for(int i = 0; i < 6; i++){
     center[i].draw_pEllipse();
   }
}

class point{
  float x;
  float y;
  
  point(float xpos, float ypos){
    x = xpos;
    y = ypos;
  }
  
  void draw_pEllipse(){
    noStroke();
    fill(0);
    for(int i = 0; i < 6; i++){
      pushMatrix();
      translate(p, q);
      ellipse(x, y, (0.7+(float)i/10)*100, (0.3+(float)i/10)*70);
      popMatrix();
    }
  }
}