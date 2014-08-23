
PACMAN.UI.Pacman = function(ctx){
    var that = {};
    var size = 18,
        radius = size / 2,
        CLOCKWISE = 1
        bottom_lip = 0.999,
        top_lip = 1.0,
        ini_pos_x = 9 * size,
        ini_pos_y = 16 * size,
        increase_mouth_angle = 1,
        stop = true         

    /**
     *  A Map.
     *  @constructor
     */
    var constructor = function (){      
        that.animation();   
    };

    that.draw = function () {
        that.draw_clean();
        that.draw_pacman();
        that.calculate_mouth_angle();
    };

    that.change_direction = function (direction){
        switch(direction){
            case PACMAN.KEY_UP_CODE:
                bottom_lip = 1.399;
                top_lip = 1.55;
                break;
            case PACMAN.KEY_UP_CODE:
                break;
            case PACMAN.KEY_LEFT_CODE:
                bottom_lip = 0.8499;
                top_lip = 1.05;
                break;
            case PACMAN.KEY_RIGHT_CODE:
                bottom_lip = 1.899;
                top_lip = 0.05;
                break;
        }
    }

    /**
     * Increase Pacman mouth angle 5 times and reduce the angle 3 times to 
     * create the biting movement if stop variable is equals to true it won't
     * do anything
     * http://www.w3schools.com/tags/canvas_arc.asp
     */
    that.calculate_mouth_angle = function () {
        if (stop) return;
        increase_mouth_angle = increase_mouth_angle % 10;

        if (increase_mouth_angle < 5) { 
            bottom_lip -= 0.05;
            top_lip += 0.05;
        }
        else {
            bottom_lip += 0.05
            top_lip -= 0.05;
        }

        increase_mouth_angle += 1;
    };

    /**
     * Set a black square to clean up the last draw
     */
    that.draw_clean = function () {
        ctx.fillStyle = PACMAN.BLACK;
        ctx.beginPath();
        ctx.rect(ini_pos_x, ini_pos_y, size, size);
        ctx.fill();
    };

    /**
     * Draw Pacman
     */
    that.draw_pacman = function () {
        ctx.fillStyle = PACMAN.YELLOW;
        ctx.beginPath();        
            ctx.moveTo(ini_pos_x + radius, ini_pos_y + radius);
            ctx.arc(ini_pos_x + radius, ini_pos_y + radius, radius, 
                Math.PI * bottom_lip, Math.PI * top_lip, CLOCKWISE);         
        ctx.fill();
    };

    that.animation = function (){
        setInterval(that.draw,50);
    };

    constructor();
    return that;
}
