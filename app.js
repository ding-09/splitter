// initialize the 3 main variables
let billAmount = 0;
let tipPercentage = 0;
let numOfPpl = 0;

// UI LOGIC

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
  }
});

// 3. allow reset button to be clickable when there is user input

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
});

