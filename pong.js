//set up canvas variables
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d"); 


// -------------------------------objects

//player 1 paddle
const playerOne = {
    x: 0,
    y: canvas.height/2 -50,
    width:10,
    height: 100,
    color: "WHITE",
    score: 0
}

//player 2 paddle
const playerTwo = {
    x: canvas.width-10,
    y: canvas.height/2 -50,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
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
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
}

// -------------------------functions


//game initialization FUNCTION
function game(){
    update();// movements, collision detection, score updates...variables and logic
    render();
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

    if(collision(ball,player)){//check if ball collides with player
        //update velocity (with direction) depending on where ball hit player
        let collidePoint = (ball.y - (player.y+ player.height/2))/player.height/2;// returns 0 if ball hits middle of paddle, -1 and 1 for the tips
        let angleRad = (Math.PI/4)*collidePoint;

        //change direction
        if(ball.x < canvas.width/2){
            let direction = 1;
        }else{
            let direction = -1;
        }

        ball.velocityX = direction*ball.speed*Math.cos(angleRad);
        ball.velocityY = ball.speed*Math.sin(angleRad);

        ball.speed += 0.1; //speed increases with every collision (game mechanic)
    }
    
    //UPDATE SCORE
    if(ball.x-ball.radius<0){
        playerTwo.score++;
        resetBall();
    } else if (ball.x+ball.radius>canvas.width){
        playerOne.score++;
        resetBall();
    }

    /*
    //CHECK USER INPUTS
    canvas.addEventListener('keydown', function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        
        if(event.key == "w"){
            playerOne.y+=10;
        }else if (event.key== "s"){
            playerOne.y-=10;
        }else if (event.key == "ArrowUp"){
            playerTwo.y+=10;
        }else if (evt.key == "ArrowDown"){
            playerTwo.y-=10;
        }
    });

    // FIXXXXXXXX THISSSSSSSS fix this     !!!!!!!!!!!!!!!
    */                                                       
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
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

}



//reset ball FUNCTION
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
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
    return ball.right>player.left&& ball.top>player.bottom &&ball.left<player.right&&ball.top<player.bottom
}

//rectangle draw FUNCTION
function drawRect(x,y,w,h, color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

//circle draw FUNCTION
function drawCircle(x,y,r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0, Math.PI*2, false);
    context.closePath()
    context.fill();
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



//loop
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);// calls game() 50 times every 1000ms=1sec
