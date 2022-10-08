/** @format */

//Creating an unordered list element to store the array in it
var ulElement = document.createElement("ul");
document.body.appendChild(ulElement);
//Creating Scoop Array To iterate
const scoopArray = ["Scoop1", "Scoop2", "Scoop3"];

//loop should end after iterating through array scoopArray
var loopEnd = scoopArray.length;

//initial value

var i = 0;
while (i < loopEnd) {
	let liElement = document.createElement("li");
	let text = document.createTextNode(scoopArray[i] + " Delicious Icecream ;)");
	liElement.appendChild(text);
	liElement.style.listStyle = "none";
	liElement.style.marginTop = "10px";
	ulElement.appendChild(liElement);
	if (i < loopEnd) {
		return window.alert("I ran out of ice cream. I'm not stingy I promise :)");
	}
	i++;
}
