/** @format */

//Getting the most relevant elements by Id to dynamically insert and remove
var boardContainer = document.getElementById("board-container");
var gameBoard = document.getElementById("gameBoard");

//Just like chapter 8 (battleship), I assumed that the main structure of the game model is the elements in the object below
const memoryGameModel = {
	Started: false,
	Flipped: 0,
	totalFlips: 0,
};

//The function below is the initialization of the game
//It determines the squares or images count per row
//It determines the actual images after flipping "Images Array"
//It insert the html element based on the distribution and shuffling
const GameInit = () => {
	const squares = 4;

	const images = [
		"zero.jpg",
		"one.jpg",
		"two.jpg",
		"three.jpg",
		"four.jpg",
		"five.jpg",
	];

	//To randomize the array images (array of length 6)
	const randomizeImages = randomDistribution(images, (squares * squares) / 3);

	//To get the 4*3 shuffled picks/ squares
	const squareArray = shufflingTheGame([
		...randomizeImages,
		...randomizeImages,
	]);

	//Here I was trying to use innerHTML but it took me time and never gave me what I want
	//Maybe I will need to practice more in simpler examples.
	//I used normal HTML tag by simply adding the `` (template literals)
	//That way, I was able to map through all items in the squareArray
	//I usually use .map method in JSX when developing anything in React and it surprisingly enough worked for me here.
	//Not sure whether this is vanilla javascript or not but hopefully my approach won't harm my grade.
	const cards = `
        <div class="mainBoard" style="grid-template-columns: repeat(${squares}, auto)">
            ${squareArray
							.map(
								(item) => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back" style="background-image: url(${item}); background-size: cover"> ${item} </div>
                </div>
            `,
							)
							.join("")}
       </div>`;

	// console.log(cards, "cards");

	const parser = new DOMParser().parseFromString(cards, "text/html");

	// console.log(parser, "DOMParser Method");

	gameBoard.replaceWith(parser.querySelector(".mainBoard"));
};

//It is being executed from GameInit function
const randomDistribution = (array, items) => {
	const randomPicks = [];

	for (let index = 0; index < items; index++) {
		const randomIndex = Math.floor(Math.random() * array.length);

		randomPicks.push(array[randomIndex]);
		array.splice(randomIndex, 1);
	}

	return randomPicks;
};

//The function below receives an array that contains the photos provided in the assignment
//Then shuffles them so the photos are not in order
const shufflingTheGame = (array) => {
	for (let index = array.length - 1; index > 0; index--) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		const original = array[index];

		array[index] = array[randomIndex];
		array[randomIndex] = original;
	}

	return array;
};

//It is just a function that tells me that the game started so I calculate stats
//I haven't used it that much because it will make me late to handover my project
//But in the model structure, it is important to add game started and game ended.
const GameStarted = () => {
	memoryGameModel.Started = true;
};

//Event listener invoked to listen to the click event
const eventListenerOfFlippingCards = () => {
	document.addEventListener("click", (event) => {
		//
		//console.log(event.target, "event.target");
		//console.log(event.target.parentElement, "eventTarget.parentElement");

		//Almost like the cart project
		//I'm trying to get the element's (HTML tag) class name
		const eventTarget = event.target;
		const eventParent = eventTarget.parentElement;

		if (
			eventTarget.className.includes("card") &&
			!eventParent.className.includes("flipped")
		) {
			showCard(eventParent);
		}
	});
};

//The action of flipping the card itself which was maily used in eventListenerOfFlippingCards function
//Here all the magic happens for the game where we check whether I flipped only 1 card or 2.
//If 1 card only was flipped nothing happens
//If 2 cards where flipped then I will check whether they match or not.
//And then I take an action if they match by removing them as required in the main project
//If they don't match then flip them back
//Before flipping them back, I should check whether the gamer exceeded his trial limit.
//The gamer trial limit was mainly 4 trials.
const showCard = (card) => {
	memoryGameModel.Flipped++;
	memoryGameModel.totalFlips++;

	if (!memoryGameModel.Started) {
		GameStarted();
	}

	//Here changing the class name to reveal the actual cards that are flipped
	if (memoryGameModel.Flipped <= 2) {
		card.classList.add("flipped");
	}

	//Here is a nested if statement to check the match and unmatched
	if (memoryGameModel.Flipped === 2) {
		//flippedCards is an array of length 2 that contains the elements that are flipped
		const flippedCards = document.querySelectorAll(".flipped:not(.matched)");

		console.log(flippedCards, "flippedCards");

		if (flippedCards[0].innerText === flippedCards[1].innerText) {
			flippedCards[0].classList.add("matched");
			flippedCards[1].classList.add("matched");

			//If the cards match, I will reset the totalflips to be 0
			memoryGameModel.totalFlips = 0;

			//hidding the cards if they match
			const matchedFlippedCards = document.querySelectorAll(".matched");
			// const classNames = document.getElementsByClassName(".matched");

			console.log(matchedFlippedCards, "matchedFlippedCards");

			// console.log(classNames, "classNames")
			setTimeout(() => {
				matchedFlippedCards.forEach((square) => {
					square.style.opacity = 0;
				});
			}, 1500);
		}

		setTimeout(() => {
			hideCards();
		}, 1000);

		console.log(memoryGameModel, "memoryGameModel");
	}
};

//If the two cards are not the same, flip them back to the blank (question mark) image.
const hideCards = () => {
	//Before flipping back the cards, I should check whether the gamer exceeded his trials "4"
	//4 trials mean that the totalFlips are 8
	if (memoryGameModel.totalFlips >= 8) {
		// console.log("Play Again");
		window.location.href =
			"file:///C:/RCC/RCCProjects/Project%202%20Memory%20Game/playAgain.html";
	}

	document.querySelectorAll(".card:not(.matched)").forEach((card) => {
		card.classList.remove("flipped");
	});

	memoryGameModel.Flipped = 0;

	// Here we have a winner woohooo!!
	if (!document.querySelectorAll(".card:not(.flipped)").length) {
		window.location.href =
			"file:///C:/RCC/RCCProjects/Project%202%20Memory%20Game/winner.html";
	}
};

window.onload = function () {
	GameInit();
	GameStarted();
	eventListenerOfFlippingCards();
};
