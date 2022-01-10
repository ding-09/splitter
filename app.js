// initialize variables for main function splitBill()
let billAmount = 0;
let tipPercentage = 0;
let numOfPpl = 0;

// MAIN APP FUNCTION
/* 
  calculate tip per person and total per person based on:
  1) total bill amount
  2) tip percentage
  3) number of people
*/
const splitBill = (billAmount, tipPercentage, numOfPpl) => {
  // calculate total tip amount based on tipPercentage input
  const tipTotal = billAmount * (tipPercentage / 100);

  // calculate tip per person
  const tipPerPerson = tipTotal / numOfPpl;

  // calculate split per person based on bill + tip
  const totalPerPerson = (billAmount + tipTotal) / numOfPpl;

  return { tipPerPerson, totalPerPerson };
};

// UI
const main = document.querySelector('main');
const tipBtns = document.querySelectorAll('.tip-btn');
const resetBtn = document.querySelector('.reset');
const bill = document.querySelector('#bill-amount');
const customTip = document.querySelector('#custom-tip');
const numOfPeople = document.querySelector('#num-of-ppl');
const tipAmountDisplay = document.querySelector('#tip-per-person');
const totalAmountDisplay = document.querySelector('#total-per-person');

// UI FUNCTIONS

// enable reset button when there is input
const enableReset = () => {
  if (!billAmount && !tipPercentage & !numOfPpl) {
    resetBtn.setAttribute('disabled', '');
    resetBtn.classList.remove('reset-btn-active');
  }
  if (billAmount || tipPercentage || numOfPpl) {
    // remove disabled attribute
    resetBtn.removeAttribute('disabled');

    // add active class
    resetBtn.classList.add('reset-btn-active');
  }
};

// calculate results and update info-display
const calculateAndUpdate = () => {
  if (billAmount && tipPercentage && numOfPpl) {
    const { tipPerPerson, totalPerPerson } = splitBill(
      billAmount,
      tipPercentage,
      numOfPpl
    );
    tipAmountDisplay.textContent = tipPerPerson.toFixed(2);
    totalAmountDisplay.textContent = totalPerPerson.toFixed(2);
  }
};

// add active tip styles
const addActiveTipStyles = (event) => {
  // first remove active class from all tip buttons
  tipBtns.forEach((btn) => {
    btn.classList.remove('tip-btn-active');
  });

  // then add active class to the current clicked button
  event.target.classList.add('tip-btn-active');
};

// remove active tip styles
const removeActiveTipStyles = (event) => {
  // iterate through tip buttons to remove active class
  tipBtns.forEach((btn) => {
    if (btn.classList.contains('tip-btn-active')) {
      btn.classList.remove('tip-btn-active');
    }
  });
};

const addError = (event, errorEl) => {
  errorEl.style.display = 'inline';
  event.target.classList.add('error-outline');
};

const removeError = (event, errorEl) => {
  errorEl.style.display = 'none';
  event.target.classList.remove('error-outline');
};

// reset everything back to 0
const resetAll = () => {
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
};

// EVENT LISTENERS

// enable reset button if there is input
main.addEventListener('keyup', enableReset);

// get user input value for bill amount and store it in variable
bill.addEventListener('input', (event) => {
  billAmount = parseFloat(event.target.value);
  calculateAndUpdate();
});

// get user tip % selection
tipBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    // add an active style class to whichever tip button is clicked
    addActiveTipStyles(event);

    // remove custom tip value if there is a pre-existing one
    if (tipPercentage) {
      tipPercentage = 0;
      customTip.value = '';
    }

    // convert user selection to a number and store it in a varible
    const tip = parseFloat(event.target.dataset.tipPercentage);
    tipPercentage = tip;

    // enable reset button
    enableReset();

    // calculate results
    calculateAndUpdate();
  });
});

// CUSTOM TIP LOGIC
// if custom tip is clicked, deselect tip buttons and reset tip percentage back to 0
customTip.addEventListener('click', (event) => {
  // remove any active tip button on click of the custom tip input field
  removeActiveTipStyles(event);

  // reset tip percentage to 0
  tipPercentage = 0;

  // reset info-display to $0.00
  tipAmountDisplay.textContent = '0.00';
  totalAmountDisplay.textContent = '0.00';
});

customTip.addEventListener('input', (event) => {
  // store input if input is valid
  if (event.target.value) {
    tipPercentage = parseFloat(event.target.value);
    calculateAndUpdate();
  }
});

// add an error class + error msg display if user enters 0 for number of people
numOfPeople.addEventListener('input', (event) => {
  // store user input in a temp variable first to check if input is valid
  const numInput = parseInt(event.target.value);
  const errorEl = event.target.previousElementSibling;

  // display error if user enters 0 (invalid input)
  if (numInput === 0) {
    addError(event, errorEl);
  } else {
    // remove error styling if user enters valid input and calculate results
    removeError(event, errorEl);
    calculateAndUpdate();
  }
});

// reset everything if reset button is clicked
resetBtn.addEventListener('click', resetAll);
