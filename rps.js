const options = ['Rock','Paper','Scissors'];

function computerPlay(){
  return options[Math.floor(Math.random()*options.length)];
}

function findOptionIndex(selection){
  for(let i=0;i<options.length;i++){
    if(options[i].toUpperCase()==selection.toUpperCase()) {
      return i;
    }
  }
  return NaN;
}

function getResult(playerSelection, computerSelection) {
  const playerIndex = findOptionIndex(playerSelection);
  const computerIndex = findOptionIndex(computerSelection);
  return (playerIndex+options.length-computerIndex)%options.length;
}

const RESULT_WIN = 1;
const RESULT_LOSE = 2;
const RESULT_DRAW = 0;

let playerWins = 0;
let computerWins = 0;
let draws = 0;

function playRound() {
  console.log(`Round ${playerWins+computerWins+draws+1}! Score is ${playerWins}:${computerWins}`);
  const computerSelection=computerPlay();
  var playerSelection;
  var result;
  do {
    playerSelection = prompt("Rock, Paper or Scissors?");
    result = getResult(playerSelection, computerSelection);
  } while(isNaN(result));

  switch(result) {
    case RESULT_WIN:
      console.log(`You win! ${playerSelection} beats ${computerSelection}`);
      playerWins++;
      break;
    case RESULT_LOSE:
      console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
      computerWins++;
      break;
    case RESULT_DRAW:
      console.log(`It's a draw! Both players chose ${computerSelection}`);
      draws++;
      break;
  }
}

function game() {
  for(let round=0;round<5;round++){
    playRound();
  }

  if(playerWins > computerWins) {
    console.log(`You win the match ${playerWins}:${computerWins}!`);
  } else if(playerWins < computerWins) {
    console.log(`You lose the match ${playerWins}:${computerWins}!`);
  } else {
    console.log(`The match was drawn ${playerWins}:${computerWins}!`);
  }
}

game();