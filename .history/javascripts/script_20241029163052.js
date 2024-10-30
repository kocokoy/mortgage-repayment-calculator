const calculateButton = document.querySelector('.jsCalculateRepayments');
const mortgageAmountElement = document.querySelector('.jsMortageAmount');
const mortgageTermElement = document.querySelector('.jsMortgageTerm');
const mortgageInterestElement = document.querySelector('.jsMortgageInterest');
// radio buttons
const repaymentRadioElement = document.querySelector('.jsRepaymentRadio');


calculateButton.addEventListener('click', () => {
  console.log(mortgageAmountElement.value);
  console.log(mortgageTermElement.value);
  console.log(mortgageInterestElement.value);

})

let ifClicked = false;

repaymentRadioElement.addEventListener('click', () =>{
  console.log(repaymentRadioElement);
})

