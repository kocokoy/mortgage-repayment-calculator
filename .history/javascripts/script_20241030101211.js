const calculateButton = document.querySelector('.jsCalculateRepayments');
const mortgageAmountElement = document.querySelector('.jsMortageAmount');
const mortgageTermElement = document.querySelector('.jsMortgageTerm');
const mortgageInterestElement = document.querySelector('.jsMortgageInterest');
// radio buttons
const repaymentRadioElement = document.querySelector('.jsRepaymentRadio');
const interestRadioElement = document.querySelector('.jsRepaymentInterest');


calculateButton.addEventListener('click', () => {
  const mortgageAmountValue = mortgageAmountElement.value;
  const mortgageTermValue = mortgageTermElement.value;
  const mortgageInterestValue = mortgageInterestElement.value;
  console.log(IntegerConverter(mortgageAmountValue));
  console.log(IntegerConverter(mortgageTermValue));
  console.log(IntegerConverter(mortgageInterestValue));


});

MortgageTypeBtnClicked();

function MortgageTypeBtnClicked(){
  let repaymentRadioClicked = false;
  let interestRadioClicked = false;
  
  const repaymentParentLabel = repaymentRadioElement.parentElement;
  const interestParentLabel = interestRadioElement.parentElement;
  
  repaymentRadioElement.addEventListener('click', () =>{
    if(repaymentRadioClicked){
      repaymentParentLabel.classList.remove('mortgage-calculator-type-radio-clicked');
      repaymentRadioElement.checked = false;
      repaymentRadioClicked = false;
    }else{
      repaymentRadioClicked = true;
      repaymentParentLabel.classList.add('mortgage-calculator-type-radio-clicked');
      interestParentLabel.classList.remove('mortgage-calculator-type-radio-clicked');
      interestRadioElement.checked = false;
      interestRadioClicked = false;
    }
  });
  
  interestRadioElement.addEventListener('click', () =>{
    if(interestRadioClicked){
      interestParentLabel.classList.remove('mortgage-calculator-type-radio-clicked');
      interestRadioElement.checked = false;
      interestRadioClicked = false;
    }else{
      repaymentParentLabel.classList.remove('mortgage-calculator-type-radio-clicked');
      interestParentLabel.classList.add('mortgage-calculator-type-radio-clicked');
      interestRadioClicked = true;
      repaymentRadioElement.checked = false;
      repaymentRadioClicked = false;
    }
  });
};

function IntegerConverter(str){
  return parseInt(str.replace(/,/g, ''));
}
