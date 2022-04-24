//set up canvas variables
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d"); 

//ball image variable (default)
const ballImage = new Image();
ballImage.src = "whiteSquare.png";

//
const gameOverMessage = document.getElementById("message");


//input variables
let downPressed = false;
let upPressed = false;
let wPressed = false;
let sPressed = false;

//game over boolean variable
let gameWon = false;



// -------------------------------objects

//player 1 paddle
const playerOne = {
    x: 0,
    y: canvas.height/2 -50,
    width:10,
    height: 100,
    color: "WHITE",
    score: 0,
    speed: 5
}

//player 2 paddle
const playerTwo = {
    x: canvas.width-10,
    y: canvas.height/2 -50,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0,
    speed: 5
}

//net in the middle
const  net = {
    x: canvas.width/2 -2,
    y: 0,
    width:2,
    height: 10,
    color: "WHITE",
}

//ball
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 25,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
}

// -------------------------functions


//game initialization FUNCTION
function game(){
    if(!gameWon){
        //
        update();// movements, collision detection, score updates...variables and logic
        render();

    }else{//once the game is over
        if(playerOne.score>playerTwo.score){
            gameOverMessage.innerHTML = "Winner: "+userNameOne;
        }else{
            gameOverMessage.innerHTML = "Winner: "+userNameTwo;
        }
    }

}


//update FUNCTION
function update(){
    //UPDATE BALL POSITION & VELOCITY
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if(ball.y+ball.radius > canvas.height ||
        ball.y-ball.radius < 0){//if ball hits top or bottom of canvas     
        
        ball.velocityY = -ball.velocityY;//flip y velocity direction
    }
    let player = (ball.x<canvas.width/2)? playerOne : playerTwo;//which player we are focusing on (like an if statement)

    if(collision(ball,player)){// if ball collides with player
        //update velocity (with direction) depending on where ball hit player
        let collidePoint = (ball.y - (player.y+ player.height/2))/player.height/2;// returns 0 if ball hits middle of paddle, -1 and 1 for the tips
        let angleRad = (Math.PI/4)*collidePoint;

        //change direction
        let direction;
        if(ball.x < canvas.width/2){
            direction = 1;
        }else{
            direction = -1;
        }

        ball.velocityX = direction*ball.speed*Math.cos(angleRad);
        ball.velocityY = ball.speed*Math.sin(angleRad);

        ball.speed+=0.5; //speed increases with every collision (game mechanic)
    }
    
    //UPDATE SCORE (if ball hits left or right)
    if(ball.x-ball.radius<0){
        playerTwo.score++;
        resetBall();
    } else if (ball.x+ball.radius>canvas.width){
        playerOne.score++;
        resetBall();
    }

    
    //update player movements
    if(upPressed && playerTwo.y>playerTwo.speed){
        playerTwo.y -= playerTwo.speed;
    }
    else if(downPressed && playerTwo.y+playerTwo.height<canvas.height-playerTwo.speed){
        playerTwo.y += playerTwo.speed;
    }

    if(wPressed && playerOne.y>playerOne.speed){
        playerOne.y -= playerOne.speed;
    }
    else if(sPressed && playerOne.y+playerOne.height<canvas.height-playerOne.speed){
        playerOne.y += playerOne.speed;
    }


    //update whether the game is over
    if(playerOne.score==15||playerTwo.score==15){
        gameWon = true;
    }
    
                                                      
}

//startup render FUNCTION
function render(){
    //canvas background color
    drawRect(0, 0, 600, 400, "black");

    drawNet();// net in the middle

    //playerOne score
    drawText(playerOne.score, canvas.width/4, canvas.height/5, "WHITE");

    //playerTwo score
    drawText(playerTwo.score, 3*canvas.width/4, canvas.height/5, "WHITE");

    //first player
    drawRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height, playerOne.color);

    //second player
    drawRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height, playerTwo.color);

    //ball
    //drawBall(ball.x, ball.y, ball.radius, ball.color);
    context.drawImage(ballImage,ball.x-ball.radius,ball.y-ball.radius);//-ball.rad cuz image is drawn starting from centre, not top left

}

//WHEN KEY IS PRESSED (event listener)
function keyDownHandler(e){
    if(e.key=="Up" || e.key == "ArrowUp"){
        upPressed = true;
    } 
    else if(e.key== "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
    else if(e.key== "w"){
        wPressed = true;
    }
    else if(e.key=="s"){
        sPressed = true;
    }
}

//WHEN KEY IS NO LONGER BEING PRESSED (event listener)
function keyUpHandler(e) {
    if(e.key=="Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key== "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
    else if(e.key== "w"){
        wPressed = false;
    }
    else if(e.key=="s"){
        sPressed = false;
    }
}

//reset ball FUNCTION
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 3;
    //ball.velocityX = -ball.velocityX; //switches ball direction
}

//check collision FUNCTION
function collision(ball,player){
    //just naming player parts
    player.top = player.y; 
    player.bottom = player.y+player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    //just naming ball parts
    ball.top = ball.y-ball.radius;
    ball.bottom = ball.y+ball.radius;
    ball.left = ball.x-ball.radius;
    ball.right = ball.x + ball.radius;


    //if all are true, there is a collision (returns true)
    //like when the ball is within the player's box
    return ball.right>player.left&& ball.top<player.bottom &&ball.left<player.right&&ball.bottom>player.top;
}

//rectangle draw FUNCTION
function drawRect(x,y,w,h, color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

//circle draw FUNCTION
function drawBall(x,y,r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0, Math.PI*2, false);
    context.closePath()
    context.fill();
    
    //canvas.drawImage(catImage,x,y)
}

//make a drawImage function
function drawImage(x,y){

}                     

//draw text FUNCTION
function drawText(text, x,y, color){
    context.fillStyle = color;
    context.font = "75px fantasy";
    context.fillText(text, x, y);
}

//draw net FUNCTION
function drawNet(){ //all the little rectangles
    for(let i=0; i<= canvas.height; i+=15){
        //as the i increases, you go down the canvas
        drawRect(net.x,net.y + i, net.width, net.height, net.color);

    }
}


//event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//prompt for two usernames
let userNameOne;
let userNameTwo;
do{
    userNameOne = prompt("Enter player one's username");
    userNameTwo = prompt("Enter player two's username");
    console.log(userNameOne);
    console.log(userNameTwo);
}
while(userNameOne==null || userNameTwo==null);//make sure they input

//add usernames to the header tag
document.getElementById("userNames").innerHTML=userNameOne+"\tVS\t"+userNameTwo;


//prompt for custom ball
let customBall;
customBall = prompt("Enter secret code...(type anything if you dont know codes)");
if(customBall=="willow"){
    ballImage.src = "pongWillow.jpg";
}else if(customBall=="soupCat"){        //CODE: willow
    ballImage.src = "pongCat.png";      //CODE:soupCat
}else if(customBall=="chefCat"){
    ballImage.src = "chefCat.jpeg";     //CODE:chefCat
}else if (customBall=="potatoKing"){
    ballImage.src = "pongHugh.jpg";
}else if (customBall=="valoAddict"){
    ballImage.src = "pongChris.jpg";
}

//main actions and loop
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);// calls game() 50 times every 1000ms=1sec

