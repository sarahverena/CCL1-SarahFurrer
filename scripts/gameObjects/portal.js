import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { displayGameOverScreen, setupGame1 } from "../modules/main.js";


class Portal extends BaseGameObject {
    blockGravityForces = true;

    reactToCollision = function (collidingObject)   {
       /* if (collidingObject.name == "Skeleton") {
            displayGameOverScreen();
        }*/
		if(collidingObject.name == "Skeleton"){
				setupGame1();
		}
	 
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/wall.jpg"]);
    }
}

export {Portal};