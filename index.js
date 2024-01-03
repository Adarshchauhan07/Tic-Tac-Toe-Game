const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const effect = document.querySelectorAll(".img");

const winningPositions = [
    [3, 4, 5],
    [0, 1, 2],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];



let currentPlayer;
let gameGrid;

function swapPlayer(){
  if(currentPlayer==="X"){
    currentPlayer="O";
  }
  else{
    currentPlayer="X";
  }
  gameInfo.innerText=`NOW TURN OF --> ${currentPlayer}`;


}

boxes.forEach((box, index)=>{
  box.addEventListener("click", ()=>{
    handleClick(index);
  });
});


function checkGmaeOver(){
  let answer=undefined;

  winningPositions.forEach((position)=>{
    if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="") && gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]){
      
      //if X win
      if(gameGrid[position[0]]==="X"){
        answer="X";
      }
      //if O win
      else{
        answer="O";
      }

    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");

    } 
  });

  if(answer!==undefined){
    gameInfo.innerText=`Winner is ${answer}`;
    newGameBtn.classList.add('active');   
  }
  //check is game tied!!!!!
  //or who is winner of this game

  let count=0;
  gameGrid.forEach((position)=>{
    if(position!=="")count++;
  })

  if(count==9 && answer===undefined){
      gameInfo.innerText=`GAME TIED!!!`;
      newGameBtn.classList.add('active');   
  }
}

function handleClick(index){
  if(gameGrid[index]===""){
    boxes[index].innerText=currentPlayer;
    gameGrid[index]=currentPlayer;
    boxes[index].style.pointerEvents = "none";

    swapPlayer();

    checkGmaeOver();


  }
}


function init() {
  currentPlayer="O";
  gameInfo.innerText=`NOW TURN OF --> ${currentPlayer}`;
  gameGrid=["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box,index)=>{
    box.innerText="";
    gameGrid[index]="";
    boxes[index].style.pointerEvents = "all";
    box.classList.remove("win");

  });
  newGameBtn.classList.remove('active');   

}

init();

newGameBtn.addEventListener("click",init);
