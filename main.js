PACMAN.Map = function() {
	var that = {}, map;

	var constructor = function (){
		that.initialize_map()	
	};

	that.initialize_map = function(){
		map = [
    		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    		[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    		[0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
    		[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    		[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    		[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    		[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    		[2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    		[0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    		[2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
    		[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    		[2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    		[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    		[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    		[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    		[0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
    		[0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    		[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    		[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
	};

	that.get_position = function (x ,x){
		value = map[x][y];
		map[x][y] = 2; 
		return value;
	}

	constructor();
	return that;
}


// Making this variables inside of function allow to create 
PACMAN.Game = function(spec) {
	var that = {};

	var contructor = function() {
		//game 
	};

	//constructor();
	return that 
};

PACMAN.Ui = function(spec) {
	var that = {};
	var game = PACMAN.Game()
	var ctx, blockSize;

	var constructor = function() {
		initialize_canvas();
		draw_map();
		draw_pills();
		//initilize_controllers();
	};

	var initialize_canvas = function() {
		var canvas    = document.getElementById("canvas");
		blockSize = document.getElementById("pacman").offsetWidth / 19;

		canvas.setAttribute("width", (blockSize * 19) + "px");
        canvas.setAttribute("height", (blockSize * 22) + 30 + "px");
		ctx  = canvas.getContext('2d');
	};

	var draw_map = function() {
        var i, j, line;
        
        ctx.strokeStyle = "#0000FF";
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
    	for (i = 0; i < PACMAN.MAP.length; i += 1) {
            line = PACMAN.MAP[i];
            ctx.beginPath(); 
            	for (j = 0; j < line.length; j += 1) {
            	    draw_pill(i, j)
            	    draw_biscuit(i, j)
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

    var draw_pill = function(i, j){
      	if (PACMAN.MAP[i][j] !== PACMAN.PILL) return

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

    var draw_biscuit = function(i, j){
    	var layout = PACMAN.MAP[i][j];

        if (layout === PACMAN.PILL) {
            return;
        }

        ctx.beginPath();
        
        if (layout === PACMAN.EMPTY || layout === PACMAN.BLOCK || 
            layout === PACMAN.BISCUIT) {
            
            ctx.fillStyle = "#000";
		    ctx.fillRect((j * blockSize), (i * blockSize), 
                         blockSize, blockSize);

            if (layout === PACMAN.BISCUIT) {
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
 
window.onload = function () {
	PACMAN.Ui();
};
