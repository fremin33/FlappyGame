(function (window) {
    function Bird(imgBird) {
        this.initialize(imgBird);
    }


    Bird.prototype = new createjs.Sprite();
    // constructors:
    Bird.prototype.Sprite_initialize = Bird.prototype.initialize;	//unique to avoid overiding base class
    // public methods:
    Bird.prototype.initialize = function (imgBird) {
        var spriteSheet = new createjs.SpriteSheet({
            images: [imgBird],
            frames: { width: 55, height: 39 },
            animations: {
                down: [0, 0, "stay", 0.4],
                stay: [1, 1, "down", 0.4],
                up: [2, 2, "stay", 0.4]
            }
        });
        this.constructor(spriteSheet);
    }
    window.Bird = Bird;
}
    (window));	
