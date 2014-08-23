

PACMAN.UI.Ghost = function(ctx, spec){
    that = {};

    var constructor = function (){
        that.draw();   
    };

    that.draw = function() {
        var s    = spec.s, 
            top  = spec.top,
            left = spec.left
    
        
        var tl = left + s;
        var base = top + s - 3;
        var inc = s / 10;

        var high = 8 % 10 > 5 ? 3  : -3;
        var low  = 8 % 10 > 5 ? -3 : 3;

        ctx.fillStyle = spec.color
        ctx.beginPath();

        ctx.moveTo(left, base);

        ctx.quadraticCurveTo(left, top, left + (s/2),  top);
        ctx.quadraticCurveTo(left + s, top, left+s,  base);
        
        // Wavy things at the bottom
        ctx.quadraticCurveTo(tl-(inc*1), base+high, tl - (inc * 2),  base);
        ctx.quadraticCurveTo(tl-(inc*3), base+low, tl - (inc * 4),  base);
        ctx.quadraticCurveTo(tl-(inc*5), base+high, tl - (inc * 6),  base);
        ctx.quadraticCurveTo(tl-(inc*7), base+low, tl - (inc * 8),  base); 
        ctx.quadraticCurveTo(tl-(inc*9), base+high, tl - (inc * 10), base); 

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

