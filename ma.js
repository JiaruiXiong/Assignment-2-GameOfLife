var AM = new AssetManager();
// What is 'Coolness factor' and emergent properties ???




// no inheritance
function Background(game) {
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    // this.ctx.fillStyle = generateRandomColor(); 
    this.ctx.fillStyle = 'Black';
    this.ctx.fillRect(this.x, this.y, 800, 600);
};

Background.prototype.update = function () {
};




// MushroomDude class
function GameLife(game,width, height) {
    this.width = width;
    this.height = height;
    this.resolution = 10;
    this.cols = this.width / this.resolution;
    this.rows = this.height/ this.resolution;
    this.grid = make2DArray(this.cols, this.rows);
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] =Math.floor(Math.random() * 2);
        }
    }
    this.game = game;
    this.ctx = game.ctx;
}

GameLife.prototype.draw = function () {
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            let x = i * this.resolution;
            let y = j * this.resolution;
            if (this.grid[i][j] === 1) {
                this.ctx.fillStyle = generateRandomColor();
                this.ctx.fillRect(x,y,this.resolution-1, this.resolution-1);
            }
        }
    }
}

GameLife.prototype.update = function () {
    let next = make2DArray(this.cols, this.rows);
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          let state = this.grid[i][j];

          let neighbors = countNeighbors(this.grid, i, j,this.cols, this.rows);
          if (state === 0 && neighbors  === 3) {
            next[i][j] = 1;
         
          }
          else if (  state === 1 && (neighbors <2 || neighbors > 3)) {
            next[i][j] = 0;
          }
          else {
            next[i][j] = state;
          } 
        } 
    }
    if (checkTwoState(this.grid, next)) {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] =Math.floor(Math.random() * 2);
            }
        }
    }
    else {
        this.grid = next;
    }
    
}


function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < rows; j++) {
      }
    }
    return arr;
}

function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
    //random color will be freshly served
}

function countNeighbors(grid, x, y,cols, rows) {
    let sum = 0;
    for (let i = -1; i <2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x+i+cols) % cols;
        let row = (y+j+rows) % rows
        
        sum += grid[col][row];
      } 
    }
    sum -= grid[x][y];
    return sum;
}


function checkTwoState(first, second) {
    for (let i = 0; i < first.length; i++) {
        for (let j = 0; j < first[0].length;j++){
            if (first[i][j] !== second[i][j]) {
                return false;
            }
        }
    }
    return true;
}




AM.queueDownload("./img/RobotUnicorn.png"); // I must download something
// AM.queueDownload("./img/mushroomdude.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new GameLife(gameEngine,canvas.width, canvas.height));


    //gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/RobotUnicorn.png")));

    console.log("All Done!");
});