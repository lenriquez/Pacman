
// Making this variables inside of function allow to create 
PACMAN.Model.Game = function(spec) {
	var that    = spec;
    var map     = PACMAN.Model.Map();
    var pacman  = [16,9]
    var clyde   = [9,7]
    var pinky   = [9,8]
    var inky    = [9,9]
    var blinky  = [8,9]

    /**
    * A Game 
    * @constructor
    */
	var contructor = function() {
		//game 
	};

    that.move_pacman = function (direction) {
        map_value = -1
        console.log(pacman[0]);
        console.log(pacman[1]);
        switch(direction){
            case PACMAN.KEY_UP_CODE:
                console.log("up")
                map_value = map.getValue(pacman[0]-1 , pacman[1]);
                break;
            case PACMAN.KEY_DOWN_CODE:
                console.log("down")
                map_value = map.getValue(pacman[0]+1 , pacman[1]);
                break;
            case PACMAN.KEY_LEFT_CODE:
                console.log("left")
                map_value = map.getValue(pacman[0] , pacman[1]-1);
                break;
            case PACMAN.KEY_RIGHT_CODE:
                console.log("right")
                map_value = map.getValue(pacman[0] , pacman[1]+1);
                break;
        }
        console.log("Map Value " + map_value );
        return map_value
    };

    that.getRowsSize = function(){
        return map.getRowsSize();
    };

    that.getColumnsSize = function(){
        return map.getColumnsSize();
    };

    that.getValueAtPosition = function(x, y){
        return map.getValue(x , y)
    };

	//constructor();
	return that 
};
