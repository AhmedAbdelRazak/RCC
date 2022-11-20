/** @format */

//getting the initial total amount in the cart onloading the page
window.onload = function () {
	var totalAmountElement = document.getElementById("total-amount");
	var gettingAllSubtotals = document.getElementsByClassName("total-price");
	var emptyCartElement = document.getElementById("emptycart");
	emptyCartElement.style.display = "none";

	var total = 0;
	for (var i = 0; i < gettingAllSubtotals.length; i++) {
		total = total + Number(gettingAllSubtotals[i].innerHTML.replace("$", ""));
	}

	totalAmountElement.innerHTML = `<hr />Total Amount: $${total}<hr /> `;
};

//End of initial total amount

//Minus Btn event handler
$(".minus-btn").on("click", function (e) {
	e.preventDefault();
	var $this = $(this);
	var $input = $this.closest("div").find("input");
	var value = parseInt($input.val());

	if (isNaN(value)) {
		value = 1;
	} else if (value <= 0) {
		value = 1;
	} else if (value > 1) {
		value = value - 1;
	} else {
		value = 1;
	}

	$input.val(value);

	//Here, after the customer adjusts the quantity, I should calculate the subtotal for this specific product.
	// I used the same approach as in this program already which is .closest("div").find but I will find a class name ".unit-price"

	var unitPriceElement = $this.closest("div").find(".unit-price");
	var unitPricee = unitPriceElement[0].innerHTML.replace("$", "");

	var totalPriceElement = $this.closest("div").find(".total-price");

	totalPriceElement[0].innerHTML = "$" + value * unitPricee;

	//calling the gettingTotalAmount function to update the total amount
	gettingTotalAmount();
});

$(".plus-btn").on("click", function (e) {
	e.preventDefault();
	var $this = $(this);
	var $input = $this.closest("div").find("input");
	var value = parseInt($input.val());

	if (value < 100) {
		value = value + 1;
	} else {
		value = 100;
	}

	$input.val(value);

	var unitPriceElement = $this.closest("div").find(".unit-price");
	var unitPricee = unitPriceElement[0].innerHTML.replace("$", "");

	var totalPriceElement = $this.closest("div").find(".total-price");

	totalPriceElement[0].innerHTML = "$" + value * unitPricee;

	//calling the gettingTotalAmount function to update the total amount
	gettingTotalAmount();
});

//After everytime the customer adjust the quantity, I'm calling this function to re calculate the total amount.
function gettingTotalAmount() {
	var totalAmountElement = document.getElementById("total-amount");
	var gettingAllSubtotals = document.getElementsByClassName("total-price");

	var total = 0;

	//Here, I'm trying to get all products with a class name not equal "deleteThisOne"
	for (var i = 0; i < gettingAllSubtotals.length; i++) {
		var gettingParentProductDiv =
			gettingAllSubtotals[i].previousSibling.parentElement.previousSibling
				.parentElement;

		if (gettingParentProductDiv.classList[1] !== "deleteThisOne") {
			total = total + Number(gettingAllSubtotals[i].innerHTML.replace("$", ""));
		}
	}

	//Here I'm checking if the total still 0 after the above for loop is done.
	//If the total is 0, then the cart is empty.
	if (total === 0) {
		var emptyCartElement = document.getElementById("emptycart");
		var buttonEmptyCart = document.getElementById("myButton");
		var buttonResetCart = document.getElementById("myButton2");
		emptyCartElement.style.display = "block";
		buttonEmptyCart.style.display = "none";
		buttonResetCart.style.display = "block";
	}

	totalAmountElement.innerHTML = `<hr />Total Amount: $${total}<hr /> `;
}

$(".like-btn").on("click", function () {
	$(this).toggleClass("is-active");
});

$(".delete-btn").on("click", function () {
	var $this = $(this);

	//gettingParentProductDiv is simply to render the parent div w/n a product
	//after knowing getting the parent div, I assigned a class "deleteThisOne" and it is styled as display:none
	var gettingParentProductDiv =
		$this[0].previousSibling.parentElement.previousSibling.parentElement;

	gettingParentProductDiv.classList.add("deleteThisOne");

	gettingTotalAmount();
});

document.getElementById("myButton").onclick = function () {
	window.location.href = "/purchaseComplete.html";
};

document.getElementById("myButton2").onclick = function () {
	window.location.reload();

	// chaining all ships to one variable (ships)
	var ships = [
		{ locations: ["10", "20", "30"], hits: ["", "", ""] },
		{ locations: ["32", "33", "34"], hits: ["", "", ""] },
		{ locations: ["63", "64", "65"], hits: ["", "", ""] },
	];

	// instead of:
	var ship1 = { locations: ["10", "20", "30"], hits: ["", "", ""] };
	var ship2 = { locations: ["32", "33", "34"], hits: ["", "", ""] };
	var ship3 = { locations: ["63", "64", "65"], hits: ["", "", ""] };

	console.log(ships);
};
