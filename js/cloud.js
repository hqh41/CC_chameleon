function myPoint (xpos, ypos,cloudX, cloudY) {
  this.x = xpos;
  this.y = ypos;
  this.cloudX = cloudX
  this.cloudY = cloudY
  this.draw_pEllipse = function(){
    noStroke();
    fill(cloudColor);
    var i;
    for(i = 0; i < 6; i++){
      push();
      translate(this.cloudX, this.cloudY);
      ellipse(this.x, this.y, (0.7+i/10)*40, (0.3+i/10)*25);
      pop();
    }
  }
}