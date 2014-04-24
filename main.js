/* TODO
 * Check how to call a constructor with a parameter
 * Check how to handle inherentance
 * 
 */
PACMAN.Model = function(){};
PACMAN.UI = function(){};

PACMAN.UI.Ghost = function(){
    var ctx, that = {};

    var constructor = function (){
        initialize_canvas();        
        that.draw(ctx);   
    };

    var initialize_canvas = function() {
        var canvas = document.getElementById("canvas");
        blockSize = document.getElementById("pacman").offsetWidth / 19;

        canvas.setAttribute("width", (blockSize * 19) + "px");
        canvas.setAttribute("height", (blockSize * 22) + 30 + "px");
        ctx  = canvas.getContext('2d');
    };

    that.draw = function() {
        var s    = 19, 
            top  = 10
            left = 10
    
        
        var tl = left + s;
        var base = top + s - 3;
        var inc = s / 10;

        //var high = game.getTick() % 10 > 5 ? 3  : -3;
        //var low  = game.getTick() % 10 > 5 ? -3 : 3;

        ctx.fillStyle = '#FFFF00'
        ctx.beginPath();

        ctx.moveTo(left, base);

        ctx.quadraticCurveTo(left, top, left + (s/2),  top);
        ctx.quadraticCurveTo(left + s, top, left+s,  base);
        
        // Wavy things at the bottom
        //ctx.quadraticCurveTo(tl-(inc*1), base+high, tl - (inc * 2),  base);
        //ctx.quadraticCurveTo(tl-(inc*3), base+low, tl - (inc * 4),  base);
        //ctx.quadraticCurveTo(tl-(inc*5), base+high, tl - (inc * 6),  base);
        //ctx.quadraticCurveTo(tl-(inc*7), base+low, tl - (inc * 8),  base); 
        //ctx.quadraticCurveTo(tl-(inc*9), base+high, tl - (inc * 10), base); 

        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.arc(left + 6,top + 6, s / 6, 0, 300, false);
        ctx.arc((left + s) - 6,top + 6, s / 6, 0, 300, false);
        ctx.closePath();
        ctx.fill();

        var f = s / 12;
        var off = {};
        off[1] = [f, 0];
        off[2]  = [-f, 0];
        off[3]    = [0, -f];
        off[4]  = [0, f];

        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(left+6+off[1][0], top+6+off[1][1], 
                s / 15, 0, 300, false);
        ctx.arc((left+s)-6+off[1][0], top+6+off[1][1], 
                s / 15, 0, 300, false);
        ctx.closePath();
        ctx.fill();
    };

    constructor();
    return that;
};

PACMAN.UI.Pacman = function(){
    var that = {};
    var ctx;
    /**
     *  A Map.
     *  @constructor
     */
    var constructor = function (){
        initialize_canvas();        
        that.draw(ctx);   
    };

    var initialize_canvas = function() {
        var canvas = document.getElementById("canvas");
        blockSize = document.getElementById("pacman").offsetWidth / 19;

        canvas.setAttribute("width", (blockSize * 19) + "px");
        canvas.setAttribute("height", (blockSize * 22) + 30 + "px");
        ctx  = canvas.getContext('2d');
    };

    that.draw = function (ctx) {
        var s = 19 
            angle = 90;

        ctx.fillStyle = "#FFFF00";

        ctx.beginPath();        

        ctx.moveTo(((100/10) * s) + s / 2,
                   ((100/10) * s) + s / 2);
        
        ctx.arc(((100/10) * s) + s / 2,
                ((100/10) * s) + s / 2,
                s / 2, Math.PI * 0.8, 
                Math.PI * 45, 1); 
        
        ctx.fill();
    };

    constructor();
    return that;
}


PACMAN.Model.Map = function() {
    var that = {}
    
    /**
     * Map model, constains the state of the Pacman game  
     */
    var map;

    /**
     *  A Map.
     *  @constructor
     */
	var constructor = function (){
		that.initialize_map()	
	};

    /**
     *  Set variable MAP to the initial values 
     *  @constructor
     */
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

    /** 
     *   Return the value of an specific position
     *   param x:  Row value (Integer) 
     *  param y:  Column value (Integer)
     */
	that.getValue = function (x ,y){
		value = map[x][y];
		map[x][y] = 2; 
		return value;
	}

    /** 
     * Return how many row are on the map 
     */
    that.getRowsSize = function(){
        return map.length
    }

    /**
     * Return how many columns are on the map 
     */
    that.getColumnsSize = function(){
        return map[0].length
    }

	constructor();
	return that;
}


// Making this variables inside of function allow to create 
PACMAN.Model.Game = function(spec) {
	var that = {};
    var map  = PACMAN.Model.Map();

    /**
    * A Game 
    * @constructor
    */
	var contructor = function() {
		//game 
	};

    that.getRowsSize = function(){
        return map.getRowsSize();
    }

    that.getColumnsSize = function(){
        return map.getColumnsSize();
    }

    that.getValueAtPosition = function(x, y){
        return map.getValue(x , y)
    }

	//constructor();
	return that 
};

PACMAN.UI.Map = function(spec) {
	var that = {};
	var game = PACMAN.Model.Game();
    var pacman, pinky, cyde, red, orange;
    var ctx, blockSize;

	var constructor = function() {
		initialize_canvas();
        draw_map();
        draw_pills();
        //pacman = PACMAN.UI.Pacman();
        //pinky  = PACMAN.UI.Ghost();
        //cyde   = PACMAN.UI.Ghost();
        //red    = PACMAN.UI.Ghost();
        //orange = PACMAN.UI.Ghost();
	};

	var initialize_canvas = function() {
		var canvas = document.getElementById("canvas");
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
 
window.onload = function () {
	PACMAN.UI.Map();
};
