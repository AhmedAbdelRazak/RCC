/** @format */

var location1 = 3;
var location2 = 4;
var location3 = 5;
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false) {
	//as stated in the textbook page 47, I should start with getting the user's guess.
	guess = prompt("React, aim, fire! (enter a number from 0-6)");

	//comparing the user's input to valid values
	if (guess < 0 || guess > 6) {
		//tell user to enter a valid value
		alert("Please enter a valid cell number!");
	} else {
		//adding one to guesses
		guesses = guesses + 1;

		// if user guess matches one of the location
		if (guess == location1 || guess == location2 || guess == location3) {
			alert("HIT!");
			// ading one to the number of hits, for the first loop cycle, hits will change from 0 to 1 after executing the line below
			hits = hits + 1;
			//this condition was mentioned in the textbook and it was stated as 3, and this is good because while I was working on this task, I was wondering when the loop will break or end, and this resolved it, of course we can change the number 3 to bigger number to increase the time of the game and/or the score.
			if (hits == 3) {
				//IsSunk turned into true to end up the loop
				isSunk == true;
				alert("You sank my battleship!");
			}
		} else {
			alert("MISS");
		}
	}
}

var stats =
	"You took " +
	guesses +
	" guesses to sink the battleship, " +
	"which means your shooting accuracy was " +
	3 / guesses;

//final message should appear after the game of the while loop ends :)
alert(stats);
