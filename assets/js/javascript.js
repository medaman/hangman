var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
var alphabetDisplay = "";
var changeLevel = false;
var mistakes = 0;
var numWins = 0;
var numLosses = 0;
var numChancesLeft = 10;
var totalScore = 0;
var category = [];
var pointValue = 0;
var currentWord = "";
var currentWordArray = [];
var gameComplete = false;
var guesses = ["'", "-"];


var loserContent = wordDisplay + "<h3>You Lose...</h3> <p>Press any key to continue.</p>"

for(var i=0; i<alphabet.length; i++) {
	alphabetDisplay = alphabetDisplay + " <p id=" + alphabet[i] + ">" + alphabet[i] + "</p>";
}
document.getElementById("usedLetters").innerHTML = alphabetDisplay;

document.onkeyup = function(event) {
	var press = event.key.toUpperCase();
	keyPressed(press);

	var correct = false;
	wordDisplay = "<p>"
	
	if(alphabet.includes(press)) {	
		for(var i=0; i<currentWordArray.length; i++) {
			if (guesses.includes(currentWordArray[i])) {
				wordDisplay += currentWordArray[i];
			}
			else if (currentWordArray[i] === " " ) {
				wordDisplay += "</p> <p>";
			}
			else if (currentWordArray[i] === press) {
				wordDisplay += press;
				correct=true;
				guesses.push(press);
			}
			else {
				wordDisplay += "_"
			}
		}
		wordDisplay += "</p>"

		if (!correct) {
				mistakes++;
				numChancesLeft--;
		}

		document.getElementById("wordDisplay").innerHTML = wordDisplay;
		document.getElementById(press).style.color = "transparent";
		document.getElementById(press).style.textShadow = "0 0 1.5vh rgba(255,255,255,0.5)";
		document.getElementById("hangman").src="assets/images/" + mistakes + ".jpg";
		chancesLeft.textContent = numChancesLeft;
		chancesLeftPhone.textContent = numChancesLeft;
		alphabet[alphabet.indexOf(press)] = 0;
		lastLetter.textContent = press;

		checkWin();
	}
}

var checkWin = function() {
	var isWin = true;
	if (numChancesLeft === 0) {
		totalScore -= pointValue;
		numLosses++;
		losses.textContent = numLosses;
		lossesPhone.textContent = numLosses;
		score.textContent = totalScore;
		scorePhone.textContent = totalScore;
		document.getElementById("wordDisplay").innerHTML = "<p>" + currentWord + "</p> <h4>You Lose...New Game starting soon...";
		document
		setTimeout(function() {
			displayWord();
		}, 4000);
	}
	else {
		for(var i=0; i<currentWordArray.length; i++) {
			if ((!(guesses.includes(currentWordArray[i]))) && (!(currentWordArray[i]===" "))) {
				isWin = false;
			}
		}
		if (isWin) {
			wordDisplay.textContent = currentWord;
			totalScore += pointValue;
			numWins++;
			wins.textContent = numWins;
			winsPhone.textContent = numWins;
			score.textContent = totalScore;
			scorePhone.textContent = totalScore;
			document.getElementById("wordDisplay").innerHTML = wordDisplay + "<h4>You Win! New Game starting soon...";
			document
			setTimeout(function() {
				displayWord();
			}, 4000);
		}
	}		
}

var restart = function() {
	if (confirm("Are you sure you would like to restart the game? All stats will reset.")) {
		alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
		for(var i=0; i<alphabet.length; i++) {
			document.getElementById(alphabet[i]).style.color = "white";
			document.getElementById(alphabet[i]).style.textShadow = "";
		}
		totalScore = 0;
		numWins = 0;
		numLosses = 0;
		numChancesLeft = 10;
		score.textContent = totalScore;
		scorePhone.textContent = totalScore;
		wins.textContent = numWins;
		winsPhone.textContent = numWins;
		losses.textContent = numLosses;
		lossesPhone.textContent = numLosses;
		chancesLeft.textContent = numChancesLeft;
		chancesLeftPhone.textContent = numChancesLeft;
		lastLetter.textContent = "-";
		lastLetterPhone.textContent = "-";
		mistakes = 0;
		document.getElementById("hangman").src="assets/images/0.jpg";
		displayWord();
	}
}

var help = function() {
	helpScreen.style.visibility = "visible";
}

var helpHide = function() {
	helpScreen.style.visibility = "hidden";
}

var easyStart = function() {
	startScreen.style.visibility = "hidden";
	category = sports;
	pointValue = 5;
	level.textContent = "Easy";
	levelPhone.textContent = "Easy";
	displayWord();
}

var mediumStart = function() {
	startScreen.style.visibility = "hidden";
	category = gaming;
	pointValue = 10;
	level.textContent = "Medium";
	levelPhone.textContent = "Medium";
	displayWord();
}

var hardStart = function() {
	startScreen.style.visibility = "hidden";
	category = hollywood;
	pointValue = 20;
	level.textContent = "Hard";
	levelPhone.textContent = "Hard";
	displayWord();
}

var checkChangeLevel = function() {
	changeLevel=false;
	if (numChancesLeft === 10) {
		changeLevel = true;
	}
	else if (confirm("Are you sure you want to change the Category? You will lose the current game.")) {
		numLosses++;
		totalScore -= pointValue;
		losses.textContent = numLosses;
		score.textContent = totalScore;
		changeLevel = true;
	}
}

var easy = function() {
	checkChangeLevel();
	if (changeLevel) {
		easyStart();
	}
}
var medium = function() {
	checkChangeLevel();
	if (changeLevel) {
		mediumStart();
	}
}
var hard = function() {
	checkChangeLevel();
	if (changeLevel) {
		hardStart();
	}
}

var displayWord = function() {
	currentWord = category[Math.floor(Math.random() * category.length)];
	currentWordArray = currentWord.split('');
	guesses = ["'","-"];
	console.log(currentWord);
	var wordDisplay = "<p>";
	for(var i=0; i<currentWordArray.length; i++) {
		if (guesses.includes(currentWordArray[i])) {
			wordDisplay += currentWordArray[i];
		}
		else if (currentWordArray[i] === " " ) {
			wordDisplay += "</p> <p>";
		}
		else {
			wordDisplay += "_";
		}
	}
	wordDisplay= wordDisplay + "</p>";
	console.log(wordDisplay);
	document.getElementById("wordDisplay").innerHTML = wordDisplay;
	gameComplete=false;

	alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
	for(var i=0; i<alphabet.length; i++) {
		document.getElementById(alphabet[i]).style.color = "white";
		document.getElementById(alphabet[i]).style.textShadow = "";
	}
	numChancesLeft = 10;
	wins.textContent = numWins;
	wins.textContent = numWins;
	losses.textContent = numLosses;
	lossesPhone.textContent = numLosses;
	chancesLeft.textContent = numChancesLeft;
	chancesLeftPhone.textContent = numChancesLeft;
	lastLetter.textContent = "-";
	lastLetterPhone.textContent = "-";
	mistakes = 0;
	document.getElementById("hangman").src="assets/images/0.jpg";
	isWin = false;
}