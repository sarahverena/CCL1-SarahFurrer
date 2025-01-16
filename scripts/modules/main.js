import { global, resetGlobals } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";
import { Spider } from "../gameObjects/spider.js"; 
import  {Heart} from "../gameObjects/heart.js";
import { Portal } from "../gameObjects/portal.js";

//restart game button 
let gameOverButton = document.getElementById("gameOverButton");
gameOverButton.addEventListener("click", setupGame);

function displayGameOverScreen() {
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "flex";

}

let startGameButton = document.getElementById("startGameButton");
startGameButton.addEventListener("click", () => {
    let startGameScreen = document.getElementById("startGameScreen")
    startGameScreen.style.display = "none";
    setupGame();
});


function startGameScreen() {
    let startGameScreen = document.getElementById("startGameScreen")
    startGameScreen.style.display = "none";
}



function gameLoop(totalRunningTime) {
    if (global.playerObject.currentHealth <= 0) {
        displayGameOverScreen();
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
    resetGlobals();
    

    global.playerObject = new Skeleton(0, 400, 64, 64);
    global.leftMoveTrigger = new MoveTrigger(-10, 100, 20, 900, 100);
    global.rightMoveTrigger = new MoveTrigger(800, 100, 20, 900, -100);
    new Floor(0, 400, 9000, 40);
    new BlockObject(200, 280, 50, 50);
    new BlockObject(400, 200, 50, 50);
    new Heart (400, 200, 50, 50);
    new Spider(400, 200, 50, 50);
    new Portal(1200, 350, 50, 50);
    
    
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

setupGame();

console.log(gameLoop);

export{setupGame,displayGameOverScreen}; 





