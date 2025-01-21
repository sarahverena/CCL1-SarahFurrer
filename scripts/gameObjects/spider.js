import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Spider extends BaseGameObject {
    name = "Spider";
    xVelocity = 50;
    yVelocity = 0;
    useGravityForces = true;
	movingtoRight = true; 
	directionChangeInterval = 2500;
	lastDirectionChange = Date.now() // already implemented from browser 
	blockGravityForces = true;




    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    
        update = function() { 
			// Move left or right based on direction
			if (this.movingtoRight) {
				this.x += this.xVelocity * global.deltaTime;
			} else {
				this.x -= this.xVelocity * global.deltaTime;
			}
		
			// Change direction every few seconds
			if (Date.now() - this.lastDirectionChange > this.directionChangeInterval) {
				this.movingtoRight = !this.movingtoRight; // Flip direction
				this.lastDirectionChange = Date.now(); // Reset timer
			} 
        // if (this.xVelocity == 0) {
        //     global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        // }

		


    }

	reactToCollision = function(collidingObject){
    

        if(collidingObject.name == "Skeleton"){
            this.x = this.previousX;
            this.y = this.previousY;

        }

        if(collidingObject.name == "Weapon"){
            this.active = false;
        }
	}


    

    /*draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.loadImagesFromSpritesheet("./images/enemy2.png", 2, 1, 2);
		this.switchCurrentSprites(0,1);
    }
}

export {Spider};