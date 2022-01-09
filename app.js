// initialize the 3 main variables
let billAmount = 0;
let tipPercentage = 0;
let numOfPpl = 0;

// UI LOGIC

// enable reset button if there is input from any one of the input fields
const resetBtn = document.querySelector('.reset');
const main = document.querySelector('main');
main.addEventListener('click', () => {
  if (billAmount || tipPercentage || numOfPpl) {
    // remove disabled attribute
    resetBtn.removeAttribute('disabled');

    // add active class
    resetBtn.classList.add('reset-btn-active');
  }
});

// 1. add an active style class to whichever tip button clicked
const tipBtns = document.querySelectorAll('.tip-btn');
tipBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    // first remove active class from all tip buttons
    tipBtns.forEach((btn) => {
      btn.classList.remove('tip-btn-active');
    });

    // then add active class to the current clicked button
    event.target.classList.add('tip-btn-active');

    // store clicked button's tip percentage value into actual variabble
    const tip = parseFloat(event.target.dataset.tipPercentage);
    tipPercentage = tip;

    // calculate and update if all variables have value
    if (billAmount && tipPercentage && numOfPpl) {
      calculateAndUpdate();
    }
  });
});

// 2. add an error class + error msg display if user enters 0 for number of people
const numOfPeople = document.querySelector('#num-of-ppl');

numOfPeople.addEventListener('input', (event) => {
  // if user input is 0, display error msg + add error class
  const numInput = parseInt(event.target.value);
  if (numInput === 0) {
    event.target.previousElementSibling.style.display = 'inline';
    event.target.classList.add('error-outline');
  } else {
    event.target.previousElementSibling.style.display = 'none';
    event.target.classList.remove('error-outline');
    numOfPpl = numInput;
    if (billAmount && tipPercentage && numOfPpl) {
      calculateAndUpdate();
    }
  }
});

// MAIN APP FUNCTION
// calculate tip per person and total per person based on:
// 1) total bill amount, 2) tip percentage, 3) number of people

const splitBill = (billAmount, tipPercentage, numOfPpl) => {
  // calculate tip amount
  const tipTotal = billAmount * (tipPercentage / 100);

  // calculate tip per person
  const tipPerPerson = tipTotal / numOfPpl;

  // calculate total per person
  const totalPerPerson = (billAmount + tipTotal) / numOfPpl;

  return { tipPerPerson, totalPerPerson };
};

// get user input value
const bill = document.querySelector('#bill-amount');
bill.addEventListener('input', (event) => {
  billAmount = parseFloat(event.target.value);
  if (billAmount && tipPercentage && numOfPpl) {
    calculateAndUpdate();
  }
});

// calculate results and update info-display
const tipAmountDisplay = document.querySelector('#tip-per-person');
const totalAmountDisplay = document.querySelector('#total-per-person');
const calculateAndUpdate = () => {
  const { tipPerPerson, totalPerPerson } = splitBill(
    billAmount,
    tipPercentage,
    numOfPpl
  );
  tipAmountDisplay.textContent = tipPerPerson.toFixed(2);
  totalAmountDisplay.textContent = totalPerPerson.toFixed(2);
};

// LOGIC FOR CUSTOM TIP
// if custom tip is clicked, deselect tip buttons and reset tip percentage back to 0
const customTip = document.querySelector('#custom-tip');
customTip.addEventListener('click', (event) => {
  // iterate through tip buttons to remove active class
  tipBtns.forEach((btn) => {
    if (btn.classList.contains('tip-btn-active')) {
      btn.classList.remove('tip-btn-active');
    }
  });

  // reset tip percentage to 0
  tipPercentage = 0;

  // reset info-display to $0.00
  tipAmountDisplay.textContent = '0.00';
  totalAmountDisplay.textContent = '0.00';
});

customTip.addEventListener('input', (event) => {
  if (event.target.value) {
    tipPercentage = parseFloat(event.target.value);
    if (billAmount && numOfPpl) {
      calculateAndUpdate();
    }
  }
});

// reset everything if reset button is clicked
resetBtn.addEventListener('click', () => {
  billAmount = 0;
  tipPercentage = 0;
  numOfPpl = 0;
  tipAmountDisplay.textContent = '0.00';
  totalAmountDisplay.textContent = '0.00';

  // input field reset
  bill.value = '';
  customTip.value = '';
  numOfPeople.value = '';

  // deselect any active tip button
  tipBtns.forEach((btn) => {
    btn.classList.remove('tip-btn-active');
  });

  // set reset button back to disabled and remove active class
  resetBtn.setAttribute('disabled', '');
  resetBtn.classList.remove('reset-btn-active');
});
