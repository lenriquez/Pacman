
PACMAN.UI.Blinky = function(ctx, spec){
    spec.s    = 18;
    spec.top  = 8 * PACMAN.SIZE;
    spec.left = 9 * PACMAN.SIZE;
    spec.color = PACMAN.RED;
    that = PACMAN.UI.Ghost(ctx,spec);    
};
