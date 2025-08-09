let gameCon = document.querySelector(".game-con");
let foodX,foodY;
let headX=12,headY=12;
let velocityX=0,velocityY=0;
let snakeBody=[];
let score=0;
let scoreCon = document.querySelector(".score-con");
let gameInterval;



function generateFood(){
    foodX= Math.floor(Math.random()*25)+1;
    foodY= Math.floor(Math.random()*25)+1;
    for (let i=0;i<snakeBody.length;i++){
        if (snakeBody[i][0] == foodX && snakeBody[i][1] == foodY){ //If the food is generated inside the snake, then the food is generating again and again untill the food generates outside of the snakeBody.
            generateFood();
        }
    }
}

function startGame(speed){
    clearInterval(gameInterval);// stop old speed
    gameInterval= setInterval(renderGame,speed);
}

function renderGame(){
    let updatedgame = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    if(headX==foodX && headY==foodY){
        snakeBody.push([foodX,foodY]);
        generateFood();
        score+=10;
        scoreCon.innerHTML= "Score : "+score; 
    }

    //increase speed of snake according to the Score
    if (score===0){
            startGame(150);
        }
    else if (score>=100){
        startGame(110);
    }
    else if (score>=200){
        startGame(80);
    }
    else if (score>=400){
        startGame(50);
    }

    snakeBody.pop();// when snakeBody.unshift, the snake is getting longer by keeping its starting point same.so we use pop() to remove the last point from the tail of the snake 
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY]);//to increase the length of snake 
    
    if(headX==0 || headY==0 || headX==26 || headY==26){
        gameOver();
    }

    for (i=1;i<snakeBody.length;i++){
        if (snakeBody[0][1]==snakeBody[i][1] && snakeBody[0][0]==snakeBody[i][0]){
            gameOver();
        }
    }

    for(let i=0;i<snakeBody.length;i++){
        updatedgame += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    }

    gameCon.innerHTML=updatedgame; // This shows the updated state (Frame) of Food + Head
    
}

function gameOver(){
    alert("GAME OVER. Your Score is  : " + score);
    generateFood();
    headX=12;
    headY=12;
    velocityX=0;
    velocityY=0;
    score=0;
    scoreCon.innerHTML= "Press any(Left, Right, Up, Down) key to start."; 
    snakeBody=[];
}



document.addEventListener("keydown",function(e){
    console.log(e.key);
    let key=e.key;

    if (key=="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if (key=="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(key == "ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(key == "ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
});

generateFood();
renderGame();
startGame();