function myPoint (xpos, ypos) {
  this.x = xpos;
  this.y = ypos;
  this.draw_pEllipse = function(){
    noStroke();
    if(cloudColor)
      fill("#eab4d4");
    else
      fill("#f7c90fb5");
    var i;
    for(i = 0; i < 6; i++){
      push();
      translate(p, q);
      ellipse(this.x, this.y, (0.7+i/10)*50, (0.3+i/10)*35);
      pop();
    }
  }
}