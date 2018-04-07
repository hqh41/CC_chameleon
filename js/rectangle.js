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

function rec_color (x)
{
    var i
    for(i=0;i<num_l;i++)
    {
      if(x>r[i].beginX && x< r[i].beginX+r[i].len)
      {
        return r[i].color
      }
    } 
}

function Rectangle (beginX,len,coloFlag){
  this.beginX=beginX;
  this.len=len
  this.colorFlag=coloFlag
  this.color = '';
  var c =255;
  //var colorFlag=0
  this.draw_rect =function(){
    let color = ''
    noStroke();

    if(this.colorFlag>5)
    {
      fill("#eab4d4");
      color = "#eab4d4"

    }
    else {
      fill("#f7c90fb5")
      color= "#f7c90fb5"
    }
    push();
    translate(this.beginX, recHeight);

    rect(0, 0, this.len, wide);

    pop();
    return color
  }

}
