// Get references to form and inputs
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");

// Display elements
const cvcDisplay = document.getElementById("cvc-display");
const nameDisplay = document.getElementById("card-name-display");
const numberDisplay = document.getElementById("card-number-display");
const monthYearDisplay = document.getElementById("month-year-display");

// Get references to error messages and required fields
const inputs = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".false");

// Regular expression for card number validation
const pattern = /^(\d{4}[-\s]?){3}\d{4}$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Validate each field
  if (!nameValidate()) isValid = false;
  if (!numberValidate()) isValid = false;
  if (!monthValidate()) isValid = false;
  if (!yearValidate()) isValid = false;
  if (!cvcValidate()) isValid = false;

  // Show completion message if all validations pass
  if (isValid) {
    showCompletion();
  }
});

// Update card display functions
function updateCardDisplay() {
  nameDisplay.textContent = nameInput.value || "Jane Appleseed";
  numberDisplay.textContent = formatCardNumber(numberInput.value) || "0000 0000 0000 0000";
  monthYearDisplay.textContent = `${monthInput.value || "00"}/${yearInput.value || "00"}`;
  cvcDisplay.textContent = cvcInput.value || "000";
}

// Format card number with spaces
function formatCardNumber(number) {
  // Remove all non-digit characters
  const cleanedCardNumber = number.replace(/\D/g, "");
  // Format card number with spaces
  return cleanedCardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function setError(index) {
  inputs[index].style.border = "1px solid var(--primary-400)";
  spans[index].style.display = "block";
}

function setErrorWithoutSpan(index) {
  inputs[index].style.border = "1px solid var(--primary-400)";
}

function removeError(index) {
  inputs[index].style.border = "";
  spans[index].style.display = "none";
}

function nameValidate() {
  if (nameInput.value.trim().length === 0) {
    setError(0);
    return false;
  } else {
    removeError(0);
    updateCardDisplay();
    return true;
  }
}

function numberValidate() {

  // Test the cleaned card number against the pattern
  if (pattern.test(numberInput.value)) {
    removeError(1);
    updateCardDisplay();
    return true;
  } else {
    setError(1);
    return false;
  }
}

function monthValidate() {
  if (monthInput.value.length < 2) {
    setError(2);
    return false;
  } else {
    removeError(2);
    updateCardDisplay();
    return true;
  }
}

function yearValidate() {
  if (yearInput.value.length < 2) {
    setErrorWithoutSpan(3);
    return false;
  } else {
    removeError(3);
    updateCardDisplay();
    return true;
  }
}

function cvcValidate() {
  if (cvcInput.value.length < 3) {
    setError(4);
    return false;
  } else {
    removeError(4);
    updateCardDisplay();
    return true;
  }
}

function showCompletion() {
  // Hide form and show completion message
  form.style.display = "none";
  document.querySelector(".completed").classList.remove("hidden");
}
