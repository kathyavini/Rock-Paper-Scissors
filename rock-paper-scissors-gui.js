/*========================================================
========== The Odin Project Rock, Paper Scissors =========
==========================================================

Original game instructions with alert() and console.log() gameplay found here:
https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/rock-paper-scissors

Addition of DOM manipulation/GUI instructions found here:
https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/dom-manipulation

===========================================================*/
const delayPlayer = 100; // delay in ms before player selection is displayed
const delayComputer = 600; // delay in ms before computer selection is displayed and round decided

// Randomly return one of 'Rock' 'Paper' or 'Scissors'
function computerSelection() {
    const optionsArray = ['Rock', 'Paper', 'Scissors'];
    // Select a number between 0 and 3 and use it as the selector index to optionsArray
    let computerPlay = optionsArray[Math.floor(Math.random()*3)];
  
    // Addition: Change the image to match the computer selection after a short pause
    setTimeout(function() {
        computerImage = document.querySelector('#computerImage');
        computerSelectionText.textContent = computerPlay.toUpperCase();
        if (computerPlay == 'Rock') {
            computerImage.setAttribute('src', 'turtle.svg');
        } else if (computerPlay == 'Paper') {
            computerImage.setAttribute('src', 'stingray.svg');
        } else if (computerPlay == 'Scissors') {
            computerImage.setAttribute('src', 'crab.svg');
        }
    }, delayComputer); // pause in number of ms


    return computerPlay;
}

// Play a round and declare a winner or a tie
// This isn't quite the right win/lose message but I'm not feeling motivated to change it at the moment
function playRound(playerSelection, computerSelection) {
    // First clear previous selections (refresh what's shown on screen):
    playerSelectionText.textContent = '';
    computerSelectionText.textContent = '';
    computerImage.setAttribute('src', 'question-mark.png');
    roundResult.textContent = '';

    // Get new selections
    let player=playerSelection; // no longer passing in a function with the GUI, only a string
    
    // I like how it looks with a a slight delay here to indicate a new round (in case the same selection is picked twice especially)
    setTimeout(function() {
        playerSelectionText.textContent = player;
    }, delayPlayer); // just lets the selection stay blank for a while

    // Run computer selection function, which has its own delay
    let computer=computerSelection();
    
    // Decide who wins the round and return it. But add the delay so the results don't come first
    switch(true) {
        // cases where player wins
        case (player=='ROCK' && computer=='Scissors'):
        case (player=='SCISSORS' && computer=='Paper'):
        case (player=='PAPER' && computer=='Rock'):
            return ('Player Wins!');
        //cases where computer wins
        case (computer=='Rock' && player=='SCISSORS'):
        case (computer=='Scissors' && player=='PAPER'):
        case (computer=='Paper' && player=='ROCK'):
            return ('Computer Wins!');
        // Ties
        case (player=='ROCK' && computer=='Rock'):
        case (player=='SCISSORS' && computer =='Scissors'):
        case (player=='PAPER' && computer=='Paper'):
            return("It's a tie!");
        // player cancels play
        case (player==undefined):
            return ('Round cancelled');
        // default value for when the player types something weird (only applied to non-DOM version of game)
        default:
            // alert("The only acceptable plays are rock, paper, or scissors (case-insentive). Please type one of those options or esc to quit.");
            // return ('No winner; player did not play an acceptable move');
        }
}

/*=========================================================
========== ORIGINAL (CONSOLE.LOG) FUNCTIONALITY ========== 
==========================================================*/
// // Prompt the user for their input and return it in a case-insensitive manner
// function playerSelection() {
//     let userInput = prompt("What do you play?");
//     // Test the selection return it or give a cancellation message if it's null
//     if (userInput) {
//         // console.log(userInput);
//         let userSelection = userInput.toUpperCase();
//         // console.log(userSelection);
//         return userSelection;
//     } else {
//         return;
//     }   
// }

// // Function to play fiveRounds 
// function playGame() {
//     let playerWins = 0;
//     let computerWins = 0;
//     for (let i = 1; i <= 5; i++) {
//         console.log(`Round ${i} of 5...`)
//         result = playRound(playerSelection,computerSelection);
//         alert(result);
//         if (result == 'Computer Wins!') {
//             computerWins++;
//         } else if (result == 'Player Wins!') {
//             playerWins++;
//         }
//     }
//     console.log(`Final score is Player: ${playerWins} Computer: ${computerWins}`)
// }






/*==========================================
========== GUI/DOM MANIPULATION ============ 
===========================================*/

// Add event listeners to each button (<img>) which play a round with the given selection
const btnRock = document.querySelector('#rock');
btnRock.addEventListener('click', () => {
    btnRock.classList.add('selected');
    result = playRound('ROCK', computerSelection);
    tallyScore(result);
});

const btnPaper = document.querySelector('#paper');
btnPaper.addEventListener('click', () => {
    btnPaper.classList.add('selected');
    result = playRound('PAPER', computerSelection);
    tallyScore(result);
});

const btnScissors = document.querySelector('#scissors');
btnScissors.addEventListener('click', () => {
    btnScissors.classList.add('selected');
    result = playRound('SCISSORS', computerSelection);
    tallyScore(result);
});

// Post results to the appropriate results <div>
// Append player and computer selections
const playerSelectionContainer = document.querySelector('#playerSelection');
const computerSelectionContainer = document.querySelector('#computerSelection');
const playerSelectionText = document.createElement('span');
playerSelectionContainer.append(playerSelectionText);
const computerSelectionText = document.createElement('span');
computerSelectionContainer.append(computerSelectionText);

// Show round and final game results in the .resuts <div>
const resultsContainer = document.querySelector('#results');
const roundResult = document.createElement('h3');
const gameResult = document.createElement('h2');
resultsContainer.appendChild(roundResult);
resultsContainer.appendChild(gameResult);

// Show game score count in the .score <div>
const scoreContainer = document.querySelector('#scores');
const gameScore = document.createElement('h3');
scoreContainer.appendChild(gameScore);

// Tally and announce winner
let playerWins = 0;
let computerWins = 0;

function tallyScore(result) {
    gameResult.textContent = ''; // in case playing more than one game

    // Don't announce scores or round result until after the computer selection is displayed
    setTimeout(function() {
        roundResult.textContent = result;

        if (result == 'Computer Wins!') {
            computerWins++;
        } else if (result == 'Player Wins!') {
            playerWins++;
        }
        gameScore.textContent = `Player: ${playerWins}\r\nComputer: ${computerWins}`

        if (computerWins == 5) {
            gameResult.textContent = 'Computer Wins Game!';
            playerWins = 0;
            computerWins = 0;
        } else if (playerWins == 5) {
            gameResult.textContent = 'Player Wins Game!';
            playerWins = 0;
            computerWins = 0;
        }
        
        // Reset image
        let selectedImage = document.querySelector('.selected');
        selectedImage.classList.remove('selected');

    }, delayComputer+1000); // delay before announcing
}




