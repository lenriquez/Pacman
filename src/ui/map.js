
PACMAN.UI.Map = function(spec) {
	var that = {};
	var game = PACMAN.Model.Game();
    var pacman, pinky, cyde, red, orange;
    var ctx, blockSize;

	var constructor = function() {
		initialize_canvas();
        set_keyboard_controls();
        draw_map();
        draw_pills();
        blinky = PACMAN.UI.Blinky(ctx,{});
        pacman = PACMAN.UI.Pacman(ctx,{});
        pinky  = PACMAN.UI.Pinky(ctx,{});
        cyde   = PACMAN.UI.Clyde(ctx,{});
        inky   = PACMAN.UI.Inky(ctx,{});
	};

	var initialize_canvas = function() {
		var canvas = document.getElementById("canvas");
		blockSize = document.getElementById("pacman").offsetWidth / 19;

		canvas.setAttribute("width", (blockSize * 19) + "px");
        canvas.setAttribute("height", (blockSize * 22) + 30 + "px");
		ctx  = canvas.getContext('2d');
	};

    var set_keyboard_controls = function () {
        document.body.onkeydown = function(event){
            if (game.move_pacman(event.keyCode) != 0) {
                pacman.move(event.keyCode);
            }
        }
    }

	var draw_map = function() {
        var i, j, line;
        
        ctx.strokeStyle = PACMAN.BLUE_WALL;
        ctx.lineWidth   = 5;
        ctx.lineCap     = "round";
        
        for (i = 0; i < PACMAN.WALLS.length; i += 1) {
            line = PACMAN.WALLS[i];
            ctx.beginPath();
            	for (j = 0; j < line.length; j += 1) {
            	    draw_wall(line[j])
            	}
            ctx.stroke();
        }
    };

    var draw_pills = function(){
    	for (i = 0; i < game.getRowsSize(); i += 1) {
            ctx.beginPath(); 
            	for (j = 0; j < game.getColumnsSize(); j += 1) {
                    value = game.getValueAtPosition(i, j)
            	    draw_pill(value, i, j)
            	    draw_biscuit(value, i, j)
            	}
            ctx.closePath();
        }
    };

    var draw_wall = function(p){
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

    var draw_pill = function(value, i, j){
      	if (value !== PACMAN.PILL) return

       	ctx.fillStyle = "#000";
		ctx.fillRect((j * blockSize), (i * blockSize), 
               blockSize, blockSize);
       	ctx.fillStyle = "#FFF";
       	ctx.arc((j * blockSize) + blockSize / 2,
       	    (i * blockSize) + blockSize / 2,
       	    Math.abs(5 - (PACMAN.PILL_SIZE/3)), 
       	    0, 
       	    Math.PI * 2, false); 
       	ctx.fill();   
    };


    var draw_biscuit = function(value, i, j){
        if (value === PACMAN.PILL)  return;
        
        ctx.beginPath();
        
        if (value === PACMAN.EMPTY || value === PACMAN.BLOCK || 
            value === PACMAN.BISCUIT) {    
            ctx.fillStyle = "#000";
		    ctx.fillRect((j * blockSize), (i * blockSize), 
                         blockSize, blockSize);

            if (value === PACMAN.BISCUIT) {
                ctx.fillStyle = "#FFF";
		        ctx.fillRect((j * blockSize) + (blockSize / 2.5), 
                             (i * blockSize) + (blockSize / 2.5), 
                             blockSize / 6, blockSize / 6);
	        }
        }
    }



	constructor();
	return that;
};