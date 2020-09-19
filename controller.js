//const SQUARE_SIZE = 10;

/*$(document).ready(function() {
    const canvas = document.querySelector('canvas'); 
    const ctx = canvas.getContext('2d'); 
    ctx.fillStyle = 'green'; 
    ctx.fillRect(0, 0, 300, 500);
    //while(true) {mainLoop();}
});

function mainLoop() {
    const canvas = document.querySelector('canvas'); 
    const ctx = canvas.getContext('2d'); 
    ctx.fillStyle = 'green'; 
    ctx.fillRect(0, 0, 300, 500);
}

function drawGrid(int[][] gridArray) {
    
    for(int row=0; row<gridArray.Count(); row++) {
        for(int col=0; col<gridArray[row].Count(); col++) {
            drawSquare(row * SQUARE_SIZE, col * SQUARE_SIZE, gridArray[row][col]);
        }
    }
}

function drawSquare(int x, int y, String color) {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
}*/

var canvas, ctx, x, last, timer, row, col, deadBlocks, currentrow, currentcol;

$(document).ready(function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    x = 0;
    timer = 0;
    row = 15;
    col = 7;
    deadBlocks = [];
    last = performance.now();
    requestAnimationFrame(draw);
});



function draw(timestamp) {
    
    
    requestAnimationFrame(draw);
    
    timer += timestamp - last;
       
  if((row<25) && (checkfull() == false)){
      //console.log("checkfull false");
    if(timer >= 500) {
        timer = 0;
        drawBlocks();
        row++;
    } 
  }
  else{
    deadBlocks.push({x:col, y:row-1});
      
    x = 0;
    timer = 0;
    row = 0;
    col = 7;
      
  }
   
    x += (timestamp - last) / 10;
    last = timestamp; 
}

function checkfull(){                   //loop through every block
    for(var k=0;k<deadBlocks.length;k++){
        console.log("deadblock row = " + deadBlocks[k].y);
        console.log("deadblock column = " + deadBlocks[k].x);
        if (deadBlocks[k].x == col){        //if there is a block in current col
            if (deadBlocks[k].y == row){    //and a block in the next row
                //console.log ("test true");
                return true;         //true = there is something directly below the falling block
            }
            else {
                //console.log ("test false 1");
                return false;       //false= path is clear
                }
        }
        else {
            //console.log ("test false 2");
            return false; //nothing below
        }
    }
}

function drawBlocks(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(col * 20, row * 20, 20, 20);
        //ctx.fill(); 
        
        for(var k=0;k<deadBlocks.length;k++){
            //ctx.beginPath();
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(deadBlocks[k].x * 20, deadBlocks[k].y * 20, 20, 20);
        }
}


window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

    switch (event.key) {
    case "ArrowDown":
      // code for "down arrow" key press.
      break;
    case "ArrowUp":
      // code for "up arrow" key press.
      break;
    case "ArrowLeft":
      // code for "left arrow" key press.
        if(col > 0 && row<25){  
        col--;
        drawBlocks();
        }
      break;
    case "ArrowRight":
      // code for "right arrow" key press.
        if(col < 14 && row<25){
        col++;
        drawBlocks();
        }
      break;
      default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window











