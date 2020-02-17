// let grid;
// let cols;
// let rows;
// let resolution = 10;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < rows; j++) {
      }
    }
    return arr;
}
  
function Life(game, width, height) {
    // console.log("Constructor");
    this.width = width;                                     // checked
    this.height = height;                                   // checked
    this.game = game;
    this.ctx = this.game.ctx;
    this.resolution = 10;                                   // checked

    this.cols = this.width/ this.resolution;                // checked
    this.rows = this.height/ this.resolution;               // checked

    this.grid = make2DArray(this.cols,this.rows);

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = Math.floor(Math.random(2) * 2);   // checked
      }
    }
    // console.log(this.grid);
    Entity.call(this, game,0,400);
  
  }
Life.prototype = new Entity();
Life.prototype.constructor = Life;
  
Life.prototype.draw = function() {                                      
  this.ctx.strokeRect(12,12,100,100);

    // for (let i = 0; i < this.cols; i++) {
    //   for (let j = 0; j < this.rows; j++) {
    //     let x = i * this.resolution;
    //     let y = j * this.resolution;
    //     if (this.grid[i][j] === 1) {   
    //         // this.ctx.lineWidth = "2";
    //         // this.ctx.strokeStyle = "red";
    //         this.ctx.fillRect(x,y,this.resolution-1,this.resolution-1);
    //         // this.ctx.rect(x,y,this.resolution-1,this.resolution-1);
    //         // this.ctx.stroke();
    //     }
    //   }
    // }
    // 下一个grid (更新之后)
    let next = make2DArray(this.cols, this.rows);
    
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let state = this.grid[i][j];
        
          // count live neighbors!
        
        //   let sum = 0; // 目前不需要
          let neighbors = countNeighbors(this.grid, i,j,this.cols, this.rows);
  
        
          if (state == 0 && neighbors  == 3) {
            next[i][j] = 1;
         
          }
          else if (  state == 1 && (neighbors <2 || neighbors > 3)) {
            next[i][j] = 0;
          }
          else {
            next[i][j] = state;
          }  
      }
    }
    this.grid = next; 
  
  }




Life.prototype.update = function () {

}

function countNeighbors(grid, x, y, cols, rows) {
    let sum = 0;
    for (let i = -1; i <2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x+i+this.cols) % cols;
        let row = (y+j+this.rows) % rows;
        
        sum += grid[col][row];
      } 
    }
    sum -= grid[x][y];
    return sum;
  }





var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up my game of life");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var myLife = new Life(gameEngine, canvas.width, canvas.height);
    gameEngine.addEntity(myLife);

    gameEngine.init(ctx);
    gameEngine.start();
});
  