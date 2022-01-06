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
  }
});

// 3. allow reset button to be clickable when there is user input
