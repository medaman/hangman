var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
var alphabetDisplay = "";
var mistakes = 1;
var numWins = 0;

for(var i=0; i<alphabet.length; i++) {
	alphabetDisplay = alphabetDisplay + " <p id=" + alphabet[i] + ">" + alphabet[i].toUpperCase() + "</p>";
}

document.getElementById("usedLetters").innerHTML = alphabetDisplay;

document.onkeyup = function(event) {
	var press = event.key.toLowerCase();
	console.log(press);
	if(alphabet.includes(press)) {
		document.getElementById(press).style.color = "transparent";
		document.getElementById(press).style.textShadow = "0 0 1.5vh rgba(255,255,255,0.5)";
		document.getElementById("hangman").src="assets/images/" + mistakes + ".jpg";
		mistakes++;
		numWins++;
		wins.textContent = numWins;
		winsPhone.textContent = numWins;
		alphabet[alphabet.indexOf(press)] = 0;
		lastLetter.textContent = press;
	}
	if (press === " ") {
		for(var i=0; i<alphabet.length; i++) {
			alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
			document.getElementById(alphabet[i]).style.color = "white";
			document.getElementById(alphabet[i]).style.textShadow = "";
			mistakes = 1;
			document.getElementById("hangman").src="assets/images/0.jpg";
			numWins=0;
			wins.textContent = numWins;
			winsPhone.textContent = numWins;
		
		}
	}
}
