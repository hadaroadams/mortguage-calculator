const btn = document.querySelectorAll("button");
const amoutInput = document.querySelector("#amountInput");
const termInput = document.querySelector("#termInput");
const rateInput = document.querySelector("#rateInput");
const repaymentRadio = document.querySelector("#option1");
const interestRadio = document.querySelector("#option2");
const monthlyAmountSpan = document.querySelector("#monthlyAmount");
const termAmountSpan = document.querySelector("#termAmount");
const onClearDiv = document.querySelector(".onClearDiv");
const oncalculatedDiv = document.querySelector(".oncalculatedDiv");

console.log(amoutInput, termInput, rateInput, repaymentRadio, interestRadio);

const mortgageVariables = {
  amount: 0,
  numOfYears: 0,
  rate: 0,
  mortType: "",
};
amoutInput.addEventListener("input", function (e) {
  mortgageVariables.amount = parseFloat(e.target.value);
  amoutInput.previousElementSibling.classList.remove("errorSpan");
  amoutInput.parentElement.classList.remove("errorDiv");
  amoutInput.parentElement.nextElementSibling.classList.remove("show");

  console.log(mortgageVariables);
});
termInput.addEventListener("input", (e) => {
  mortgageVariables.numOfYears = parseFloat(e.target.value);
  console.log(mortgageVariables);
  termInput.previousElementSibling.classList.remove("errorSpan");
  termInput.parentElement.classList.remove("errorDiv");
  termInput.parentElement.nextElementSibling.classList.remove("show");
});
rateInput.addEventListener("input", (e) => {
  console.log(parseInt(e.target.value));
  mortgageVariables.rate = parseFloat(e.target.value);
  console.log(mortgageVariables);
  rateInput.previousElementSibling.classList.remove("errorSpan");
  rateInput.parentElement.classList.remove("errorDiv");
  rateInput.parentElement.nextElementSibling.classList.remove("show");
});
repaymentRadio.addEventListener("change", () => {
  mortgageVariables.mortType = "replayment";
  console.log(mortgageVariables);
  interestRadio.parentElement.nextElementSibling.classList.remove("show");
});
interestRadio.addEventListener("change", () => {
  mortgageVariables.mortType = "interstOnly";
  console.log(mortgageVariables);
  interestRadio.parentElement.nextElementSibling.classList.remove("show");
});

function repaymentCalc(amount, years, rate) {
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthlyAmount = (amount * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  console.log(monthlyAmount * 25 * 12);
  return monthlyAmount;
}
repaymentCalc(300000, 25, 5.25);

function interestCalc(amount, rate) {
  const r = rate / 100 / 12;
  const monthlyInterest = amount * r;
  return monthlyInterest;
}

function displayResults() {
  const { amount, numOfYears, rate, mortType } = mortgageVariables;
  oncalculatedDiv.classList.remove("hide");
  oncalculatedDiv.classList.add("show");
  onClearDiv.classList.add("hide");
  if (!amount || !numOfYears || !rate || !mortType) {
    oncalculatedDiv.classList.add("hide");
    onClearDiv.classList.remove("hide");
    onClearDiv.classList.add("show");
    console.log("hello");
    if (!amount) {
      console.log(amount);
      amoutInput.previousElementSibling.classList.add("errorSpan");
      amoutInput.parentElement.classList.add("errorDiv");
      amoutInput.parentElement.nextElementSibling.classList.add("show");
    }
    if (!numOfYears) {
      termInput.previousElementSibling.classList.add("errorSpan");
      termInput.parentElement.classList.add("errorDiv");
      termInput.parentElement.nextElementSibling.classList.add("show");
    }
    if (!rate) {
      rateInput.previousElementSibling.classList.add("errorSpan");
      rateInput.parentElement.classList.add("errorDiv");
      rateInput.parentElement.nextElementSibling.classList.add("show");
    }
    if (!mortType) {
      console.log("here to");
      interestRadio.parentElement.nextElementSibling.classList.add("show");
    }
  } else {
    if (mortType === "replayment") {
      const monthlyAmountPayment = repaymentCalc(amount, numOfYears, rate);
      monthlyAmountSpan.innerText = monthlyAmountPayment.toFixed(2);
      termAmountSpan.innerHTML = (
        monthlyAmountPayment *
        numOfYears *
        12
      ).toFixed(2);
    }
    if (mortType === "interstOnly") {
      const monthlyInterestPayment = interestCalc(amount, rate);
      monthlyAmountSpan.innerText = monthlyInterestPayment.toFixed(2);
      termAmountSpan.innerHTML = (
        monthlyInterestPayment *
        numOfYears *
        12
      ).toFixed(2);
    }
  }
}

btn.forEach((item) => {
  item.onclick = (e) => {
    e.preventDefault();
    const button = e.target;
    if (button.id === "calculate") {
      console.log(button);
      displayResults();
    }
    if (button.id === "clear") {
      setDefault();
    }
  };
});

function setDefault() {
  mortgageVariables.amount = 0;
  mortgageVariables.numOfYears = 0;
  mortgageVariables.rate = 0;
  mortgageVariables.mortType = "";
  amoutInput.value = null;
  termInput.value = null;
  rateInput.value = null;
  interestRadio.checked = false;
  repaymentRadio.checked = false;
  oncalculatedDiv.classList.add("hide");
  onClearDiv.classList.remove("hide");
  onClearDiv.classList.add("show");

  console.log(oncalculatedDiv, onClearDiv);
}
// displayResults();
