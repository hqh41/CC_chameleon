final float Min = 400.0;
final float Max = 600.0;
final int num_l = 5;
final float wide = 100.0;
final float speed = 20.0;
final float max_interspace = 200.0;
float centerX = 50.0;
int frameCount = 0;

rectangle[] r = new rectangle[num_l];

void setup(){
  frameRate(1);
  size(2000, 1000);
  background(0);
  noStroke();
  fill(204, 102, 0);
  ellipse(centerX, 650, 100, 100);
  float start = 0.0;
  //initiate les premiers num_l rectangles
  for(int i = 0; i < num_l; i++){
    float tmp = random(Min, Max); 
    float interspace = random(20, max_interspace);
    println(interspace);
    r[i] = new rectangle(start, tmp);
    start += (tmp + interspace);
  }
}


void draw(){
  frameCount++;
  background(0);
  //println(frameCount);
  
  //afficher une shpère
  noStroke();
  fill(204, 200, 0);
  ellipse(centerX, 650, 100, 100);
  centerX += 20;
  
  //afficher num_l rectangles;
  for(int i = 0; i < num_l; i++){
    r[i].draw_rect();
    //println(r[i].beginX + "->" + r[i].len);
  }
  println("\n");

  for(rectangle e : r){
    e.beginX -= speed;
  }
  
  //si le premier rectangle est disparu d'écran, on ajoute un nouveau(il y a toujours num_l rectangles dans r)
  if(r[0].beginX + r[0].len < 0 ){
    for(int i = 1; i < num_l; i++){
      r[i - 1] = r[i];
    }
    r[num_l - 1] = new rectangle(random(r[num_l - 2].beginX + r[num_l - 2].len, r[num_l - 2].beginX + r[num_l - 2].len + max_interspace), random(Min, Max));
  }
}




//définition de classe rectangle
class rectangle{
  float beginX;
  float len;
  color c;
  
  rectangle(float b, float x){
    beginX = b;
    len = x;
    c = 255;
  }
  
  void draw_rect(){
    noStroke();
    fill(c);
    pushMatrix();
    translate(beginX, 700);
    rect(0, 0, len, wide);
    popMatrix();
  }
}