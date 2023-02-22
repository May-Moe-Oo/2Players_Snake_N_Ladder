//console.log("snake n ladders 2 players");
/*----- constants -----*/
let character = "M"; //current character (default)
let prev;
let curr = 1; //tile character are standing at now
let currC = 1;
let currM = 1;
let prevC;
let prevM;
/*----- state variables -----*/
const boardTiles = [];
// i = rows & j = columns
const tiles = []; //! To populate tiles numbers for imgs

/*----- cached elements  -----*/
const welcomePage = document.getElementById("welcomePg"); // welcome screen
const instruction = document.getElementById("rules"); // rules screen
const gameArea = document.getElementById("playGame"); // play game screen
const results = document.getElementById("results"); // result screen
const screens = [welcomePage, instruction, gameArea, results];
const board = document.getElementById("board"); // the playing board 30tiles
const rolledDice = document.getElementById("diceFaces");
const catPlaying = document.getElementById("CatPlays"); // cat in display player inside board
const monkeyPlaying = document.getElementById("MonkeyPlays"); // monkey in display player inside board
const diceButton = document.getElementById("dicebutton"); // dice button
let player = document.getElementById("currentPlayer"); // to change players turn
const moveCharacters = document.getElementById("movePlayer");
let playerNewTileNum = document.getElementById("newTileNum");
let winner = document.getElementById("winner");
/*----- event listeners -----*/

//? when click the "Game On" button, screens on instruction is displayed and screens on welcomePage and other screens disappear.
function rulesButton() {
  document.getElementById("rulesButton").addEventListener("click", function () {
    screens[0].style.display = "none";
    screens[1].style.display = "block";
    screens[2].style.display = "none";
    screens[3].style.display = "none";
  });
}

//? when click the "let's play" button, screens on gameArea is displayed and screens oninstruction and other screens disappear.
function startButton() {
  document.getElementById("startButton").addEventListener("click", function () {
    screens[0].style.display = "none";
    screens[1].style.display = "none";
    screens[2].style.display = "block";
    screens[3].style.display = "none";
  });
}
//? when click the "challange Again!" button, screens on gameArea is displayed and reset and screens on results and other screens disappear.
function restartButton() {
  document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      screens[0].style.display = "block";
      screens[1].style.display = "none";
      screens[2].style.display = "none";
      screens[3].style.display = "none";
      document.location.reload(); // reloads the current document.
    });
}

function selectBoard() {
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 6; j++) {
      const element = document.getElementById(`r${i}I${j}`);
      row.push(element);
    }
    boardTiles.push(row);
    //console.log("row0 index0 tile num is" + boardTiles[0][0].innerText);
  }
}

// at the #totalPlayers div
function catPlayingNow() {
  document.getElementById("cat").addEventListener("click", function () {
    catPlaying.style.display = "block";
  });
}
function monkeyPlayingNow() {
  document.getElementById("monkey").addEventListener("click", function () {
    monkeyPlaying.style.display = "block";
  });
}

//? click roll the dice button, randon number from 1 to 6 will be generated then the dice.innerText will be displayed below row the dice.
function rollDice() {
  diceButton.addEventListener("click", function rollDice() {
    const dice = [, 1, 2, 3, 4, 5, 6];
    let randomIndex = Math.floor(Math.random() * 6 + 1);
    rolledDice.innerText = dice[randomIndex];
    //console.log(dice[randomIndex]);
  });
  renderAll();
}

function boardCharacters() {
  //! if currC is tile 1 block, roll dice 2, new currC is tile 3 block and prevC is tile 1 none.
  if (character === "C") {
    document
      .getElementById(`${character}${currC}`)
      .classList.remove("dontShow"); //changes display to block for class = "dontShow".
    document.getElementById(`${character}${prevC}`).classList.add("dontShow");
  } else {
    document
      .getElementById(`${character}${currM}`)
      .classList.remove("dontShow");
    document.getElementById(`${character}${prevM}`).classList.add("dontShow");
  }
}

//? when click move player button, player will move by the number of dice rolled plus the current tile number (the new current tile number is previouse tile number plus dice rolled).  
//? if the new tile number is tile 30, player wins. if not game continues.
//? if the new tile number has ladder, player will transfer up the tile where the ladder's top and land on another new tile.  
//? if the new tile number has snake, player will transfer down the tile where the snake's tail is located and land on another new tile.
//? the player character will be displayed at the final new tile and the all the previous player character on the old tile will not be displayed. 
//? msg of the play final location will be displayed at Player moves to "tile X".
function moveCharacter() {
  moveCharacters.addEventListener("click", function moveCharacters() {
    channgePlayer();
    movePlayers();
    determineWinner();
    bonusLadders();
    obstacleSnake();
    boardCharacters();
  });
  renderAll();
}
moveCharacter();

/*----- functions -----*/
//? At the start, on load only screens.welcomePage is displayed.
function changeScreens() {
  rulesButton();
  startButton();
  restartButton();
}
changeScreens();

//? player display on game screen at #totalPlayers. When player click the character at the welcomePg, it will appear on the game screen at #totalPlayers.
function displayAllPlayers() {
  catPlayingNow();
  monkeyPlayingNow();
}
displayAllPlayers();

//! To populate tiles numbers for imgs
function populateBoard() {
  for (let i = 1; i <= 30; i++) {
    tiles.push(i);
  }
}
//console.log("populated tiles" + tiles);
rollDice();

//! to change players turn
function channgePlayer() {
  if (character === "M") {
    character = "C";
    player.innerText = "Cat";
  } else {
    character = "M";
    player.innerText = "Monkey";
  }
  //console.log(`Current player is ${character}`);
}
//! winner
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
  renderAll();
}
//! ladder for cat and monkey
function bonusLadders() {
  //ladders for Cat
  if (currC === 3) {
    currC = 11;
    alert("WOW Ladder! Cat moves to tile 11!");
    playerlandOnNewTileNumMsg();
  } else if (currC === 7) {
    currC = 19;
    alert("WOW Ladder! Cat moves to tile 19!");
    playerlandOnNewTileNumMsg();
  } else if (currC === 21) {
    currC = 28;
    alert("WOW Ladder! Cat moves to tile 28!");
    playerlandOnNewTileNumMsg();
  }
  //ladders for Monkey
  if (currM === 3) {
    currM = 11;
    alert("WOW a Ladder! Monkey moves to tile 11!");
    playerlandOnNewTileNumMsg();
    //console.log("M at 3 to 11?" +currM);
  } else if (currM === 7) {
    currM = 19;
    alert("WOW a Ladder! Monkey moves to tile 19!");
    playerlandOnNewTileNumMsg();
    //console.log("M at 8 to 19?" + currM);
  } else if (currM === 21) {
    currM = 28;
    alert("WOW a Ladder! Monkey moves to tile 28!");
    playerlandOnNewTileNumMsg();
  }
}

//! snake for cat and monkey
function obstacleSnake() {
  // snake for Cat
  if (currC === 12) {
    currC = 2;
    alert("Yikes! Snake... Cat moves to tile 2!");
    playerlandOnNewTileNumMsg();
  } else if (currC === 16) {
    currC = 5;
    alert("Yikes! Snake... Cat moves to tile 5!");
    playerlandOnNewTileNumMsg();
  } else if (currC === 26) {
    currC = 15;
    alert("Yikes! Snake... Cat moves to tile 15!");
    playerlandOnNewTileNumMsg();
  }
  // snake for Monkey
  if (currM === 12) {
    currM = 2;
    alert("Yikes! Snake... Monkey moves to tile 2!");
    playerlandOnNewTileNumMsg();
  } else if (currM === 16) {
    currM = 5;
    alert("Yikes! Snake... Monkey moves to tile 5!");
    playerlandOnNewTileNumMsg();
  } else if (currM === 26) {
    currM = 15;
    alert("Yikes! Snake... Monkey moves to tile 15!");
    playerlandOnNewTileNumMsg();
  }
}

function movePlayers() {
  // prev = curr;
  if (character === "C") {
    prevC = currC;
    currC = tiles[rolledDice.innerText - 1] + prevC;
    console.log("currC is " + currC);
    // insert chg message here?
    playerlandOnNewTileNumMsg();
  } else if (character === "M") {
    prevM = currM;
    console.log("prevM is " + prevM);
    currM = tiles[rolledDice.innerText - 1] + prevM;
    console.log("currM is " + currM);
    //! issue here
    playerlandOnNewTileNumMsg();
  }
};


function playerlandOnNewTileNumMsg (){
  //new msg of where the player is
  if (character === "M") {
    playerNewTileNum.innerText = "tile no. " + currM;
  } else if (character === "C") {
    playerNewTileNum.innerText = "tile no. " + currC;
  }
}

function renderAll() {
  selectBoard();
  populateBoard();
};


//! to add the dice sound effect
// function diceSound(){
//   let diceAudio = new Audio('./dice.mp3');
// diceAudio.diceButton();
// };
// diceSound();
// diceButton.addEventListener("click", diceSound);