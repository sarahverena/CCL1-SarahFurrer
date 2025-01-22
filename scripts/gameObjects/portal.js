import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { displayGameOverScreen, displayWinScreen, setupGame1 } from "../modules/main.js";


class Portal extends BaseGameObject {
    blockGravityForces = false;

    reactToCollision = function (collidingObject)   {
       /* if (collidingObject.name == "Skeleton") {
            displayGameOverScreen();
        }*/
		if(collidingObject.name == "Skeleton" && global.currentItems >= 4){
	        global.currentLevel++;
            if(global.currentLevel == 1){
                setupGame1();
            }
            else if(global.currentLevel == 2){
                displayWinScreen();
            
            }
        }
    }

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 80,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/portal2.png"]);
    }
}

export {Portal};