 PACMAN.UI.Map = function(ctx, spec) {
  var that = spec || {};

  var constructor = function() {  
    draw_map();
  };

  var draw_map = function() {
    var i, j, line;

    ctx.strokeStyle = PACMAN.BLUE_WALL;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    for (i = 0; i < PACMAN.WALLS.length; i += 1) {
      line = PACMAN.WALLS[i];
      ctx.beginPath();
      for (j = 0; j < line.length; j += 1) {
        draw_wall(line[j])
      }
      ctx.stroke();
    }
  };

  var draw_wall = function(p) {
    if (p.move) {
      ctx.moveTo(p.move[0] * blockSize, p.move[1] * blockSize);
    } else if (p.line) {
      ctx.lineTo(p.line[0] * blockSize, p.line[1] * blockSize);
    } else if (p.curve) {
      ctx.quadraticCurveTo(p.curve[0] * blockSize,
        p.curve[1] * blockSize,
        p.curve[2] * blockSize,
        p.curve[3] * blockSize);
    }
  };

  that.draw_pill = function(value, i, j) {
    if (value !== PACMAN.PILL) return

    ctx.fillStyle = "#000";
    ctx.fillRect((j * blockSize), (i * blockSize),
      blockSize, blockSize);
    ctx.fillStyle = "#FFF";
    ctx.arc((j * blockSize) + blockSize / 2, (i * blockSize) + blockSize / 2,
      Math.abs(5 - (PACMAN.PILL_SIZE / 3)),
      0,
      Math.PI * 2, false);
    ctx.fill();
  };


  that.draw_biscuit = function(value, i, j) {
    if (value === PACMAN.PILL) return;

    ctx.beginPath();

    if (value === PACMAN.EMPTY || value === PACMAN.BLOCK ||
      value === PACMAN.BISCUIT) {
      
      ctx.fillStyle = "#000";
      ctx.fillRect((j * blockSize), (i * blockSize), blockSize, blockSize);

      if (value === PACMAN.BISCUIT) {
        ctx.fillStyle = "#FFF";
        ctx.fillRect((j * blockSize) + (blockSize / 2.5), (i * blockSize) + (blockSize / 2.5),
          blockSize / 6, blockSize / 6);
      }
    }
  };

  constructor();
  return that;
};
