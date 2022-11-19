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

	gettingTotalAmount();
});

//After everytime the customer adjust the quantity, I'm calling this function to re calculate the total amount.
function gettingTotalAmount() {
	var totalAmountElement = document.getElementById("total-amount");
	var gettingAllSubtotals = document.getElementsByClassName("total-price");

	var total = 0;
	for (var i = 0; i < gettingAllSubtotals.length; i++) {
		var gettingParentProductDiv =
			gettingAllSubtotals[i].previousSibling.parentElement.previousSibling
				.parentElement;

		if (gettingParentProductDiv.classList[1] !== "deleteThisOne") {
			total = total + Number(gettingAllSubtotals[i].innerHTML.replace("$", ""));
		}
	}

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
};
