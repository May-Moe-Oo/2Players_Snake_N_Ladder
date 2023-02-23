/*----- constants -----*/
/*----- state variables -----*/
const boardTiles = [];
const tiles = [];
let character = "M";
let prev;
let curr = 1;
let currC = 1;
let currM = 1;
let prevC;
let prevM;

/*----- cached elements  -----*/
const welcomePage = document.getElementById("welcomePg");
const instruction = document.getElementById("rules");
const gameArea = document.getElementById("playGame");
const results = document.getElementById("results");
const screens = [welcomePage, instruction, gameArea, results];
const board = document.getElementById("board");
const rolledDice = document.getElementById("diceFaces");
const diceButton = document.getElementById("dicebutton");
let player = document.getElementById("currentPlayer");
const moveCharacters = document.getElementById("movePlayer");
let playerNewTileNum = document.getElementById("newTileNum");
let winner = document.getElementById("winner");
/*----- event listeners -----*/

function rulesButton() {
  document.getElementById("rulesButton").addEventListener("click", function () {
    screens[0].style.display = "none";
    screens[1].style.display = "block";
    screens[2].style.display = "none";
    screens[3].style.display = "none";
  });
}

function startButton() {
  document.getElementById("startButton").addEventListener("click", function () {
    screens[0].style.display = "none";
    screens[1].style.display = "none";
    screens[2].style.display = "block";
    screens[3].style.display = "none";
  });
}

function restartButton() {
  document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      screens[0].style.display = "block";
      screens[1].style.display = "none";
      screens[2].style.display = "none";
      screens[3].style.display = "none";
      document.location.reload();
    });
}
// i = rows & j = columns
function selectBoard() {
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 6; j++) {
      const element = document.getElementById(`r${i}I${j}`);
      row.push(element);
    }
    boardTiles.push(row);
  }
}

function rollDice() {
  diceButton.addEventListener("click", function rollDice() {
    const dice = [, 1, 2, 3, 4, 5, 6];
    let randomIndex = Math.floor(Math.random() * 6 + 1);
    rolledDice.innerText = dice[randomIndex];
    enableMovePlayerBtn();
    disableDiceBtn();
  });
}

function boardCharacters() {
  if (character === "C") {
    document
      .getElementById(`${character}${currC}`)
      .classList.remove("dontShow");
    document.getElementById(`${character}${prevC}`).classList.add("dontShow");
  } else {
    document
      .getElementById(`${character}${currM}`)
      .classList.remove("dontShow");
    document.getElementById(`${character}${prevM}`).classList.add("dontShow");
  }
}

function flipCharacter() {
  moveCharacters.addEventListener("click", function moveCharacters() {
    changePlayer();
    movePlayers();
    determineWinner();
    bonusLadders();
    obstacleSnake();
    boardCharacters();
  });
}
flipCharacter();

/*----- functions -----*/
function changeScreens() {
  rulesButton();
  startButton();
  restartButton();
}
changeScreens();

function populateBoard() {
  for (let i = 1; i <= 30; i++) {
    tiles.push(i);
  }
}

rollDice();

function changePlayer() {
  if (character === "M") {
    character = "C";
    player.innerText = "Cat";
  } else {
    character = "M";
    player.innerText = "Monkey";
  }
}

function determineWinner() {
  if (currM >= 30) {
    currM = 30;
    screens[0].style.display = "none";
    screens[1].style.display = "none";
    screens[2].style.display = "none";
    screens[3].style.display = "block";
    winner.innerText = "Player Monkey";
  }
  if (currC >= 30) {
    currC = 30;
    screens[0].style.display = "none";
    screens[1].style.display = "none";
    screens[2].style.display = "none";
    screens[3].style.display = "block";
    winner.innerText = "Player Cat";
  }
}

function bonusLadders() {
  const ladderPositions = {
    3: 11,
    7: 19,
    21: 28,
  };
  const catLadderPosition = ladderPositions[currC];
  const monkeyLadderPosition = ladderPositions[currM];
  if (catLadderPosition) {
    currC = catLadderPosition;
    alert(`WOW Ladder! Cat moves to tile ${currC}!`);
    playerlandOnNewTileNumMsg();
  }
  if (monkeyLadderPosition) {
    currM = monkeyLadderPosition;
    alert(`WOW a Ladder! Monkey moves to tile ${currM}!`);
    playerlandOnNewTileNumMsg();
  }
}

function obstacleSnake() {
  const snakePositions = {
    12: 2,
    16: 5,
    26: 15,
  };
  const catSnakePosition = snakePositions[currC];
  const monkeySnakePosition = snakePositions[currM];
  if (catSnakePosition) {
    currC = catSnakePosition;
    alert(`Yikes! Snake... Cat moves to tile ${currC}!`);
    playerlandOnNewTileNumMsg();
  }
  if (monkeySnakePosition) {
    currM = monkeySnakePosition;
    alert(`Yikes! Snake... Monkey moves to tile ${currM}!`);
    playerlandOnNewTileNumMsg();
  }
}

function movePlayers() {
  if (character === "C") {
    prevC = currC;
    currC = tiles[rolledDice.innerText - 1] + prevC;
  } else if (character === "M") {
    prevM = currM;
    currM = tiles[rolledDice.innerText - 1] + prevM;
  }
  disableMovePlayerBtn();
  playerlandOnNewTileNumMsg();
  enableDiceBtn();
}

function playerlandOnNewTileNumMsg() {
  if (character === "M") {
    playerNewTileNum.innerText = "tile no. " + currM;
  } else if (character === "C") {
    playerNewTileNum.innerText = "tile no. " + currC;
  }
}

function enableMovePlayerBtn() {
  moveCharacters.removeAttribute("disabled");
}

function disableMovePlayerBtn() {
  moveCharacters.disabled = true;
}

function enableDiceBtn() {
  diceButton.removeAttribute("disabled");
}

function disableDiceBtn() {
  diceButton.disabled = true;
}

function renderAll() {
  selectBoard();
  populateBoard();
}
renderAll();
