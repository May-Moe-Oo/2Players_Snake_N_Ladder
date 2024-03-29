# Developing a Snake And Ladder Game 2 Players by MayMoeOo95

<br>

## Project Requirements
- Render a game in the browser.
- Include win/loss logic and render win/loss messages in HTML.
- Build with HTML, CSS & JavaScript in separate files.
- No remaining dead and/or commented out code.
- Have functions and variables that are named sensibly.
- Be coded in a consistent manner.
- Game is deployed online.

<br>

## Timeframe
1 week
<br>

## Technologies and Tools Used
- HTML
- CSS
- JavaScript
- GitHub
- Visual Studio

<br>

## Game Description
Snake And Ladder is a classic global board game that has been played since the 2nd century BC. 
[Game History](https://timesofindia.indiatimes.com/who-invented-the-board-game-snakes-and-ladders/articleshow/3585003.cms) 
This game was made using HTML, CSS and JavaScript as the 1st project for my journey at 
[Software Engineering Immersive Bootcamp](https://generalassemb.ly/education/software-engineering-immersive/singapore) at General Assembly .

I started my programming journey due to my curiosity about how things become. The curiosity that I often felt when I was young. Thus, I wanted to recreate this simple beloved game that is one of my favourite games played and it reminds me of my childhood.

<br>

## How to Play?
- At the start of the game all players start at tile number 1.
- Each player will take turns to roll the dice. Player 1 will start 1st.
- Player will move forward the number of spaces shown on the dice.
- If player lands at the bottom of a ladder, player can move up to the top of the ladder.
- If player lands on the head of a snake, player must slide down to the bottom of the snake.
- The first player to get to the space that says 'Home Tile 30' is the winner.

<br>

## Game Deployment

[Click to Play](https://may-moe-oo.github.io/2Players_Snake_N_Ladder/)

<br>

## User Story
| When user ...                | What happens...                                                               |
|------------------------------|-------------------------------------------------------------------------------|
| Click Game On! Button        | Instruction screen is disaplyed.                                              |
| Click Let's Play Button      | The game screen is displayed.                                                 |
| Click Roll the Dice Button   | Random dice number is genurated and that number is displayed as "you roll: 5" |
| Click Move Player Button     | The player icon will move to the new tile. A message will inform the player where he/she is moved to. |
| Land on Snake tile           | The player will move down to the end of the tail.                             |
| Land on Ladder tile          | The player will move up to the top of the ladder.                             |
| Player reach tile 30         | Game end and the result page will display the winner.                         |
| Click Challenge Again! Button| Player will returns to the start screen.                                      |

<br>

## Approach to Deployment

There will be 4 different screens in this game using different div.
|Screens Names        | Purpose                                                           |
|---------------------|-------------------------------------------------------------------|
|1. Welcome Screen    | To welcome players to the game.                                   |
|2. Rules Screen      | To inform players how to play the game.                           |
|3. Play Game Screen  | For players to play                                               |
|4. Reset Screen      | To display the the winner and return back to the Welcome Screen   |

![image](https://user-images.githubusercontent.com/122252464/220623053-47ec65bd-6ce6-432a-a60d-edd02d2c9fa2.png)
![image](https://user-images.githubusercontent.com/122252464/220623164-354558c8-8de9-484f-9eaf-3d0acf3dceff.png)
![image](https://user-images.githubusercontent.com/122252464/220623258-9a2266d4-ae69-48d1-87fd-45630eac576f.png)
![image](https://user-images.githubusercontent.com/122252464/220623358-bd6ee427-7f36-4f5e-8926-5f1d9cfea07b.png)

* Show and Hide Screens - 
It is very messy to show all the above screens at once, hence we need to show whats needed and hide the remainding. DOM addEventListener and CSS display = "none" and display = "block" helps to achieve it. 

By default, only the Welcome Screen will be displayed. When player click on the ![image](https://user-images.githubusercontent.com/122252464/220621992-eef3973d-c722-48ef-92ee-fd7e0a79760d.png) button, Rules Screen will be displayed and the remaining will be hidden. Using this approach, I was able to organize and show individual screens as needed.  

```
function rulesButton() {
  document.getElementById("rulesButton").addEventListener("click", function () {
    screens[0].style.display = "none";
    screens[1].style.display = "block";
    screens[2].style.display = "none";
    screens[3].style.display = "none";
  });
}
```

* Dice - 
When the player click roll the dice button, random number from 1 to 6 will be generated then the dice.innerText will be displayed to inform player the number they have rolled. The combination of Math.random and Math.floor method was used to generate the dice number. 

```
function rollDice() {
  diceButton.addEventListener("click", function rollDice() {
    const dice = [, 1, 2, 3, 4, 5, 6];
    let randomIndex = Math.floor(Math.random() * 6 + 1);
    rolledDice.innerText = dice[randomIndex];
    enableMovePlayerBtn();
  });
}
```

* The "move" player button will be disabled by default and is only enabled after the dice button has been clicked. This allow the player to only move after they roll the dice during their turn.  

```
function enableMovePlayerBtn() {
  moveCharacters.removeAttribute("disabled");
  console.log("enable move buttons");
}
function disableMovePlayerBtn() {
  moveCharacters.disabled = true;
  console.log("disable move buttons");
}
```

* Moving the players -     
Using the show and hide methods mention above, the icons of both players will be turn on and off according to the new position of the player which is determined by current position plus dice number the player has rolled.
  
In HTML, class name of dontShow is tagged to each player icon in individual tiles. Example of tile number 30 is shown below. 
```
<div id="r0I5" class="tile">30 <br>
    <img id="C30" class="character dontShow" src="./Resources/cat1.png" alt="Character1 = cat" style="width:40px;height:40px; margin-left: 50px;">
    <img id="M30" class="character dontShow" src="./Resources/Monkey.png" alt="Character3 = monkey" style="width:50px;height:50px; margin-left: 10px;">
</div>
```
In CSS, 
```
.dontShow{
   display:none;
}
```
In Javascript, using DOM manipulation, player icons inside the tiles can be manipulated to either show or hide.
```
function boardCharacters() {
  if (character === "C") {
    document.getElementById(`${character}${currC}`).classList.remove("dontShow"); 
    document.getElementById(`${character}${prevC}`).classList.add("dontShow");
  } else {
    document.getElementById(`${character}${currM}`).classList.remove("dontShow");
    document.getElementById(`${character}${prevM}`).classList.add("dontShow");
  }
}
```

* There will be a message to inform the player about the new position. After moving, the "move player" button will be disabled again. Afterwards, disable the move player button as mentioned before. 

```
function movePlayers() {
  if (character === "C") {
    prevC = currC;
    currC = tiles[rolledDice.innerText - 1] + prevC;
  } else if (character === "M") {
    prevM = currM;
    console.log("prevM is " + prevM);
    currM = tiles[rolledDice.innerText - 1] + prevM;
  }
  disableMovePlayerBtn();
  playerlandOnNewTileNumMsg();
}
```

* Bonus and obstacles -
Landing on a snake will get the player to move back by a few tiles while landing on the ladder gives the player advantage of moving forward few tiles. Alert box is also added to inform player that they have either landed on the ladder or snake. 

![LadderPopUpMsg](https://user-images.githubusercontent.com/122252464/220667661-3ac834d5-f1a5-4b86-8816-5b0f8173e569.jpg)

![SnakePopUpMsg](https://user-images.githubusercontent.com/122252464/220667717-a0a78b52-5823-4828-8031-445820598a59.jpg)

Example below show the code for ladder:-  
```
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
```

* When the player clicks the move player button, flipCharacter function will run and the various functions will run accordingly. 

```
function flipCharacter() {
  moveCharacters.addEventListener("click", function moveCharacters() {
    channgePlayer();
    movePlayers();
    determineWinner();
    bonusLadders();
    obstacleSnake();
    boardCharacters();
  });
}
flipCharacter();
``` 
In summary:-

When the player clicks the move player button, the player will move by the number of dice rolled plus the current tile number (For example, if the player is on tile 2 and rolled a "3", the player will move to tile 5).

If the new tile number is tile 30, the player wins. If not the game will continue.

If the player lands on a tile with a snake, the player will move down to the tile where the snake's tail is located. (For example, if the current player is on tile 10 and rolled a “2”, the player will move to tile 12. But there is a snake at tile 12 so the player moves down to tile 2 instead. Tile 2 is the tail of the snake.)

If the player lands on a tile with a ladder, the player will transfer up to the tile where the top of the ladder is located.(For example, if the current player is on tile 1 and rolled a “2”, the player will move to tile 3. But there is a ladder at tile 3 so the player moves forward to tile 11 instead. Tile 11 is the top of the ladder. ) 

The final position of the player in that round will be determined by the condition of the tile. The player icon will be displayed on its turn’s final position. 

Message of the player’s final location will be displayed at Player moved to "tile X".
<br>

## Final OutLook of the Snake and Ladder 2 Player Game
![image](https://user-images.githubusercontent.com/122252464/220624402-27b71c9f-4f05-41fc-9249-aad81792729d.png)
![image](https://user-images.githubusercontent.com/122252464/220624514-6f222531-dc8d-4b51-807f-45ad089e371f.jpg)
![image](https://user-images.githubusercontent.com/122252464/220624701-018986df-e662-4be5-b272-eef5fae30c9b.png)
![image](https://user-images.githubusercontent.com/122252464/220624946-0803b8da-e98e-407f-98e2-5d6fd696b305.png)

<br>

## Learning Points

- It is very important to think of the initial plan as detailed as possible and plan the structure of the game.
- A good architectural framework will enable a better coding experience to keep codes clean and . This is something I need to work on.  
- When faced with a problem, take ant step at a time and pinpoint the root cause. 
- Write down small goals to do and code them one line at a time. 
- It is okay to be stuck and ask for advice and help as it has helped me to learn and look at things from a different perspective. 
- To be able to solve a small problem and bug one at a time is more important than worrying about the bigger problem. 
- Take breaks as needed to refresh the mind when facing a mental block, no point staring at the laptop. 

<br>

## Future Impovements

1. Players number selection (Multiplayers)
- 2 players
- 3 players
- 4 players

2. Player Characters selection
- All player to be able to select the characters icons of their choice. 

3. Different levels
- Level 2 (tile numbers increase to 50, with 2 more snakes and 1 ladder)
- Level 3 (tile numbers increased to 100, with 2 more long snakes and 2 short ladders)

4. Animation

5. Sounds

  <br>

## Summary
This is my very first project in my coding journey. As a newbie to the coding world, it was a challenge to change the way I think. I had learned to think of things on a smaller scale, look deeper in detail, be patient and locate the core issues in a problem. I had learn the importance of structuring codes framework. As my codes were not well structured, it was not very easy to locate the errors so I had to tidy them up. I hope to further develop this mindset and improve my skills to be able to create better solutions.  

<br>

## References
- [Game History](https://timesofindia.indiatimes.com/who-invented-the-board-game-snakes-and-ladders/articleshow/3585003.cms)
- [How to disable and enable buttons](https://stackoverflow.com/questions/13831601/disabling-and-enabling-a-html-input-button)


<br>

## Game Asset Atrributions
The below assets in this game are not owned by me. All rights belong to their original owners and artists as shown in the links below:-
- [Arrow](https://www.educative.io/answers/how-to-create-the-arrow-symbol-in-html)
- [Ladder](https://fontawesomeicons.com/bootstrap/icons/ladder)
- [Snake](https://fontawesomeicons.com/emoji/icons/snake#:~:text=Unicode%20of%20Snake%20%22%F0%9F%90%8D%22%20Emoji) 
- [Dice](https://fontawesomeicons.com/emoji/icons/game-die) 
- [Background](https://stock.adobe.com/images/watercolor-group-of-trees-fir-pine-cedar-fir-tree-green-forest-landscape-forest-landscape-drawing-on-white-isolated-background-misty-forest-in-haz-ecological-poster-watercolor-painting/234605262)
