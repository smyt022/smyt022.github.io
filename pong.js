//set up canvas variables
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d"); 

//draw a rectangle
context.fillStyle = "black";
context.fillRect(100, 200,50,75);

//draw a circle
context.fillStyle = "red";
context.beginPath();
context.arc(300,350,100,0, Math.PI*2, false);

context.closePath();
context.fill();


//rectangle draw function
function drawRect(x,y,w,h, color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

//circle draw function
function drawCircle(x,y,r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0, Math.PI*2, false);
    ctx.closePath()
    ctx.fill();
}

//draw text function
function drawText(text, x,y, color){
    ctx.fillStyle = color;
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}