var play = false;
document.getElementById("play").addEventListener("click", function (event) {
    play = true;
    jouer();
    document.getElementById("game").style.display = "none";

});


var canvas, stage;

//variables des chemins des images
var imgBase, imgPaysage, imgBird, imgPipe, imgGameover;


//variables des objets
var bird, score, gameover, lose, restart;
var pipe = [];
var paysage = [];
var base = [];

var speed = 15;
var fly = false;
var rotation = 0;


//variable permettant de charger les éléments sur la scène
var loaded = 0;

// variables de son
var audio = document.getElementById("audio-fly");
var audioTheme = document.getElementById("audio");


function init() {

    //associate the canvas with the stage
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);


    // Bloc qui defile
    imgBase = new Image();
    imgBase.onload = this.chargement;
    imgBase.src = "img/base.png";

    // Paysage
    imgPaysage = new Image();
    imgPaysage.onload = this.chargement;
    imgPaysage.src = "img/background-day.png";

    // Bird
    imgBird = new Image();
    imgBird.onload = this.chargement;
    imgBird.src = "img/bird.png";

    //Pipe
    imgPipe = new Image();
    imgPipe.onload = this.chargement;
    imgPipe.src = "img/pipe-green.png";

    // Audio
    audioTheme.play();


}


// Intégration des éléments
function integrationElement() {
    // Insertion des paysages
    for (var i = 0; i < 2; ++i) {
        paysage[i] = new createjs.Bitmap(imgPaysage);
        if (i === 0) {
            paysage[i].x = 856;
        }
        stage.addChild(paysage[i]);
    }


    // Insertion des pipes
    for (var i = 0; i < 4; ++i) {
        pipe[i] = new createjs.Bitmap(imgPipe);
        if (i % 2 !== 0) {
            pipe[i].rotation = -180;
            pipe[i].x = pipe[i - 1].x + 300;
        } else {
            if (pipe[i - 1] === undefined) {
                pipe[i].x = 900;

            } else {
                pipe[i].x = pipe[i - 1].x + 200;
            }
        }
        pipe[i].y = getRandomInt(190, 290);
        pipe[i].width = 52;
        pipe[i].height = 320;
        stage.addChild(pipe[i]);
    }

    // Insertion de la base
    for (var i = 0; i < 2; ++i) {
        base[i] = new createjs.Bitmap(imgBase);
        if (i === 0) {
            base[i].x = 856;
        }
        base[i].y = 504;
        stage.addChild(base[i]);
    }


    // Insertion du bird
    bird = new Bird(imgBird);
    bird.x = 350;
    bird.width = 34;
    bird.height = 24;
    stage.addChild(bird);
    bird.gotoAndPlay('stay');


    // Intégration du score
    score = new createjs.Text(0, "110px flappy-font", "white");
    score.x = 420;
    score.y = 10;
    stage.addChild(score);


}

// Gestion défilement background
function defileBackground() {
    paysage.forEach((element) => {
        element.x = element.x - speed;
        if (element.x <= -850) {
            element.x = 856;
        }
    });

    base.forEach((element) => {
        element.x = element.x - speed;
        if (element.x <= -850) {
            element.x = 856;
        }
    });

    pipe.forEach((element) => {
        element.x = element.x - speed;
        if (element.x <= -56) {
            element.x = 956
        }

        if (element.x <= 300 && element.x >= 290) {
            score.text += 1;
        }

        var collision = ndgmr.checkRectCollision(bird, element);
        if (collision) {
            audioTheme.pause();

            gameOver();
        }
    });
}


function chargement(event) {
    loaded += 1;
    if (loaded === 4 && play) {
        jouer();
    }
}


function jouer() {
    integrationElement();
    document.addEventListener('keyup', gestionClick);
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
}

function tick(event) {
    if (play) {
        defileBackground();
        // Gestion de la dessente de l'oiseau
        bird.y += 7;
        createjs.Tween.get(bird).wait(400).to({
            rotation: 15
        }, 500);
        if (fly) {
            fly = false;
            bird.gotoAndPlay('stay');
        }
    }
    if (lose) {
        bird.y += 7;
    }

    if (bird.y > 460 || bird.y < 0) {
        gameOver();
    }

    stage.update(event);
}


function gestionClick(e) {
    if (play) {
        audio.play();
        switch (e.keyCode) {
            case 38:
                flyingup();
                break;
            case 40:
                flyingdown();
                break;
        }
    }
}


function flyingup() {
    if (fly == false) {
        bird.gotoAndStop("up");
        createjs.Tween.get(bird, {
            override: true
        }).to({
            rotation: -20
        }, 500);
        bird.y -= 90;
        fly = true;
    }
}

function flyingdown() {
    if (fly == false) {
        bird.gotoAndStop("down");
        createjs.Tween.get(bird, {
            override: true
        }).to({
            rotation: +20
        }, 500);
        bird.y += 90;
        fly = true;
    }
}


function gameOver() {
    play = false;
    lose = true;
    speed = 0;


    // Affichage du message de fin de partii
    gameover = new createjs.Text('GAME OVER', "110px flappy-font", "black");
    gameover.x = 250;
    gameover.y = 100;
    stage.addChild(gameover);

    restart = new createjs.Text('RESTART', "110px flappy-font", "orange");
    restart.x = 300;
    restart.y = 300;
    stage.addChild(restart);
    // setTimeout(function () {
    createjs.Ticker.removeEventListener("tick", tick);
    // }, 5000);


    restart.addEventListener("click", function (evt) {
        window.name = true;
        window.location.reload()
    });


}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


if (performance.navigation.type == 1 && window.name === 'true') {
    window.name = false;
    play = true;
    document.getElementById("game").style.display = "none";
    chargement();
}

window.onload = init;
