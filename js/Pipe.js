(function (window) {
    function Pipe(imgPipe) {
        this.initialize(imgPipe);
    }


    Pipe.prototype = new createjs.Sprite();
    // constructors:
    Pipe.prototype.Sprite_initialize = Pipe.prototype.initialize;	//unique to avoid overiding base class
    // public methods:
    Pipe.prototype.initialize = function (imgPipe) {
        var spriteSheet = new createjs.SpriteSheet({
            images: [imgPipe]
        });
        this.constructor(spriteSheet);
    }
    window.Pipe = Pipe;
}
(window));
