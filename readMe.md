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
*At the start of the game all players start at tile number 1.
*Each player will take turns to roll the dice. Player 1 will start 1st.
*Player will move forward the number of spaces shown on the dice.
*If player lands at the bottom of a ladder, player can move up to the top of the ladder.
*If player lands on the head of a snake, player must slide down to the bottom of the snake.
*The first player to get to the space that says 'Home Tile 30' is the winner.
<br>

## Game Deployment

[Click to Play](https://maymoeoo95.github.io/2Players_Snake_N_Ladder/)
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

* Show and Hide Screens
It is very messy to show all the above screens at once, hence we need to show whats needed and hide the remainding. DOM addEventListener and CSS display = "none" and display = "block" helps to achieve it. 

By default, only the Welcome Screen will be displayed. When player click on the ![image](https://user-images.githubusercontent.com/122252464/220621992-eef3973d-c722-48ef-92ee-fd7e0a79760d.png) button, Rules Screen will be disaplyed and the remainding will be hidden. Using this approach, I was able to organize and show individual screens as needed.  

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

* Dice
When the player click roll the dice button, randon number from 1 to 6 will be generated then the dice.innerText will be displayed to inform player the number they have rolled. The combination of Math.random and Math.floor method was used to generate the dice number. 

```
function rollDice() {
  diceButton.addEventListener("click", function rollDice() {
    const dice = [, 1, 2, 3, 4, 5, 6];
    let randomIndex = Math.floor(Math.random() * 6 + 1);
    rolledDice.innerText = dice[randomIndex];
    enableMovePlayerBtn();
  });
  renderAll();
}
```

* The Move player button is disable by default and its enable enable only after the dicebutton button has been clicked. This enable the player to only move after they roll the dice at their turn.  
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
<br>

## Final OutLook of the Snake and Ladder 2 Player Game
![image](https://user-images.githubusercontent.com/122252464/220624402-27b71c9f-4f05-41fc-9249-aad81792729d.png)
![G2](https://user-images.githubusercontent.com/122252464/220624514-6f222531-dc8d-4b51-807f-45ad089e371f.jpg)
![image](https://user-images.githubusercontent.com/122252464/220624701-018986df-e662-4be5-b272-eef5fae30c9b.png)
![image](https://user-images.githubusercontent.com/122252464/220624946-0803b8da-e98e-407f-98e2-5d6fd696b305.png)


<br>

## Learning Points
<br>

## Future Impovements

1. (Multipplayers) Able to host more than 2 players
- 3 players
- 4 players

2. Player Characters selection

3. Different levels
- lvl 2 (tile numbers increase to 50, with 2 more snakes and 1 ladder)
- lvl 3 (tile numbers increased to 100, wiht 2 more long snakes and 2 short ladders)
  <br>

## Summary

<br>
## References
[Game History](https://timesofindia.indiatimes.com/who-invented-the-board-game-snakes-and-ladders/articleshow/3585003.cms)
[How to disable and enable buttons](https://stackoverflow.com/questions/13831601/disabling-and-enabling-a-html-input-button)
<br>
## Game Asset Atrributions
The below assets in this game are not owned by me. All rights belong to their original owners and artists as shown in the links below:-

