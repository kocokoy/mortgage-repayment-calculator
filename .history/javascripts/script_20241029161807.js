const calculateButton = document.querySelector('.jsCalculateRepayments');
const mortgageAmountElement = document.querySelector('.jsMortageAmount');
const mortgageTermElement = document.querySelector('.jsMortgageTerm');
const mortgageInterestElement = document.querySelector('.jsMortgageInterest');


calculateButton.addEventListener('click', () => {
  console.log(mortgageAmountElement.value);
  console.log(mortgageTermElement.value);
  console.log(mortgageInterestElement.value);

})