import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Heart } from "./heart.js";
import { displayGameOverScreen } from "../modules/main.js";
import { Weapon} from "./weapon.js";



class Skeleton extends BaseGameObject {
    name = "Skeleton";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;
    currentHealth = 3;
    maxHealth = 20;
    canTakeDamage = true; 
    DamageTimeOut = 1000;
    TurningRight = false; 
    canShoot = true; 
    ShootTimeOut = 1000;
   

    

    

    

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
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
    }

   /* draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.loadImagesFromSpritesheet("../../images/player original.png", 9, 2, 9);
        this.switchCurrentSprites(0,0);
        this.updateHealthDisplay();
        document.getElementById("score-display").innerHTML = "Items:" + global.currentItems;
    }

     updateHealthDisplay = function (){
       let healthContainer = document.getElementById("health-bar");
        healthContainer.innerHTML = "";
        for (let i = 0; i < this.currentHealth; i++){
            let heart = document.createElement("img");
            heart.src = "./images/star.png";
            heart.classList.add("heart");
            healthContainer.appendChild(heart);
        }
    } 

    reactToCollision = function(collidingObject){
        if(collidingObject.name == "Heart"){
            global.currentItems++;
            document.getElementById("score-display").innerHTML = "Items:" + global.currentItems;
        }
        if(collidingObject.name == "Spider"){
            this.takeDamage();
            this.x = this.previousX;
            this.y = this.previousY;

        }

        

    }

    takeDamage = function(){
        if(this.canTakeDamage == true){
            this.currentHealth--;
            this.canTakeDamage = false;
            window.setTimeout(()=>{this.canTakeDamage = true;},this.DamageTimeOut);
        }
        this.updateHealthDisplay();
    }

  
    /*leftright = function(){
        if(this.TurningLeft == true){
            event.key 
        }
    }*/
    
    WeaponShooting = function(){
        if(this.canShoot == true) {
        new Weapon(this.TurningRight == true ? this.x + this.width-15 : this.x + 10 , this.y +20, 30, 30, this.TurningRight); 
        
        this.canShoot = false;
            window.setTimeout(()=>{this.canShoot = true;},this.ShootTimeOut);

        }



    }


    };

    



    

    
    

    








export {Skeleton};