/*
GAME FUNCTION
- Player must guess a number between a min and max
- Player gets only a few guesses
- notify player of guesses remaining
- notify the player of the correct guess if chosen
- let player choose to play again
*/

// Game values
let min = 1,
    max = 15,
    winningNum = getRandomNum(min, max),
    guessesLeft = 5;

// UI
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn')
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min nd max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === winningNum) {

        gameOver(true, `${winningNum} is correct! You won!`)

    } else {
        // wrong number
        guessesLeft -= 1;

        
        if(guessesLeft === 0) {

            gameOver(false, `GAME OVER, you lost. The correct number was ${winningNum}`);

            // // Game Over
            // // disable input
            // guessInput.disable = true;
            // // border red
            // guessInput.style.borderColor = 'red';
            // // Set message
            // setMessage(`GAME OVER, you lost. The correct number was ${winningNum}`, 'red')
        } else {
            // Game continues when only one answer wrong
            guessInput.style.borderColor = 'red';

            guessInput.value = '';

            setMessage(`${guess} is not correct; ${guessesLeft} guesses left!`, 'red')
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // disable input
    guessInput.disable = true;
    // border green
    guessInput.style.borderColor = color;
    // Set text color 
    message.style.color = color;
    // Set message
    setMessage(msg)

    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}