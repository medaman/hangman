var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
var alphabetDisplay = "";
var changeLevel = false;
var mistakes = 0;
var numWins = 0;
var numLosses = 0;
var numChancesLeft = 0;
var totalScore = 0;
var category = [];
var pointValue = 0;
var currentWord = "";
var currentWordArray = [];
var gameComplete = false;
var guesses = ["'", "-"];
var volume = true;
var easySong = "https://www.youtube.com/embed/SfFpe2sJIbc?start=1&autoplay=1&loop=1"
var mediumSong = "https://www.youtube.com/embed/woWYNof6VRo?start=12&autoplay=1&loop=1"
var hardSong = "https://www.youtube.com/embed/foYFiqjbPTg?start=1&autoplay=1&loop=1"
var currentSong = "";


var loserContent = wordDisplay + "<h3>You Lose...</h3> <p>Press any key to continue.</p>"

var changeSound = function() {
	if (volume) {
		document.getElementById("volumeButton").className = "glyphicon glyphicon-volume-off";
		document.getElementById("music").src = currentSong + "&mute=1";
	} else {
		document.getElementById("volumeButton").className = "glyphicon glyphicon-volume-up";
		document.getElementById("music").src = currentSong;
	}
	volume=!volume;
}

for(var i=0; i<alphabet.length; i++) {
	alphabetDisplay = alphabetDisplay + ' <button id="' + alphabet[i] + '" onclick=keyPressed("' + alphabet[i] + '");>' + alphabet[i] + "</button>";
}
document.getElementById("usedLetters").innerHTML = alphabetDisplay;

document.onkeyup = function(event) {
	var buttonPress = event.key.toUpperCase();
	keyPressed(buttonPress);
}

var keyPressed = function(press) {

	var correct = false;
	wordDisplay = "<p>"
	console.log(press);
	console.log(alphabet.includes(press));
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
				document.getElementById(press).style.textShadow = "0 0 1.5vh rgba(14,181,53,0.5)";
			}
			else {
				wordDisplay += "_"
			}
		}
		wordDisplay += "</p>"

		if (!correct) {
				mistakes++;
				numChancesLeft--;
				document.getElementById(press).style.textShadow = "0 0 1.5vh rgba(196,23,23,0.5)";
		}

		document.getElementById("wordDisplay").innerHTML = wordDisplay;
		document.getElementById(press).style.disabled = "true";
		document.getElementById(press).style.color = "transparent";
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
	if (numChancesLeft <= 0) {
		alphabet=[];
		totalScore -= pointValue;
		numLosses++;
		losses.textContent = numLosses;
		lossesPhone.textContent = numLosses;
		document.getElementById("wordDisplay").innerHTML = "<p>" + currentWord + "</p> <h4>You Lose...New Game starting soon...";
		document
		setTimeout(function() {
			displayWord();
		}, 3200);
	}
	else {
		for(var i=0; i<currentWordArray.length; i++) {
			if ((!(guesses.includes(currentWordArray[i]))) && (!(currentWordArray[i]===" "))) {
				isWin = false;
			}
		}
		if (isWin) {
			alphabet=[];
			wordDisplay.textContent = currentWord;
			totalScore += pointValue;
			numWins++;
			wins.textContent = numWins;
			winsPhone.textContent = numWins;
			document.getElementById("wordDisplay").innerHTML = wordDisplay + "<h4>You Win! New Game starting soon...";
			document
			setTimeout(function() {
				displayWord();
			}, 2400);
		}
	}	
	displayScore();
	scorePhone.textContent = totalScore;	
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
		numChancesLeft = maxNumChances;
		displayScore();
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
	document.getElementById("level").style.color = "lightgreen";
	maxNumChances = 10;
	volume=!volume;
	currentSong = easySong;
	changeSound();
	startScreen.style.visibility = "hidden";
	category = sports;
	pointValue = 5;
	level.textContent = "Easy";
	levelPhone.textContent = "Easy";
	displayWord();
}

var mediumStart = function() {
	document.getElementById("level").style.color = "gold";
	maxNumChances=8;
	volume=!volume;
	currentSong = mediumSong;
	changeSound();
	startScreen.style.visibility = "hidden";
	category = gaming;
	pointValue = 10;
	level.textContent = "Medium";
	levelPhone.textContent = "Medium";
	displayWord();
}

var hardStart = function() {
	document.getElementById("level").style.color = "red";
	maxNumChances=6;
	volume=!volume;
	currentSong = hardSong;
	changeSound();
	startScreen.style.visibility = "hidden";
	category = hollywood;
	pointValue = 20;
	level.textContent = "Hard";
	levelPhone.textContent = "Hard";
	displayWord();
}

var checkChangeLevel = function() {
	changeLevel=false;
	if (numChancesLeft === maxNumChances) {
		changeLevel = true;
	}
	else if (confirm("Are you sure you want to change the Category? You will lose the current game.")) {
		numLosses++;
		totalScore -= pointValue;
		losses.textContent = numLosses;
		displayScore();
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
	document.getElementById("wordDisplay").innerHTML = wordDisplay;
	gameComplete=false;

	alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
	for(var i=0; i<alphabet.length; i++) {
		document.getElementById(alphabet[i]).style.color = "white";
		document.getElementById(alphabet[i]).style.textShadow = "";
	}
	numChancesLeft = maxNumChances;
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

var displayScore = function() {
		score.textContent = totalScore;
		if (totalScore>0) {
			document.getElementById("score").style.color = "green";
		}
		else if (totalScore<0) {
			document.getElementById("score").style.color = "red";
		}
		else {
			document.getElementById("score").style.color = "black";	
		}
	}