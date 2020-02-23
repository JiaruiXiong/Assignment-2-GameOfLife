var AM = new AssetManager();





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

    // this.gosperGunButton = document.getElementById("Gosper");


    this.gosperGun = true;;
    this.simkinGun = false;
    this.pulsar = false;
    this.random = false;
    this.clean = false;
    this.color = false;
    //Gosper Glider Gun
    // this.grid = makeGosperGliderGun(this.cols, this.rows);

    // Simkin glider Gun
    // this.grid = makeSimkinGliderGun(this.cols,this.rows);

    // Pulsar 
    // this.grid = makePulsar(this.cols,this.rows);


    // random grid
    // this.grid = makeRandom(this.cols, this.rows);
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
                if (this.color) {
                    this.ctx.fillStyle = generateRandomColor();
                }
                else{
                    this.ctx.fillStyle = 'White'; 
                }
                this.ctx.fillRect(x,y,this.resolution-1, this.resolution-1);
            }
        }
    }
}



GameLife.prototype.update = function () {

    var firstButton = document.getElementById("Gosper");
    var secondButton = document.getElementById("Simkin");
    var thirdButton = document.getElementById("Pulsar");
    var fourthButton = document.getElementById("Random");
    var fifthButton = document.getElementById("Colorful");
    // this.gosperGun = true;

    // firstButton.onclick = function changeShape() {
    //     if (this.gosperGun){
    //         this.gosperGun = true;
    //     }
    //     else {
    //         this.gosperGun = false;
    //     }
    // }

    // console.log(this.color);
    fifthButton.onclick = function changeContent() {
        
        if (this.color) {
            fifthButton.innerText = 'White Cell';
            // console.log(this.color);
            this.color = false;
        }
        else {
            fifthButton.innerText = 'Color Cell';
            // console.log(this.color);
            this.color = true;
        }
        
    }

    // console.log("hah");
    let next = make2DArray(this.cols, this.rows);
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          let state = this.grid[i][j];
        //   console.log(state);
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
    
    if (this.gosperGun) {
        this.grid = makeGosperGliderGun(this.cols, this.rows);
        this.gosperGun = false;
    }
    else if (this.simkinGun) {
        this.grid = makeSimkinGliderGun(this.cols, this.rows);
        this.simkinGun = false;
    }
    else if (this.pulsar) {
        this.grid = makePulsar(this.cols,this.rows);
        this.pulsar = false;
    }
    else if (this.random) {
        this.grid = makeRandom(this.cols, this.rows);
        this.random = false;
    }

    if (this.clean) {
        this.grid = make2DArray(this.cols, this.rows);
    }
    // else{
    //     this.grid = make2DArray(this.cols,this.rows);
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




function makeGosperGliderGun(cols,rows) {
    var grid = make2DArray(cols,rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
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
                    grid[i][j] = 1;
            }
            else {
                grid[i][j] = 0;
            }
            // this.grid[i][j] =1//Math.floor(Math.random() * 2);
        }
    }
    return grid;
}

function makeSimkinGliderGun(cols,rows){
    var grid = make2DArray(cols,rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++){
            if (    // first part of Simkin Glinder Gun
                    (i === 21 && j === 21)
                ||  (i === 21 && j === 22)
                ||  (i === 22 && j === 21)
                ||  (i === 22 && j === 22)

                ||  (i === 26 && j === 21)
                ||  (i === 26 && j === 22)
                ||  (i === 27 && j === 21)
                ||  (i === 27 && j === 22)

                ||  (i === 25 && j === 24)
                ||  (i === 25 && j === 25)
                ||  (i === 26 && j === 24)
                ||  (i === 26 && j === 25)


                // second part
                ||  (i === 43 && j === 30)
                ||  (i === 44 && j === 30)
                ||  (i === 46 && j === 30)
                ||  (i === 47 && j === 30)
                ||  (i === 42 && j === 31)
                ||  (i === 42 && j === 32)
                ||  (i === 42 && j === 33)
                ||  (i === 43 && j === 33)
                ||  (i === 44 && j === 33)
                ||  (i === 48 && j === 31)
                ||  (i === 49 && j === 32)
                ||  (i === 48 && j === 33)
                ||  (i === 47 && j === 34)


                // third part
                ||  (i === 52 && j === 32)
                ||  (i === 53 && j === 32)
                ||  (i === 52 && j === 33)
                ||  (i === 53 && j === 33)

                // fourth part
                ||  (i === 42 && j === 38)
                ||  (i === 41 && j === 38)
                ||  (i === 41 && j === 39)
                ||  (i === 42 && j === 40)
                ||  (i === 43 && j === 40)
                ||  (i === 44 && j === 40)
                ||  (i === 44 && j === 41)

                ) {
                    grid[i][j] = 1;
            }
            else{
                grid[i][j] =0;
            }
        }
    }
    return grid;
}


function makePulsar(cols, rows){
    var grid = make2DArray(cols,rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
          if (  // first part
                ( i === 17 && j === 15) 
            ||  ( i === 18 && j === 15)
            ||  ( i === 19 && j === 15)
            ||  ( i === 15 && j === 17) 
            ||  ( i === 15 && j === 18)
            ||  ( i === 15 && j === 19)
            ||  ( i === 20 && j === 17) 
            ||  ( i === 20 && j === 18)
            ||  ( i === 20 && j === 19)
            ||  ( i === 19 && j === 20) 
            ||  ( i === 18 && j === 20)
            ||  ( i === 17 && j === 20)
            // second part
            ||  ( i === 22 && j === 17)
            ||  ( i === 22 && j === 18)
            ||  ( i === 22 && j === 19) 
            ||  ( i === 23 && j === 15)
            ||  ( i === 24 && j === 15)
            ||  ( i === 25 && j === 15) 
            ||  ( i === 27 && j === 17)
            ||  ( i === 27 && j === 18)
            ||  ( i === 27 && j === 19) 
            ||  ( i === 25 && j === 20)
            ||  ( i === 24 && j === 20)
            ||  ( i === 23 && j === 20)
            // THIRD part
            ||  ( i === 23 && j === 22)
            ||  ( i === 24 && j === 22)
            ||  ( i === 25 && j === 22) 
            ||  ( i === 22 && j === 23)
            ||  ( i === 22 && j === 24)
            ||  ( i === 22 && j === 25) 
            ||  ( i === 23 && j === 27)
            ||  ( i === 24 && j === 27)
            ||  ( i === 25 && j === 27) 
            ||  ( i === 27 && j === 25)
            ||  ( i === 27 && j === 24)
            ||  ( i === 27 && j === 23)

            // fourth part
            ||  ( i === 20 && j === 23)
            ||  ( i === 20 && j === 24)
            ||  ( i === 20 && j === 25) 
            ||  ( i === 19 && j === 22)
            ||  ( i === 18 && j === 22)
            ||  ( i === 17 && j === 22) 
            ||  ( i === 15 && j === 23)
            ||  ( i === 15 && j === 24)
            ||  ( i === 15 && j === 25) 
            ||  ( i === 17 && j === 27)
            ||  ( i === 18 && j === 27)
            ||  ( i === 19 && j === 27)



                // first part
            ||  ( i === 37 && j === 15) 
            ||  ( i === 38 && j === 15)
            ||  ( i === 39 && j === 15)
            ||  ( i === 35 && j === 17) 
            ||  ( i === 35 && j === 18)
            ||  ( i === 35 && j === 19)
            ||  ( i === 40 && j === 17) 
            ||  ( i === 40 && j === 18)
            ||  ( i === 40 && j === 19)
            ||  ( i === 39 && j === 20) 
            ||  ( i === 38 && j === 20)
            ||  ( i === 37 && j === 20)
            // second part
            ||  ( i === 42 && j === 17)
            ||  ( i === 42 && j === 18)
            ||  ( i === 42 && j === 19) 
            ||  ( i === 43 && j === 15)
            ||  ( i === 44 && j === 15)
            ||  ( i === 45 && j === 15) 
            ||  ( i === 47 && j === 17)
            ||  ( i === 47 && j === 18)
            ||  ( i === 47 && j === 19) 
            ||  ( i === 45 && j === 20)
            ||  ( i === 44 && j === 20)
            ||  ( i === 43 && j === 20)
            // THIRD part
            ||  ( i === 43 && j === 22)
            ||  ( i === 44 && j === 22)
            ||  ( i === 45 && j === 22) 
            ||  ( i === 42 && j === 23)
            ||  ( i === 42 && j === 24)
            ||  ( i === 42 && j === 25) 
            ||  ( i === 43 && j === 27)
            ||  ( i === 44 && j === 27)
            ||  ( i === 45 && j === 27) 
            ||  ( i === 47 && j === 25)
            ||  ( i === 47 && j === 24)
            ||  ( i === 47 && j === 23)

            // fourth part
            ||  ( i === 40 && j === 23)
            ||  ( i === 40 && j === 24)
            ||  ( i === 40 && j === 25) 
            ||  ( i === 39 && j === 22)
            ||  ( i === 38 && j === 22)
            ||  ( i === 37 && j === 22) 
            ||  ( i === 35 && j === 23)
            ||  ( i === 35 && j === 24)
            ||  ( i === 35 && j === 25) 
            ||  ( i === 37 && j === 27)
            ||  ( i === 38 && j === 27)
            ||  ( i === 39 && j === 27)

             // first part 
            ||  ( i === 57 && j === 15) 
            ||  ( i === 58 && j === 15)
            ||  ( i === 59 && j === 15)
            ||  ( i === 55 && j === 17) 
            ||  ( i === 55 && j === 18)
            ||  ( i === 55 && j === 19)
            ||  ( i === 60 && j === 17) 
            ||  ( i === 60 && j === 18)
            ||  ( i === 60 && j === 19)
            ||  ( i === 59 && j === 20) 
            ||  ( i === 58 && j === 20)
            ||  ( i === 57 && j === 20)
            // second part
            ||  ( i === 62 && j === 17)
            ||  ( i === 62 && j === 18)
            ||  ( i === 62 && j === 19) 
            ||  ( i === 63 && j === 15)
            ||  ( i === 64 && j === 15)
            ||  ( i === 65 && j === 15) 
            ||  ( i === 67 && j === 17)
            ||  ( i === 67 && j === 18)
            ||  ( i === 67 && j === 19) 
            ||  ( i === 65 && j === 20)
            ||  ( i === 64 && j === 20)
            ||  ( i === 63 && j === 20)
            // THIRD part
            ||  ( i === 63 && j === 22)
            ||  ( i === 64 && j === 22)
            ||  ( i === 65 && j === 22) 
            ||  ( i === 62 && j === 23)
            ||  ( i === 62 && j === 24)
            ||  ( i === 62 && j === 25) 
            ||  ( i === 63 && j === 27)
            ||  ( i === 64 && j === 27)
            ||  ( i === 65 && j === 27) 
            ||  ( i === 67 && j === 25)
            ||  ( i === 67 && j === 24)
            ||  ( i === 67 && j === 23)

            // fourth part
            ||  ( i === 60 && j === 23)
            ||  ( i === 60 && j === 24)
            ||  ( i === 60 && j === 25) 
            ||  ( i === 59 && j === 22)
            ||  ( i === 58 && j === 22)
            ||  ( i === 57 && j === 22) 
            ||  ( i === 55 && j === 23)
            ||  ( i === 55 && j === 24)
            ||  ( i === 55 && j === 25) 
            ||  ( i === 57 && j === 27)
            ||  ( i === 58 && j === 27)
            ||  ( i === 59 && j === 27)
          ) {
              grid[i][j] = 1;
          }
          else {
              grid[i][j] = 0;
          }
      }
    }
    return grid;
}

function makeRandom(cols, rows) {
    var grid = make2DArray(cols,rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
      }
    }
    return grid;
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




















// 狗熊做的 Gosper Glider Gun

    //randomize 0 or 1 in the grid
    // for (let i = 0; i < this.cols; i++) {
    //     for (let j = 0; j < this.rows; j++) {
    //         if (    // 2*2 left square
    //                 (i === 40 && j === 5)
    //             ||  (i === 41 && j === 5)
    //             ||  (i === 40 && j === 6)
    //             ||  (i === 41 && j === 6)

    //                 // second part of glider gun
    //             ||  (i === 51 && j === 3)
    //             ||  (i === 51 && j === 4)
    //             ||  (i === 51 && j === 8)
    //             ||  (i === 51 && j === 9)
    //             ||  (i === 53 && j === 4)
    //             ||  (i === 53 && j === 8)
    //             ||  (i === 54 && j === 5)
    //             ||  (i === 54 && j === 6)
    //             ||  (i === 54 && j === 7)
    //             ||  (i === 55 && j === 5)
    //             ||  (i === 55 && j === 6)
    //             ||  (i === 55 && j === 7)
                
    //             // third part of glider gun
    //             ||  (i === 58 && j === 8)
    //             ||  (i === 59 && j === 7)
    //             ||  (i === 59 && j === 8)
    //             ||  (i === 59 && j === 9)
    //             ||  (i === 60 && j === 6)
    //             ||  (i === 60 && j === 10)
    //             ||  (i === 61 && j === 8)
    //             ||  (i === 62 && j === 5) 
    //             ||  (i === 63 && j === 5) 
    //             ||  (i === 62 && j === 11)
    //             ||  (i === 63 && j === 11)
    //             ||  (i === 64 && j === 6)
    //             ||  (i === 64 && j === 10)
    //             ||  (i === 65 && j === 7)
    //             ||  (i === 65 && j === 8) 
    //             ||  (i === 65 && j === 9)

    //             // fourth part of glider gun
    //             ||  (i === 74 && j === 7) 
    //             ||  (i === 74 && j === 8) 
    //             ||  (i === 75 && j === 7) 
    //             ||  (i === 75 && j === 8) 

    //             // second gun
    //             ||  (i === 1 && j === 5)
    //             ||  (i === 2 && j === 5)
    //             ||  (i === 1 && j === 6)
    //             ||  (i === 2 && j === 6)

    //                 // second part of 2nd glider gun
    //             ||  (i === 11 && j === 5)
    //             ||  (i === 11 && j === 6)
    //             ||  (i === 11 && j === 7)
    //             ||  (i === 12 && j === 4)
    //             ||  (i === 12 && j === 8)
    //             ||  (i === 13 && j === 3)
    //             ||  (i === 14 && j === 3)
    //             ||  (i === 13 && j === 9)
    //             ||  (i === 14 && j === 9)
    //             ||  (i === 15 && j === 6)
    //             ||  (i === 16 && j === 4)
    //             ||  (i === 16 && j === 8)
    //             ||  (i === 17 && j === 5)
    //             ||  (i === 17 && j === 6)
    //             ||  (i === 17 && j === 7)
    //             ||  (i === 18 && j === 6)

                
    //             // third part of 2nd glider gun
    //             ||  (i === 21 && j === 5)
    //             ||  (i === 21 && j === 4)
    //             ||  (i === 21 && j === 3)
    //             ||  (i === 22 && j === 5)
    //             ||  (i === 22 && j === 4)
    //             ||  (i === 22 && j === 3)
    //             ||  (i === 23 && j === 2)
    //             ||  (i === 23 && j === 6) 
    //             ||  (i === 25 && j === 1) 
    //             ||  (i === 25 && j === 2)
    //             ||  (i === 25 && j === 6)
    //             ||  (i === 25 && j === 7)
    

    //             // fourth part of 2nd glider gun
    //             ||  (i === 35 && j === 3) 
    //             ||  (i === 35 && j === 4) 
    //             ||  (i === 36 && j === 3) 
    //             ||  (i === 36 && j === 4) 


                
    //             ) {
    //                 this.grid[i][j] = 1;

    //         }
    //         else {
    //             this.grid[i][j] = 0;
    //         }
    //         // this.grid[i][j] =1//Math.floor(Math.random() * 2);
    //     }
    // }