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

function initialise(){
  ["#Rock","#Paper","#Scissors"].forEach(element => {
    document.querySelector(element).addEventListener('click', onClickGameButton);
  });
  renderScore();
}

function renderScore() {
  var scoreDiv = document.querySelector("#score");
  scoreDiv.textContent = `${playerWins}:${computerWins}`;
}

function onClickGameButton(e){
  playRound(e.target.id);
}

function playRound(playerSelection) {
  console.log(`Round ${playerWins+computerWins+draws+1}! Score is ${playerWins}:${computerWins}`);
  const computerSelection=computerPlay();
  result = getResult(playerSelection, computerSelection);

  switch(result) {
    case RESULT_WIN:
      playerWins++;
      renderResult(`You win! ${playerSelection} beats ${computerSelection}`);
      break;
    case RESULT_LOSE:
      computerWins++;
      renderResult(`You lose! ${computerSelection} beats ${playerSelection}`);
      break;
    case RESULT_DRAW:
      draws++;
      renderResult(`It's a draw! Both players chose ${computerSelection}`);
      break;
  }
}

function renderResult(result){
  if(playerWins == 5 && computerWins < 5) {
    result += ". You won the match!";
    disableButtons();
  } else if(computerWins == 5 && playerWins < 5) {
    result += ". The computer wins the match!";
    disableButtons();
  }
  document.querySelector("#roundResult").textContent = result;
  renderScore();
}

function disableButtons(){
  ["#Rock","#Paper","#Scissors"].forEach(element => {
    document.querySelector(element).disabled = true;
  });
}

function getPlayerSelection() {
  let playerSelection;
  let index;
  do {
    playerSelection = prompt("Rock, Paper or Scissors?");
    index = findOptionIndex(playerSelection);
  } while(isNaN(index));
  return playerSelection;
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

initialise();