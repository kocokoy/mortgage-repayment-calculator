const calculateButton = document.querySelector('.jsCalculateRepayments');
const mortgageAmountElement = document.querySelector('.jsMortageAmount');


calculateButton.addEventListener('click', () => {
  console.log(mortgageAmountElement.value);

})