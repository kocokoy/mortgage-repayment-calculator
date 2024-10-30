const calculateButton = document.querySelector('.jsCalculateRepayments');
const mortgageAmountElement = document.querySelector('.jsMortageAmount');
const mortgageTermElement = document.querySelector('.jsMortgageTerm');
const mortgageInterestElement = document.querySelector('.jsMortgageInterest');
// radio buttons
const repaymentRadioElement = document.querySelector('.jsRepaymentRadio');
const interestRadioElement = document.querySelector('.jsRepaymentInterest');


calculateButton.addEventListener('click', () => {
  console.log(mortgageAmountElement.value);
  console.log(mortgageTermElement.value);
  console.log(mortgageInterestElement.value);

})

let repaymentRadioClicked = false;
let interestRadioClicked = false;

repaymentRadioElement.addEventListener('click', () =>{
  if(repaymentRadioClicked){
    repaymentRadioElement.checked = false;
    repaymentRadioClicked = false;
  }else{
    repaymentRadioClicked = true;
    interestRadioElement.checked = false;
    interestRadioClicked = false;
  }
});

interestRadioElement.addEventListener('click', () =>{
  if(interestRadioClicked){
    interestRadioElement.checked = false;
    interestRadioClicked = false;
  }else{
    interestRadioClicked = true;
  }
});

