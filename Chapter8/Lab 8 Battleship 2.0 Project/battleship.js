/** @format */

//One of the game objects (model) to keep track of the ships (Where they are, if they've been hit and if they've been sunk)
var model = {
	//The first 3 elements/ properties here keep us from hardcoding values.
	//boardSize (The size of the grid used)
	boardSize: 7,
	//numShips (the number of ships in the game)
	numShips: 3,
	//shipLength (the number of locations in each ship, 3)
	shipLength: 3,
	//shipSunk (initialized to 0 for the start of the game) keeps the current number of ships that have been sunk by the player
	shipsSunk: 0,

	// An array of objects of the ships with their locations (which will be randomized using generateShipLocations() & generateShip() methods )
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
	],

	//This method accepts a guess (which is coming from whoever is playing the game)
	fire: function (guess) {
		for (var i = 0; i < this.numShips; i++) {
			//Here we have our hands on a ship. We need to see if the guess matches any of it's actual generated locations
			var ship = this.ships[i];
			//indexOf returns the index (integer), if it returned a value less than 0, then the value was not found in the array
			var index = ship.locations.indexOf(guess);

			//Checking if the user did use the same location again or not
			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
				//If we  get an index greater than or equal to zero, the user's guess is in the location's array and we have a hit
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				//Notify the view that we got a hit at the location in guess
				view.displayHit(guess);
				view.displayMessage("HIT!");

				// We'll add the check here, after we know for sure we have a hit.
				//If the ship is sunk, then we increase the number of ships that are sunk in the mode's shipsSunk property.
				if (this.isSunk(ship)) {
					//Here to let the user know that this hit sank the battleship
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		//Notify the view that we got a miss at the location in guess
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function (ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},

	//Being called on page load
	generateShipLocations: function () {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		// console.log("Ships array: ");
		// console.log(this.ships);
	},

	generateShip: function () {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) {
			//Generate a starting location for a horizontal ship
			row = Math.floor(Math.random() * this.boardSize);
			//The potential bug recommended by Ian and the code was replaced by the following as advised:
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else {
			//Generate a starting location for a vertical ship
			//The potential bug recommended by Ian and the code was replaced by the following as advised:
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		//For the new ship locations, we'll start with an empty array, and add the locations one by one
		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				//Add location to array for new horizontal ship
				//We're pushing a new location onto the newShipLocations array
				//"row": That location is a string made up of the row (the starting row we just computed)
				//"col + i": Here, we use parentheses to make sure i is added to col before it's converted to a string
				newShipLocations.push(row + "" + (col + i));
			} else {
				//Add location to array for new vertical ship
				//Same thing here but for a vertical ship so we have col and row + i instead
				newShipLocations.push(row + i + "" + col);
			}
		}
		//Once we've generated all the locations, we return the array
		return newShipLocations;
	},

	//Avoiding a collision
	//locations is an array of locations for a new ship we'd like to place on the board
	collision: function (locations) {
		//Nested for loops
		for (var i = 0; i < this.numShips; i++) {
			//for each ship already on the board
			var ship = this.ships[i];

			//check to see if any of the locations in the new ship's locations array are in an existing ship's locations array
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		//If we get here and haven't returned, then we never found a match for any of the locations we were checking.
		//So we return false (No Collision)
		return false;
	},
};

//object (view) which is responsible for keeping the display updated with hits, misses and messages for the user
var view = {
	displayMessage: function (msg) {
		//The displayMessage method takes one argument (msg)
		//triger the messageArea from the page
		var messageArea = document.getElementById("messageArea");
		//Update the text of the messageArea element (id) by setting its innerHTML to msg
		messageArea.innerHTML = msg;
	},

	//the location is created from the row and column and matches an id of a <td> element
	displayHit: function (location) {
		var cell = document.getElementById(location);
		//we then set the class of that element to "hit". This will add a ship image to the <td> element
		cell.setAttribute("class", "hit");
	},

	displayMiss: function (location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	},
};

//Here we're defining our controller object, with a property, guesses initialized to 0
var controller = {
	guesses: 0,

	//And here's the beginning of the processGuess method, which takes a guess in the form of "A0, E4, etc..."
	//This method processes guesses and passes them to the model. Detects the end of the game
	//We will use the processGuess to validate the player's guess
	processGuess: function (guess) {
		var location = parseGuess(guess);
		if (location) {
			//If the player entered a valid guess, we increase the number of guesses by one
			this.guesses++;
			var hit = model.fire(location);
			//If the guess was a hit, and the number of ships that are sunk is equal to the number of ships in the game,
			//then show the player a message that they've sunk all the ships
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage(
					"You sank all my battleships, in " + this.guesses + " guesses",
				);
			}
		}
	},
};

//parseGuess is to check both characters of the guess to see if they are numbers between 0 to 6 or not.
function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		//Here is checking if the user did add a guess at all or his guess didn't have 2 characters
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		//getting the firstChar using chartAt built in function (A, B, etc...)
		var firstChar = guess.charAt(0);
		//checking the index of the chosen guess first character to return the row number
		var row = alphabet.indexOf(firstChar);
		//Returns the chosen number only (e.g. if the user fired "E4", the below variable returns 4 only)
		var column = guess.charAt(1);

		//Checking if the user added wrong criteria even if they are 2 characters such as AA, or 3Z
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");

			// Another check to make sure that the user filled in a good shot.
		} else if (
			row < 0 ||
			row >= model.boardSize ||
			column < 0 ||
			column >= model.boardSize
		) {
			alert("Oops, that's off the board!");
		} else {
			//Now we will concatenate the row and column together to make a string, and returning that string.
			//We're using type conversion again here, since row is a number and column is a string, so we will end up with a string(00, 24, etc..).
			return row + column;
		}
	}
	return null;
}

//Handling the fire button
//this initiates the guess
function handleFireButton() {
	//Here, we get a reference to the input from element using the input element's id "guessInput"
	var guessInput = document.getElementById("guessInput");
	//We transfer the input value to upper case
	//Because in the processGuess() method, the alphabet variable contains letters all in upper case
	var guess = guessInput.value.toUpperCase();

	//Then calling the processGuess() method in the controller object and pass the player's guess as a parameter.
	controller.processGuess(guess);

	//This line just resets the form input element to be empty string.
	//That way you don't have to refresh the page or manually delete the prev input
	guessInput.value = "";
}

//Here is the key press handler.
//It's called whenever you press a key in the form input in the page.
function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");

	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

//We need somewhere for this code to execute on page load
window.onload = init;

function init() {
	//First, we get a reference to the Fire button using the button's id "fireButton"
	var fireButton = document.getElementById("fireButton");
	//Then, we can add a click handler function
	fireButton.onclick = handleFireButton;

	var guessInput = document.getElementById("guessInput");
	//Add a new handler. this one handles key press events from the HTML input field
	//It looks like the onkeypress is deprecated but not sure what it's equivalent
	guessInput.onkeypress = handleKeyPress;

	//we are calling model.generateShipLocations from the init function so it happens right when you load the game beofre you start playing.
	//That way all the ships will have locations ready to go when you start playing.
	model.generateShipLocations();
}
