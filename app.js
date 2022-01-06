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


// 2. add an error class + error msg displaya if user enters 0 for number of people

// 3. allow reset button to be clickable when there is user input
