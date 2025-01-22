import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Ceiling extends BaseGameObject {
    name = "Ceiling";
    blockGravityForces = true;



    draw = function () {
    }
    
    constructor (x, y, width, height) {
        super(x, y, width, height);
    }
}

export {Ceiling};