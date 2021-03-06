
var randomNum = 0;
var guessNum = 0;

// updating the UI with new message
function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
}

function playerGuessed() {
	var instructions = document.getElementById('instructions');
	var playerGuessed = document.getElementById('playerGuess').value;
	var guessList = document.getElementById('guessList');
	if (playerGuessed.length == 0 || playerGuessed < 0 || playerGuessed > 100) {
		// when player enters nothing or a number that isn't in the range
		writeMessage('instructions', '<p>No, silly! Enter a number between 1-100 and press the Guess button!</p>');
	} else if (playerGuessed.indexOf('.') != -1) {
		// when player enters a number that is not a whole number
		writeMessage('instructions', '<p>Try again! Whole numbers only. Enter a whole number between 1-100 and press the Guess button!</p>');
	} else {
		guessNum++;
		if (playerGuessed == randomNum) {
			// the player got the number correct
			writeMessage('instructions', '<p><img src="img/youwin.jpg"><br>YOU GOT IT! It took you ' + guessNum +' guesses to get ' + randomNum + '. Play again! </p>');
			newGame();
		} else if (playerGuessed < randomNum) {
			// when the player needs to guess a higher number
			writeMessage('instructions', '<p>Gotta guess higher than ' + playerGuessed + ', try again...</p>');
			writeMessage('guessList', '<li>' + playerGuessed +' ...too low</li>', true);
		} else {
			// when the player needs to guess a lower number
			writeMessage('instructions', '<p>Gotta guess lower than ' + playerGuessed + ', try again...</p>');
			writeMessage('guessList', '<li>' + playerGuessed + ' ...too high</li>', true);
		}
		if (guessNum > 5) {
			// when player takes longer than 5 guesses
			writeMessage('instructions', '<p>Are you ever going to get this? You alreay have guessed '+ guessNum + ' times! Keep trying...</p>');
		}
	}
	// gets player's input
	document.getElementById('playerGuess').value = '';
}

// new game, which includes a new random number and guessNum set to 0
function newGame() {
	guessNum = 0;
	randomNum = Math.floor(Math.random() * 100) + 1;
	writeMessage('guessList', '');
}

// register
window.onload = function() {
	newGame();
	document.getElementById('button').addEventListener('click', playerGuessed);
};
