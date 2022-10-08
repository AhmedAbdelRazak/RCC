/** @format */

var ulElement = document.createElement("ul");
document.body.appendChild(ulElement);
const scoopArray = ["Scoop1", "Scoop2", "Scoop3"];
var loopEnd = scoopArray.length;
var i = 0;
while (i < loopEnd) {
	let liElement = document.createElement("li");
	let text = document.createTextNode(scoopArray[i] + " Delicious Icecream ;)");
	liElement.appendChild(text);
	liElement.style.listStyle = "none";
	liElement.style.marginTop = "10px";
	ulElement.appendChild(liElement);
	i++;
}
