/** @format */

window.onload = function () {
	//get the image elements by the tag name
	var images = document.getElementsByTagName("img");

	//use an array and a for loop to iterate over the pictures
	for (var i = 0; i < images.length; i++) {
		//when you click on the pictures in the image array, assign to the showAnswer handler;
		images[i].onclick = showAnswer;
	}
};

function showAnswer(eventObj) {
	// console.log(eventObj.target, "event");

	//instaniate the image var using eventObj with the target method
	var image = eventObj.target;

	//instantiate the name var using image with the id tag
	var name = image.id;

	//make sure you handle the names of the normal (not blurred) photos using string concatenation
	name = name + ".jpg";
	image.src = name;

	//set a 2 second timeout for the reblur
	setTimeout(reblur, 2000, image);
}

function reblur(image) {
	//instantiate the name var using image with the id method
	var name = image.id;

	//make sure you handle the name of the blur file using string concatenation
	name = name + "blur.jpg";
	image.src = name;
}
