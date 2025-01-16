import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Weapon extends BaseGameObject {
    name = "Weapon";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;
	active = true; 
	/*weaponTimeOut = 2000;*/
	weaponTimer = 0; 
	movementSpeed = 350; 

     reactToCollision = function (collidingObject) {
		console.log(collidingObject.name);
    }


    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    }

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;

		if(this.active = true){
			this.weaponTimer += global.deltaTime;
			if(this.weaponTimer > 1){
				this.active = false;
				this.weaponTimer = 0;
			}



	/*if(this.active = true){
		window.setTimeout(()=>{this.active = false;},this.weaponTimeOutTimeOut);
	}*/
			
		}
	
    }

   /* draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height,moveRight) {
        super(x, y, width, height);
        this.loadImages(["./images/weapon.png"]);

		if(moveRight){
			this.xVelocity = this.movementSpeed;  
    	}   
		else{
			this.xVelocity = -this.movementSpeed;
		}
	}

	/*if(this.active = true){
		window.setTimeout(()=>{this.active = false;},this.weaponTimeOutTimeOut);
	}*/
}










export {Weapon};