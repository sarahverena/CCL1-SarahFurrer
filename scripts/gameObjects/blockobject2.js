import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject2 extends BaseGameObject {
    name = "Blocksi";
    blockGravityForces = true;
    containsHeart = false; 

    ContainsHeart = function(collidingObject){
        if(collidingObject.name == "Heart"){
            this.containsHeart = true;
        }
    }

    checkBubblePop = function(player) {
        if (this.containsHeart && player.physicsData.fallVelocity < 0) {
            
            this.active = false; 
            
        }
    };

    reactToCollision = function (collidingObject)   {
        this.ContainsHeart(collidingObject);
        if (collidingObject.name == "Skeleton") {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/blocksi.png"]);
    }
}

export {BlockObject2};