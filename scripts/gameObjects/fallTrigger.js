import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { setupGame } from "../modules/main.js";
import { background2 } from "../modules/sound.js";

class FallTrigger extends BaseGameObject {
    backGroundDiv = null;

     draw = function () {
       /*global.ctx.fillRect(this.x, this.y, this.width, this.height);*/
    }

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
			setupGame()
			global.currentLevel--;
			background2.pause()


		}
	}
	
    constructor (x, y, width, height) {
        super(x, y, width, height);
    }
}


export {FallTrigger}