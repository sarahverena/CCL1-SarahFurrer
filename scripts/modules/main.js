import { global, resetGlobals } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";
import { Spider } from "../gameObjects/spider.js";
import { Heart } from "../gameObjects/heart.js";
import { Portal } from "../gameObjects/portal.js";
import { Ceiling } from "../gameObjects/ceiling.js";
import { FallTrigger } from "../gameObjects/fallTrigger.js";
import { BlockObject2 } from "../gameObjects/blockobject2.js";


function displayStoryScreen() {
    let storyScreen = document.getElementById("storyScreen");
    storyScreen.style.display = "block";
}

let storyButton = document.getElementById("storyButton");
storyButton.addEventListener("click", () => {
    document.getElementById("background").style.backgroundImage = "url(../images/universe.jpg)";
    let storyScreen = document.getElementById("storyScreen");
    storyScreen.style.display = "none";
    setupGame();
})







//restart game button 
let gameOverButton = document.getElementById("gameOverButton");
gameOverButton.addEventListener("click", setupGame);

function displayGameOverScreen() {
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "flex";

}

//winscreen 
let winScreenButton = document.getElementById("winScreenButton");
winScreenButton.addEventListener("click", () => {
    let winScreen = document.getElementById("winScreen");
    winScreen.style.display = "none";
    global.currentLevel = 0;
    startGameScreen();
});

function displayWinScreen() {
    let displayWinScreen = document.getElementById("winScreen")
    displayWinScreen.style.display = "block";
}

//setupGame1();



let startGameButton = document.getElementById("startGameButton");
startGameButton.addEventListener("click", () => {
    let startGameScreen = document.getElementById("startGameScreen")
    startGameScreen.style.display = "none";
    setupGame();
});




function startGameScreen() {
    let startGameScreen = document.getElementById("startGameScreen")
    startGameScreen.style.display = "block";
}



function gameLoop(totalRunningTime) {

    if (global.playerObject.currentHealth <= 0) {
        displayGameOverScreen();
        global.gameRunning = false;
    }
    if (global.currentLevel == 2) {
        displayWinScreen();
        global.gameRunning = false;
    }




    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (!global.gameRunning) {
            global.allGameObjects[i].active = false;
        }
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}


function setupGame() {
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "none";

    document.getElementById("background").style.backgroundImage = "url(../images/universe.jpg)";

    let winScreen = document.getElementById("winScreen");
    winScreen.style.display = "none";
    resetGlobals();
    console.log('seas ' + global.allGameObjects.length);


    global.playerObject = new Skeleton(0, 400, 100, 100);
    global.leftMoveTrigger = new MoveTrigger(-10, 0, 20, 900, 100);
    global.rightMoveTrigger = new MoveTrigger(800, 0, 20, 900, -100);
    new Floor(0, 400, 9000, 40);
    new Ceiling(0, 0, 9000, 10);
    //objekte unten
    new BlockObject2(450, 350, 50, 50);
    new BlockObject2(500, 350, 50, 50);
    new BlockObject2(550, 350, 50, 50);
    new BlockObject2(600, 350, 50, 50);
    new BlockObject2(650, 350, 50, 50);


    //objekte mittig
    new BlockObject2(130, 290, 50, 50);


    //objekte oben 
    new BlockObject2(250, 200, 50, 50);
    new BlockObject2(300, 200, 50, 50);
    new BlockObject2(410, 200, 50, 50);
    new BlockObject2(850, 200, 50, 50);
    new BlockObject2(900, 200, 50, 50);
    new BlockObject2(950, 200, 50, 50);
    new BlockObject2(1000, 200, 50, 50);
    new BlockObject2(1050, 200, 50, 50);

    //others
    new Portal(1680, 265, 200, 200);
    new Spider(550, 200, 80, 80);
    new Heart(600, 200, 50, 50);
    new Heart(530, 200, 50, 50);
    new Heart(250, 150, 50, 50);
    new Heart(410, 200, 50, 50);
    new Heart(950, 150, 50, 50);
    new Spider(900, 200, 80, 80);
    new Spider(1500, 400, 80, 80);
    new Spider(1600, 400, 80, 80);


    // global.weapon = new Weapon(global.playerObject.x + 30, global.playerObject.y, 40, 40);
    // global.weapon = new Weapon(100, 300, 70, 70); 

    //new BlockObject(300, 400, 50, 50);
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 
    /*    
                global.playerObject = new PacMan(200, 300, 60, 60);
                new Wall(0, 0, 100, 100);
                new Candy(100, 100, 100, 100);
    }*/
    requestAnimationFrame(gameLoop);
}

function setupGame1() {
    document.getElementById("background").style.backgroundImage = "url(../images/wolkenbackground.png)";
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "none";
    resetGlobals();



    global.playerObject = new Skeleton(0, 400, 100, 100);
    global.leftMoveTrigger = new MoveTrigger(-10, 0, 20, 900, 100);
    global.fallTrigger = new FallTrigger(0, 700, 9000, 40);
    global.rightMoveTrigger = new MoveTrigger(800, 0, 20, 900, -100);
      
    new Ceiling(0, 0, 9000, 10);
    //objekte unten
    //new BlockObject(450, 350, 50, 50);
    new BlockObject(500, 450, 50, 50);
    new BlockObject(550, 450, 50, 50);
    new BlockObject(600, 450, 50, 50);
    
    new BlockObject(950, 400, 50, 50);
    new BlockObject(800, 450, 50, 50);
    new BlockObject(850, 450, 50, 50);
    new BlockObject(750, 250, 50, 50);
    new BlockObject(0, 400, 50, 50);
    new BlockObject(50, 350, 50, 50);
    new BlockObject(100, 300, 50, 50);
    new BlockObject(150, 250, 50, 50);
    new BlockObject(200, 200, 50, 50);
    new BlockObject(250, 150, 50, 50);
    new BlockObject(200, 300, 50, 50);
    new BlockObject(250, 300, 50, 50);
    new BlockObject(300, 300, 50, 50);
    new BlockObject(350, 300, 50, 50);
    new BlockObject(400, 300, 50, 50);
    new BlockObject(450, 300, 50, 50);
    new BlockObject(500, 300, 50, 50);
    new BlockObject(550, 300, 50, 50);
    new BlockObject(600, 300, 50, 50);
    new BlockObject(1200, 300, 50, 50);
    new BlockObject(1250, 300, 50, 50);
    new BlockObject(1300, 300, 50, 50);
    new BlockObject(1350, 300, 50, 50);
    new BlockObject(1400, 300, 50, 50);
    new BlockObject(1450, 300, 50, 50);
    
    new BlockObject(1600, 350, 50, 50);
    new BlockObject(1650, 350, 50, 50);
    new BlockObject(1700, 350, 50, 50)
    new BlockObject(1750, 350, 50, 50);
    


    
    new Spider(1300, 250, 80, 80);
    new Heart(1380, 250, 50, 50)
   
    
    //objekte mittig
    



    //objekte oben 

    new BlockObject(410, 200, 50, 50);
    
    
   
    new BlockObject(950, 200, 50, 50);
    new BlockObject(1000, 200, 50, 50);
    new BlockObject(1050, 200, 50, 50);

    
    //others
    new Portal(1670, 227, 150, 150);
    new Spider(550, 200, 80, 80);
    new Heart(600, 200, 50, 50);
    new Heart(530, 200, 50, 50);
    new Heart(250, 150, 50, 50);
    
    new Heart(950, 150, 50, 50);
    new Spider(900, 200, 80, 80);
    new Spider(1500, 400, 80, 80);
    new Spider(1600, 400, 80, 80);
    new Heart(550, 400, 50, 50);

    // global.weapon = new Weapon(global.playerObject.x + 30, global.playerObject.y, 40, 40);
    // global.weapon = new Weapon(100, 300, 70, 70); 

    //new BlockObject(300, 400, 50, 50);
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 
    /*    
                global.playerObject = new PacMan(200, 300, 60, 60);
                new Wall(0, 0, 100, 100);
                new Candy(100, 100, 100, 100);
    }*/
    requestAnimationFrame(gameLoop);
}


//setupGame();

console.log(gameLoop);

export { setupGame, displayGameOverScreen, setupGame1, displayWinScreen, displayStoryScreen };





