
// Randomly return one of 'Rock' 'Paper' or 'Scissors'
function computerSelection() {
    const optionsArray = ['Rock', 'Paper', 'Scissors'];
    // Select a number between 0 and 3 and use it as the selector index to optionsArray
    let computerPlay = optionsArray[Math.floor(Math.random()*3)];
    return computerPlay;

}

// Prompt the user for their input and return it in a case-insensitive manner
function playerSelection() {
    let userInput = prompt("What do you play?");
    // Test the selection return it or give a cancellation message if it's null
    if (userInput) {
        // console.log(userInput);
        let userSelection = userInput.toUpperCase();
        // console.log(userSelection);
        return userSelection;
    } else {
        return;
    }   
}

// Play a round and declare a winner or a tie
// Annoying capitalization on the computer's play is taken from the instructions so I left it
// This isn't the right output format but I'm not feeling motivated to change it at the moment
function playRound(playerSelection, computerSelection) {
    let player=playerSelection();
    let computer=computerSelection();
    console.log(`Player play is ${player}`);
    console.log(`Computer play is ${computer}`);
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
        // default value for when the player types something weird
        default:
            alert("The only acceptable plays are rock, paper, or scissors (case-insentive). Please type one of those options or esc to quit.");
            return ('No winner; player did not play an acceptable move');
    }
}

// Function to play fiveRounds
function playGame() {
    let playerWins = 0;
    let computerWins = 0;
    for (let i = 1; i <= 5; i++) {
        console.log(`Round ${i} of 5...`)
        result = playRound(playerSelection,computerSelection);
        alert(result);
        if (result == 'Computer Wins!') {
            computerWins++;
        } else if (result == 'Player Wins!') {
            playerWins++;
        }
    }
    console.log(`Final score is Player: ${playerWins} Computer: ${computerWins}`)
}