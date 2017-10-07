var wins = 0;
var placeholderArray = [];
var prevPlaceholderArray = [];
var wordPlaceholder = [];
var lettersGuessed = [];
var word = [];
var wordPlaceholderString = "";
var userInput = "";
var correctGuessCount = 0;
var guessesLeft = 13;

var BWords = {
	word1: ["K", "A", "N", "S", "A", "S",],
	word2: ["S", "Y", "R", "A", "C", "U", "S", "E",],
	word3: ["D", "U", "K", "E"],
	word4: ["G", "E", "O", "R", "G", "E", "T", "O", "W", "N",],
	word5: ["S", "T", "A", "N", "F", "O", "R", "D"]
};

var wordArray = [BWords.word1, BWords.word2, BWords.word3, BWords.word4, BWords.word5];

createWord(wordArray);


document.onkeyup = function(event) {
	console.log('This is the key entered', event.key);
	var keyPress;

	if (typeof event != 'undefined') {
		keyPress = event.keyCode;

		userInput = String.fromCharCode(keyPress).toUpperCase();
		console.log(userInput + " should match the key entered");

		trackLetterGuesses(userInput);

		buildWord(userInput);
	}

	else if (e) {
		keyPress = e.which;
	}
	return false;
};


function createWord(wordArray) {
	word = wordArray[Math.floor(Math.random()*wordArray.length)];
	console.log(word);

	createWordPlaceholder(word);
	return word;
};

function createWordPlaceholder(word) {	
	var wordPlaceholder = [];

	for (i = 0; i < word.length; i++) {
		wordPlaceholder.push("_");
	}

	wordPlaceholderString = wordPlaceholder.join(" ");

	document.getElementById('word-placeholder').textContent = wordPlaceholderString;
	return wordPlaceholder;
};

function trackLetterGuesses(userInput) {

	
	for (i = 0; i < lettersGuessed.length; i++) {
		if (userInput == lettersGuessed[i]) {
			return;
		}
	}

	lettersGuessed.push(userInput);
	console.log("LettersGuessed array item: " + lettersGuessed[0]);
	
	var lettersGuessedString = lettersGuessed.join(", ");
	document.getElementById('letters-guessed').innerHTML = lettersGuessedString;

	guessesLeft--;

	document.getElementById('guess-count').innerHTML = guessesLeft;
	console.log('Guesses left' + guessesLeft);


	if (guessesLeft == 0) {
		restartGame();
	}

	return lettersGuessedString;
};

function buildWord(userInput) {

	if (prevPlaceholderArray.length == 0) {
		placeholderArray = createWordPlaceholder(word);

	} else {
		placeholderArray = prevPlaceholderArray;
	}

	for (var i = 0; i < word.length; i++) {
	  console.log('Word is ' + word);
	  if (userInput == word[i]) {
	  	console.log(userInput + " is in word at " + i);
	  	//
	  	placeholderArray[i] = userInput;
	  }
	}

	prevPlaceholderArray = placeholderArray;

	placeholder = placeholderArray.join(" ");
	document.getElementById('word-placeholder').innerHTML = placeholder;

	console.log("Placeholder Array length is " + placeholderArray.length);
	console.log("Placeholder split is " + placeholder.split(","));
	console.log("Word join is " + word.join(" "));
	
	if (placeholder.split(',') == word.join(" ")) {
		console.log("Woot");
		wins++;
		playAudio();
		document.getElementById('win-count').innerHTML = wins;
		restartGame();
	}
};



function restartGame(wordPlaceholder) {
	
	createWord(wordArray);

    userInput = "";
	prevPlaceholderArray = [];
	placeholderArray = [];

	guessesLeft = 13;

	correctGuessCount = 0;
	document.getElementById('guess-count').innerHTML = guessesLeft;

	lettersGuessed = [];
	document.getElementById('letters-guessed').innerHTML = lettersGuessed;
};
