window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() {
    this.entities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    // this.startInput(); // 设置buttons
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');

    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 800) {
            x = Math.floor(x / 40);
            y = Math.floor(y / 40);
        }

        return { x: x, y: y };
    }

    var that = this;

    // event listeners are added here

    this.ctx.canvas.addEventListener("click", function (e) {
        that.click = getXandY(e);
        //console.log(e);
        console.log("Left Click Event - X,Y " + e.clientX + ", " + e.clientY);
        // debugger;
        that.menu = getSelectedThing(e, that, true);
        //console.log(that.menu.id);
        that.lane = getSelectedLane(e, that);
    }, false);

    this.ctx.canvas.addEventListener("mousemove", function (e) {
        //that.mouse = {x : e.clientX, y : e.clientY};
        that.mouseXY = {x : e.clientX, y : e.clientY};
        that.menu = getSelectedThing(e, that, false);
        //console.log("X,Y " + e.clientX, e.clientY);
    }, false);

    // this.ctx.canvas.addEventListener("mouseover", function (e) {
    //     //that.menu = getSelectedThing(e, that, false);
    //     //console.log("mouse over " + that.mouseOver.id);
    //     //console.log("X,Y " + e.clientX, e.clientY);
    // }, false);


    console.log('Input started');
}


// function getSelectedThing(e, that, click){

//     if ((e.clientX >= 610 && e.clientX <= 765) && (e.clientY >= 502 && e.clientY <= 555) && MAIN_MENU) {
//         if (click){
//             that.menu = { clicked: true, id: "easy", mousemove: false };
//             MAIN_MENU = false;
//         } else {
//             that.menu = { clicked: false, id: "easy", mousemove: true };
//         }
//     } else if ((e.clientX >= 602 && e.clientX <= 863) && (e.clientY >= 579 && e.clientY <= 629) && MAIN_MENU) {
//         if (click){
//             that.menu = { clicked: true, id: "medium", mousemove: false };
//             MAIN_MENU = false;
//         } else {
//             that.menu = { clicked: false, id: "medium", mousemove: true };
//         }
//     } else if ((e.clientX >= 603 && e.clientX <= 777) && (e.clientY >= 649 && e.clientY <= 699) & MAIN_MENU) {
//         if (click){
//             that.menu = { clicked: true, id: "hard", mousemove: false };
//             MAIN_MENU = false;
//         } else {
//             that.menu = { clicked: false, id: "hard", mousemove: true };
//         }
//     } else if ((e.clientX >= 614 && e.clientX <= 881) && (e.clientY >= 711 && e.clientY <= 771) & MAIN_MENU) {
//         if (click){
//             that.menu = { clicked: true, id: "tutorial", mousemove: false };
//             MAIN_MENU = false;
//         } else {
//             that.menu = { clicked: false, id: "tutorial", mousemove: true };
//         }
//     }  else if ((e.clientX >= 20 && e.clientX <= 182) && (e.clientY >= 12 && e.clientY <= 64)) {
//         if (click){
//             //debugger;
//             that.menu = { clicked: true, id: "back", mousemove: false };
//             //MAIN_MENU = true;
//         } else {
//             that.menu = { clicked: false, id: "back", mousemove: true };
//         }
//     } else if((e.clientX >= 650 && e.clientX <= 790) && (e.clientY >= 685 && e.clientY <= 775) && SELECT_MENU){
//         if (click){
//             //debugger;
//             that.menu = { clicked: true, id: "ok", mousemove: false };
//             console.log(UNIT_CONTROL_CHARACTER);
//         }
//     } else if((e.clientX >= 10 && e.clientX <= 155) && (e.clientY >= 100 && e.clientY <= 265) && SELECT_MENU){
//         if (click){
//             //debugger;
//             if (!UNIT_CONTROL_CHARACTER.includes("1Knight") && UNIT_CONTROL_CHARACTER.length < 4){
//                 UNIT_CONTROL_CHARACTER.push("1Knight");
//             } else {
//                 var index = UNIT_CONTROL_CHARACTER.indexOf("1Knight");
//                 if (index >= 0) {
//                     UNIT_CONTROL_CHARACTER.splice( index, 1 );
//                 }
//             }
//         }
//     } else if((e.clientX >= 810 && e.clientX <= 990) && (e.clientY >= 570 && e.clientY <= 740) && SELECT_MENU){
//         if (click){
//             //debugger;
//             if (!UNIT_CONTROL_CHARACTER.includes("2Mage") && UNIT_CONTROL_CHARACTER.length < 4){
//                 UNIT_CONTROL_CHARACTER.push("2Mage");
//             } else {
//                 var index = UNIT_CONTROL_CHARACTER.indexOf("2Mage");
//                 if (index >= 0) {
//                     UNIT_CONTROL_CHARACTER.splice( index, 1 );
//                 }
//             }
//         }
//     } else if((e.clientX >= 810 && e.clientX <= 975) && (e.clientY >= 328 && e.clientY <= 485) && SELECT_MENU){
//         if (click){
//             if (!UNIT_CONTROL_CHARACTER.includes("3Bandit") && UNIT_CONTROL_CHARACTER.length < 4){
//                 UNIT_CONTROL_CHARACTER.push("3Bandit");
//             } else {
//                 var index = UNIT_CONTROL_CHARACTER.indexOf("3Bandit");
//                 if (index >= 0) {
//                     UNIT_CONTROL_CHARACTER.splice( index, 1 );
//                 }
//             }
//         }
//     } else if((e.clientX >= 10 && e.clientX <= 140) && (e.clientY >= 350 && e.clientY <= 500) && SELECT_MENU){
//         if (click){
//             if (!UNIT_CONTROL_CHARACTER.includes("4Samurai") && UNIT_CONTROL_CHARACTER.length < 4){
//                 UNIT_CONTROL_CHARACTER.push("4Samurai");
//             } else {
//                 var index = UNIT_CONTROL_CHARACTER.indexOf("4Samurai");
//                 if (index >= 0) {
//                     UNIT_CONTROL_CHARACTER.splice( index, 1 );
//                 }
//             }
//         }
//     } else if((e.clientX >= 820 && e.clientX <= 980) && (e.clientY >= 115 && e.clientY <= 260) && SELECT_MENU){
//         if (click){
//             if (!UNIT_CONTROL_CHARACTER.includes("5Goblin")  && UNIT_CONTROL_CHARACTER.length < 4){
//                 UNIT_CONTROL_CHARACTER.push("5Goblin");
//             } else {
//                 var index = UNIT_CONTROL_CHARACTER.indexOf("5Goblin");
//                 if (index >= 0) {
//                     UNIT_CONTROL_CHARACTER.splice( index, 1 );
//                 }
//             }
//         }
//     } else if((e.clientX >= 10 && e.clientX <= 140) && (e.clientY >= 600 && e.clientY <= 755) && SELECT_MENU){
//         if (click){
//             if (!UNIT_CONTROL_CHARACTER.includes("6Archer")  && UNIT_CONTROL_CHARACTER.length < 4){
//                 UNIT_CONTROL_CHARACTER.push("6Archer");
//             } else {
//                 var index = UNIT_CONTROL_CHARACTER.indexOf("6Archer");
//                 if (index >= 0) {
//                     UNIT_CONTROL_CHARACTER.splice( index, 1 );
//                 }
//             }
//         }
//     } else if ((e.clientX >= 421 && e.clientX <= 526) && (e.clientY >= 650 && e.clientY <= 751)) {
//         if (click){
//             that.menu = { clicked: true, id: UNIT_CONTROL_CHARACTER[0], mousemove: false };
//         } else {
//             that.menu = { clicked: false, id: UNIT_CONTROL_CHARACTER[0], mousemove: true };
//         }
//     } else if ((e.clientX >= 539 && e.clientX <= 644) && (e.clientY >= 648 && e.clientY <= 749)) {
//         if (click){
//             that.menu = { clicked: true, id: UNIT_CONTROL_CHARACTER[1], mousemove: false };
//         } else {
//             that.menu = { clicked: false, id: UNIT_CONTROL_CHARACTER[1], mousemove: true };
//         }
//     } else if ((e.clientX >= 660 && e.clientX <= 764) && (e.clientY >= 647 && e.clientY <= 748)) {
//         if (click){
//             that.menu = { clicked: true, id: UNIT_CONTROL_CHARACTER[2], mousemove: false };
//         } else {
//             that.menu = { clicked: false, id: UNIT_CONTROL_CHARACTER[2], mousemove: true };
//         }
//     } else if ((e.clientX >= 782 && e.clientX <= 884) && (e.clientY >= 646 && e.clientY <= 747)) {
//         if (click){
//             that.menu = { clicked: true, id: UNIT_CONTROL_CHARACTER[3], mousemove: false };
//             MAIN_MENU = false;
//         } else {
//             that.menu = { clicked: false, id: UNIT_CONTROL_CHARACTER[3], mousemove: true };
//         }
//     } else if ((e.clientX >= 904 && e.clientX <= 1010) && (e.clientY >= 647 && e.clientY <= 747)) {
//         if (click){
//             that.menu = { clicked: true, id: "Fireball", mousemove: false };
    
//         } else {
//             that.menu = { clicked: false, id: "Fireball", mousemove: true };
//         }
//     } else if((e.clientX >= 1280 && e.clientX <= 1406) && (e.clientY >= 751 && e.clientY<= 780)){
//         if (click){
//             that.menu = { clicked: true, id: "SoundOnOff", mousemove: false };
//         } 
//     } else if ((e.clientX >= 480 && e.clientX <= 890) && (e.clientY >= 510 && e.clientY <= 580) && (GAME_OVER || WIN_GAME)) {
//         //debugger;
//         if (click){
//             that.menu = { clicked: true, id: "PlayAgain", mousemove: false };
//         }
//     } else if ((e.clientX >= 490 && e.clientX <= 920) && (e.clientY >= 460 && e.clientY <= 530) && WIN_LEVEL) {
//         //debugger;
//         if (click){
//             that.menu = { clicked: true, id: "NextLevel", mousemove: false };
//         }
//     } 
    
//     return that.menu;
// }


GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        entity.update();
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}