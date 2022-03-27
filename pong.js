//set up canvas variables
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d"); 

//canvas background color
drawRect(0, 0, 600, 400, "black");


//player 1 paddle
const playerOne = {
    x: 0,
    y: canvas.height/2 -50,
    width:10,
    height: 100,
    color: "WHITE",
    score: 0
}

drawRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height, playerOne.color);

//player 2 paddle
const playerTwo = {
    x: canvas.width-1,
    y: canvas.height/2 -50,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}
drawRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height, playerTwo.color);

//net in the middle
const  net = {
    x: canvas.width/2 -2,
    y: 0,
    width:2,
    height: 10,
    color: "WHITE",
}
drawNet();


//rectangle draw FUNCTION
function drawRect(x,y,w,h, color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

//circle draw FUNCTION
function drawCircle(x,y,r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0, Math.PI*2, false);
    ctx.closePath()
    ctx.fill();
}

//draw text FUNCTION
function drawText(text, x,y, color){
    ctx.fillStyle = color;
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

//draw net FUNCTION
function drawNet(){ //all the little rectangles
    for(let i=0; i<= canvas.height; i+=15){
        //as the i increases, you go down the canvas
        drawRect(net.x,net.y + i, net.width, net.height, net.color);

    }
}