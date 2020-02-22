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




// GameLife class
function GameLife(game,width, height) {
    this.width = width;
    this.height = height;
    this.resolution = 10;
    this.cols = this.width / this.resolution;
    this.rows = this.height/ this.resolution;
    this.grid = make2DArray(this.cols, this.rows);

    //randomize 0 or 1 in the grid
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            if (    // 2*2 left square
                    (i === 40 && j === 5)
                ||  (i === 41 && j === 5)
                ||  (i === 40 && j === 6)
                ||  (i === 41 && j === 6)

                    // second part of glider gun
                ||  (i === 51 && j === 3)
                ||  (i === 51 && j === 4)
                ||  (i === 51 && j === 8)
                ||  (i === 51 && j === 9)
                ||  (i === 53 && j === 4)
                ||  (i === 53 && j === 8)
                ||  (i === 54 && j === 5)
                ||  (i === 54 && j === 6)
                ||  (i === 54 && j === 7)
                ||  (i === 55 && j === 5)
                ||  (i === 55 && j === 6)
                ||  (i === 55 && j === 7)
                
                // third part of glider gun
                ||  (i === 58 && j === 8)
                ||  (i === 59 && j === 7)
                ||  (i === 59 && j === 8)
                ||  (i === 59 && j === 9)
                ||  (i === 60 && j === 6)
                ||  (i === 60 && j === 10)
                ||  (i === 61 && j === 8)
                ||  (i === 62 && j === 5) 
                ||  (i === 63 && j === 5) 
                ||  (i === 62 && j === 11)
                ||  (i === 63 && j === 11)
                ||  (i === 64 && j === 6)
                ||  (i === 64 && j === 10)
                ||  (i === 65 && j === 7)
                ||  (i === 65 && j === 8) 
                ||  (i === 65 && j === 9)

                // fourth part of glider gun
                ||  (i === 74 && j === 7) 
                ||  (i === 74 && j === 8) 
                ||  (i === 75 && j === 7) 
                ||  (i === 75 && j === 8) 

                // second gun
                ||  (i === 1 && j === 5)
                ||  (i === 2 && j === 5)
                ||  (i === 1 && j === 6)
                ||  (i === 2 && j === 6)

                    // second part of 2nd glider gun
                ||  (i === 11 && j === 5)
                ||  (i === 11 && j === 6)
                ||  (i === 11 && j === 7)
                ||  (i === 12 && j === 4)
                ||  (i === 12 && j === 8)
                ||  (i === 13 && j === 3)
                ||  (i === 14 && j === 3)
                ||  (i === 13 && j === 9)
                ||  (i === 14 && j === 9)
                ||  (i === 15 && j === 6)
                ||  (i === 16 && j === 4)
                ||  (i === 16 && j === 8)
                ||  (i === 17 && j === 5)
                ||  (i === 17 && j === 6)
                ||  (i === 17 && j === 7)
                ||  (i === 18 && j === 6)

                
                // third part of 2nd glider gun
                ||  (i === 21 && j === 5)
                ||  (i === 21 && j === 4)
                ||  (i === 21 && j === 3)
                ||  (i === 22 && j === 5)
                ||  (i === 22 && j === 4)
                ||  (i === 22 && j === 3)
                ||  (i === 23 && j === 2)
                ||  (i === 23 && j === 6) 
                ||  (i === 25 && j === 1) 
                ||  (i === 25 && j === 2)
                ||  (i === 25 && j === 6)
                ||  (i === 25 && j === 7)
    

                // fourth part of 2nd glider gun
                ||  (i === 35 && j === 3) 
                ||  (i === 35 && j === 4) 
                ||  (i === 36 && j === 3) 
                ||  (i === 36 && j === 4) 


                
                ) {
                    this.grid[i][j] = 1;

            }
            else {
                this.grid[i][j] = 0;
            }
            // this.grid[i][j] =1//Math.floor(Math.random() * 2);
        }
    }
    this.game = game;
    this.ctx = game.ctx;
}

GameLife.prototype.draw = function () {
    // console.log("fafa");
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            let x = i * this.resolution;
            let y = j * this.resolution;
            if (this.grid[i][j] === 1) {
                // this.ctx.fillStyle = generateRandomColor();
                this.ctx.fillStyle = 'White';
                this.ctx.fillRect(x,y,this.resolution-1, this.resolution-1);
            }
        }
    }
}

GameLife.prototype.update = function () {
    // console.log("hah");
    let next = make2DArray(this.cols, this.rows);
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          let state = this.grid[i][j];
          console.log(state);
          let neighbors = countNeighbors(this.grid, i, j,this.cols, this.rows);
          if (state === 0 && neighbors  === 3) {
            // console.log("haha: "+i,j);
            next[i][j] = 1;
         
          }
          else if ( state === 1 && (neighbors <2 || neighbors > 3)) {
            next[i][j] = 0;
          }
          else {
            next[i][j] = state;
          } 
        } 
    }
    this.grid = next;
    // if (checkTwoState(this.grid, next)) {
    //     for (let i = 0; i < this.cols; i++) {
    //         for (let j = 0; j < this.rows; j++) {
    //             this.grid[i][j] =Math.floor(Math.random() * 2);
    //         }
    //     }
    // }
    // else {
    //     this.grid = next;
    // }
    
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
    // console.log(sum);
    // console.log(cols);
    // console.log(grid[-1][-1]);
    for (let i = -1; i <2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x+i+cols) % cols;
        let row = (y+j +rows) % rows;
        // console.log(col,row);
        sum += grid[col][row];


        // console.log(rol);

      } 
    }
    // console.log(sum);
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