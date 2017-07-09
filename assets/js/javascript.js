/************************************************************************************
*************************************************************************************
                      _  _        
     /\              | |(_)       
    /  \   _   _   __| | _   ___  
   / /\ \ | | | | / _` || | / _ \ 
  / ____ \| |_| || (_| || || (_) |
 /_/    \_\\__,_| \__,_||_| \___/ 

*************************************************************************************
*************************************************************************************/

var allAudio = {
	volume: true,
	win: new Audio("assets/sounds/win.mp3"),
	loss: new Audio("assets/sounds/loss.mp3"),
	easy: new Audio("assets/sounds/easy.mp3"),
	medium: new Audio("assets/sounds/medium.mp3"),
	hard: new Audio("assets/sounds/hard.mp3")
};
allAudio.easy.loop = true;
allAudio.medium.loop = true;
allAudio.hard.loop = true;

function muteButton() {
	if (allAudio.volume) {
		document.getElementById("volumeButton").className = "glyphicon glyphicon-volume-off";
		allAudio.easy.muted = true;
		allAudio.medium.muted = true;
		allAudio.hard.muted = true;
		allAudio.win.muted = true;
		allAudio.loss.muted = true;
	}
	else {
		document.getElementById("volumeButton").className = "glyphicon glyphicon-volume-up";
		allAudio.easy.muted = false;
		allAudio.medium.muted = false;
		allAudio.hard.muted = false;
		allAudio.win.muted = false;
		allAudio.loss.muted = false;	
	}
	allAudio.volume = !allAudio.volume;
}

function changeSound() {
	allAudio.easy.pause();
	allAudio.medium.pause();
	allAudio.hard.pause();
	allAudio[hangmanGame.gameLevel].load();
	allAudio[hangmanGame.gameLevel].play();	
}


/************************************************************************************
*************************************************************************************
   _____                         
  / ____|                        
 | |  __   __ _  _ __ ___    ___ 
 | | |_ | / _` || '_ ` _ \  / _ \
 | |__| || (_| || | | | | ||  __/
  \_____| \__,_||_| |_| |_| \___|

*************************************************************************************
*************************************************************************************/


var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
var alphabetDisplay = "";

var hangmanGame = {
	numWins: 0,
	numLosses: 0,
	totalScore: 0,
}

for(var i=0; i<alphabet.length; i++) {
	alphabetDisplay = alphabetDisplay + ' <button id="' + alphabet[i] + '" onclick=keyPressed("' + alphabet[i] + '");>' + alphabet[i] + "</button>";
}
document.getElementById("usedLetters").innerHTML = alphabetDisplay;
alphabet = [];

document.onkeyup = function(event) {
	keyPressed(event.key.toUpperCase());
}

function keyPressed(press) {	
	if(alphabet.includes(press)) {
		checkCurrentWord(press);
		displayScore();
		alphabet[alphabet.indexOf(press)] = 0;
		lastLetter.textContent = press;
	}
}

function checkCurrentWord(press) {
	var correct = false;
	for(var i=0; i<hangmanGame.currentWordArray.length; i++) {
		if (hangmanGame.currentWordArray[i] === press) {
			console.log("Enters here");
			hangmanGame.guesses.push(press);
			correct=true;
			document.getElementById(press).style.textShadow = "0 0 1.5vh rgba(14,181,53,0.5)";
			displayWord();
		}
	}		
	if (!correct) {
		hangmanGame.mistakes++;
		hangmanGame.numChancesLeft--;
		document.getElementById(press).style.textShadow = "0 0 1.5vh rgba(196,23,23,0.5)";
	}

	document.getElementById(press).style.color = "transparent";
	document.getElementById("hangman").src="assets/images/" + hangmanGame.gameLevel + "/" + hangmanGame.mistakes + ".png";
}

function displayWord() {
	var wordDisplay = "<p>";
	for (var i=0; i<hangmanGame.currentWordArray.length; i++) {
		console.log(hangmanGame.currentWordArray[i]);
		if (hangmanGame.guesses.includes(hangmanGame.currentWordArray[i])) {
			wordDisplay += hangmanGame.currentWordArray[i];
		}
		else if (hangmanGame.currentWordArray[i] === " " ) {
			wordDisplay += "</p> <p>";
		} else {
				wordDisplay += "_";
		}
	}
	wordDisplay += "</p>";
	document.getElementById("wordDisplay").innerHTML = wordDisplay;
	checkWin(wordDisplay);
}

function checkWin(display) {
	var isWin = true;
	if (hangmanGame.numChancesLeft <= 0) {
		alphabet=[];
		hangmanGame.totalScore -= hangmanGame.pointValue;
		hangmanGame.numLosses++;
		allAudio[hangmanGame.gameLevel].pause();
		allAudio.loss.play();
		document.getElementById("wordDisplay").innerHTML = "<p>" + hangmanGame.currentWord + "</p> <h4>You Lose...New Game starting soon...";
		setTimeout(function() {
			allAudio[hangmanGame.gameLevel].play();
			displayNewWord();
		}, allAudio.loss.duration*1000);
	}
	else {
		for(var i=0; i<hangmanGame.currentWordArray.length; i++) {
			if ((!(hangmanGame.guesses.includes(hangmanGame.currentWordArray[i]))) && (!(hangmanGame.currentWordArray[i]===" "))) {
				isWin = false;
			}
		}
		if (isWin) {
			alphabet=[];
			hangmanGame.totalScore += hangmanGame.pointValue;
			hangmanGame.numWins++;
			allAudio[hangmanGame.gameLevel].pause();
			allAudio.win.play();
			document.getElementById("wordDisplay").innerHTML = "<p>" + display + "</p> <h4>You Win! New Game starting soon...";
			setTimeout(function() {
				allAudio[hangmanGame.gameLevel].play();
				displayNewWord();
			}, allAudio.win.duration*1000);
		}
	}	
}

function displayNewWord() {
	hangmanGame.currentWord = lists[hangmanGame.gameLevel][Math.floor(Math.random() * lists[hangmanGame.gameLevel].length)];
	hangmanGame.currentWordArray = hangmanGame.currentWord.split('');
	hangmanGame.guesses = ["'","-"];
	var wordDisplay = "<p>";
	wordDisplay= wordDisplay + "</p>";
	document.getElementById("wordDisplay").innerHTML = wordDisplay;
	hangmanGame.gameComplete=false;

	alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
	for(var i=0; i<alphabet.length; i++) {
		document.getElementById(alphabet[i]).style.color = "black";
		document.getElementById(alphabet[i]).style.textShadow = "";
	}
	hangmanGame.numChancesLeft = hangmanGame.maxNumChances;
	displayWord();
	displayScore();
	lastLetter.textContent = "-";
	lastLetterPhone.textContent = "-";
	hangmanGame.mistakes = 0;
	document.getElementById("hangman").src="assets/images/" + hangmanGame.gameLevel + "/0.png";
	isWin = false;
}

function displayScore() {
		wins.textContent = hangmanGame.numWins;
		winsPhone.textContent = hangmanGame.numWins;
		losses.textContent = hangmanGame.numLosses;
		lossesPhone.textContent = hangmanGame.numLosses;
		score.textContent = hangmanGame.totalScore;
		scorePhone.textContent = hangmanGame.totalScore;
		chancesLeft.textContent = hangmanGame.numChancesLeft;
		chancesLeftPhone.textContent = hangmanGame.numChancesLeft;
		if (hangmanGame.totalScore>0) {
			document.getElementById("score").style.color = "green";
		}
		else if (hangmanGame.totalScore<0) {
			document.getElementById("score").style.color = "red";
		}
		else {
			document.getElementById("score").style.color = "white";	
		}
	}

function changeLevel(newLevel) {
	if (checkChangeLevel()) {
		startGame(newLevel);
	}
}

function startGame(chosenLevel) {
	hangmanGame.gameLevel=chosenLevel;
	if (chosenLevel === "easy") {
		document.getElementById("level").style.color = "green";
		hangmanGame.maxNumChances = 10;
		hangmanGame.pointValue = 5;
	} else if (chosenLevel === "medium") {
		document.getElementById("level").style.color = "gold";
		hangmanGame.maxNumChances=8;
		hangmanGame.pointValue = 10;
	} else {
		document.getElementById("level").style.color = "red";
		hangmanGame.maxNumChances=6;
		hangmanGame.pointValue = 20;
	}
	gameStart();
}

function gameStart() {
	changeSound();
	startScreen.style.visibility = "hidden";
	document.body.style.backgroundImage = "url('assets/images/" + hangmanGame.gameLevel + ".png')";
	level.textContent = hangmanGame.gameLevel;
	displayNewWord();
}

function checkChangeLevel() {
	if (hangmanGame.numChancesLeft === hangmanGame.maxNumChances) {
		return true;
	}
	else if (confirm("Are you sure you want to change the category? You will lose the current game.")) {
		hangmanGame.numLosses++;
		hangmanGame.totalScore -= hangmanGame.pointValue;
		displayScore();
		return true;
	}
	else {
		return false;
	}
}

function restart() {
	if (confirm("Are you sure you would like to restart the game? All stats will reset.")) {
		alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
		for(var i=0; i<alphabet.length; i++) {
			document.getElementById(alphabet[i]).style.color = "black";
			document.getElementById(alphabet[i]).style.textShadow = "";
		}
		allAudio[hangmanGame.gameLevel].pause();
		hangmanGame.totalScore = 0;
		hangmanGame.numWins = 0;
		hangmanGame.numLosses = 0;
		hangmanGame.numChancesLeft = hangmanGame.maxNumChances;
		lastLetter.textContent = "-";
		lastLetterPhone.textContent = "-";
		hangmanGame.mistakes = 0;
		document.getElementById("hangman").src="assets/images/" + hangmanGame.gameLevel + "/0.png";
		startScreen.style.visibility = "visible";
	}
}

function help() {
	helpScreen.style.visibility = "visible";
}

function helpHide() {
	helpScreen.style.visibility = "hidden";
}