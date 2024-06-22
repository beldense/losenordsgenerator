const countSlider = document.getElementById("count-slider");
const cardTextLength = document.getElementById("card-text-length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("gen-btn");
const passwordDisplay = document.getElementById("header-text");
const strengthValue = document.getElementById("strength-great");
const header = document.querySelector(".header");
const bars = document.querySelectorAll(".bar-segment");

document.getElementById("count-slider").oninput = function () {
  let value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, #A638F6 0%, #A638F6 " +
    value +
    "%, #666 " +
    value +
    "%, #666 100%)";
};

countSlider.addEventListener("input", () => {
  const selectedValue = countSlider.value;
  cardTextLength.textContent = selectedValue;
});

header.addEventListener("click", function () {
  const textToCopy = document.getElementById("header-text").textContent;
  const textArea = document.createElement("textarea");

  textArea.value = textToCopy;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
});

generateButton.addEventListener("click", () => {
  const length = countSlider.value;
  const useUppercase = uppercaseCheckbox.checked;
  const useLowercase = lowercaseCheckbox.checked;
  const useNumbers = numbersCheckbox.checked;
  const useSymbols = symbolsCheckbox.checked;

  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
    alert("Please select at least one character type.");
    return;
  }

  const password = generatePassword(
    length,
    useUppercase,
    useLowercase,
    useNumbers,
    useSymbols
  );
  passwordDisplay.textContent = password;

  const strength = assessPasswordStrength(password);
  setStrengthText(strength);

  const barsToColor = document.querySelectorAll(".one, .two, .three, .four");

  let barsToColorCount = 4;
  if (strength === "Very Weak") {
    barsToColorCount = 1;
  } else if (strength === "Weak") {
    barsToColorCount = 2;
  } else if (strength === "Medium") {
    barsToColorCount = 3;
  }

  barsToColor.forEach((bar, index) => {
    if (barsToColorCount === 4) {
      bar.style.backgroundColor = "#4ABEA0";
    } else if (index < barsToColorCount) {
      bar.style.backgroundColor = "#FFA257";
    } else {
      bar.style.backgroundColor = "transparent";
    }
  });
});

function generatePassword(
  length,
  useUppercase,
  useLowercase,
  useNumbers,
  useSymbols
) {
  const characterSets = [];

  if (useUppercase) {
    characterSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }
  if (useLowercase) {
    characterSets.push("abcdefghijklmnopqrstuvwxyz");
  }
  if (useNumbers) {
    characterSets.push("0123456789");
  }
  if (useSymbols) {
    characterSets.push("!@#$%^&*()_+[]{}|;:,.<>?");
  }

  if (characterSets.length === 0) {
    alert("Please select at least one character type.");
    return "";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomCharSet =
      characterSets[Math.floor(Math.random() * characterSets.length)];
    const randomIndex = Math.floor(Math.random() * randomCharSet.length);
    password += randomCharSet[randomIndex];
  }

  return password;
}

function assessPasswordStrength(password) {
  let strValue = 3;

  if (password.length < 4) {
    strValue = 1;
    return "Very Weak";
  }

  if (password.length < 8) {
    strValue = 2;
    return "Weak";
  }

  if (
    password.length > 11 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)
  ) {
    strValue = 4;
    return "Great";
  }

  return "Medium";
}

function setStrengthText(strength) {
  strengthValue.textContent = strength;
}
