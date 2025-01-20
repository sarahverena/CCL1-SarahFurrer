import { Weapon } from "../gameObjects/weapon.js";
import { global } from "./global.js";





function move(event) {
    console.log(global.playerObject.TurningRight, global.playerObject.xVelocity);
    //Example Movement for the PacMan Game
    switch(event.key) {
        case "d":
            if (global.playerObject.TurningRight == false || global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(27, 35); 
            global.playerObject.xVelocity = 200;
            global.playerObject.yVelocity = 0;
            global.playerObject.TurningRight = true;
            console.log("velocity set");
            break;
        case "a":   
            if (global.playerObject.TurningRight == true || global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(9, 17);
            global.playerObject.xVelocity = -200;
            global.playerObject.yVelocity = 0;
            global.playerObject.TurningRight = false;
            break;
        case "w":
            global.playerObject.setJumpForce(.8);
            break;

       /* case "s":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 100;
            global.playerObwject.switchCurrentSprites(3, 5);
            break; */
    }
}

function stop(event) {
    switch(event.key) {
        case "d":
            if (global.playerObject.xVelocity == 200) {
                global.playerObject.xVelocity = 0;
            }
            break;
        case "a":
            if (global.playerObject.xVelocity == -200) {
                global.playerObject.xVelocity = 0;
            }
            break;   

    }
        
        
}


document.addEventListener("keydown", (event) => {
    if (event.key === ' ') {
       global.playerObject.WeaponShooting();

    }

    
      
   
  });

  
/*document.addEventListener("keyup", (event) => {
    if (event.key === ' ') {
      global.weapon.active = false; 
    }
  });
*/






document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);

