PACMAN.UI.Pacman = function(ctx) {
  var that = {};
  var radius = PACMAN.SIZE / 2,
      CLOCKWISE = 1
      bottom_lip = 0.999,
      top_lip = 1.0,
      x = (9 * PACMAN.SIZE),
      y = 16 * PACMAN.SIZE,
      increase_mouth_angle = 0,
      stop = false,
      direction = PACMAN.KEY_LEFT_CODE;

  /**
   *  A Map.
   *  @constructor
   */
  var constructor = function() {
    //setInterval(that.animation, 50);
  };

  that.get_x = function(){
    return x;
  }; 

  that.get_y = function(){
    return y;
  };

  that.get_direction = function(){
    return direction;
  };

  that.animation = function() {
    that.draw_clean();
    that.movements();
    that.draw_pacman();
    that.calculate_mouth_angle();
  };

  that.change_direction = function(dir) {
    increase_mouth_angle = 0;
    switch (dir) {
      case PACMAN.KEY_UP_CODE:
        bottom_lip = 1.399;
        top_lip = 1.55;
        break;
      case PACMAN.KEY_UP_CODE:
        break;
      case PACMAN.KEY_LEFT_CODE:
        bottom_lip = 0.999;
        top_lip = 1.0;
        break;
      case PACMAN.KEY_RIGHT_CODE:
        bottom_lip = 1.899;
        top_lip = 0.05;
        break;
    }
  };

  that.validate_dir_change = function(dir){
    if (dir === direction) {
      return false;
    }

    direction = dir; 
    
    
    return true
  };

  that.movements = function() {
    switch (direction) {
      case PACMAN.KEY_UP_CODE:
        break;
      case PACMAN.KEY_DOWN_CODE:
        break;
      case PACMAN.KEY_LEFT_CODE:
        x -= 1
        break;
      case PACMAN.KEY_RIGHT_CODE:
        break;
    }
  };

  /**
   * Increase Pacman mouth angle 5 times and reduce the angle 3 times to
   * create the biting movement if stop variable is equals to true it won't
   * do anything
   * http://www.w3schools.com/tags/canvas_arc.asp
   */
  that.calculate_mouth_angle = function() {
    if (stop) return;
    increase_mouth_angle = increase_mouth_angle % 10;

    if (increase_mouth_angle < 5) {
      bottom_lip -= 0.05;
      top_lip += 0.05;
    } else {
      bottom_lip += 0.05
      top_lip -= 0.05;
    }

    increase_mouth_angle += 1;
  };

  /**
   * Set a black square to clean up the last draw
   */
  that.draw_clean = function() {
    ctx.fillStyle = PACMAN.BLACK;
    ctx.beginPath();
    ctx.rect(x, y, PACMAN.SIZE, PACMAN.SIZE);
    ctx.fill();
  };

  /**
   * Draw Pacman
   */
  that.draw_pacman = function() {
    ctx.fillStyle = PACMAN.YELLOW;
    ctx.beginPath();
    ctx.moveTo(x + radius, y + radius);
    ctx.arc(x + radius, y + radius, radius,
      Math.PI * bottom_lip, Math.PI * top_lip, CLOCKWISE);
    ctx.fill();
  };

  constructor();
  return that;
}
