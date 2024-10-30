const calculateButton = document.querySelector('.jsCalculateRepayments');
const mortgageAmountElement = document.querySelector('.jsMortageAmount');
const mortgageTermElement = document.querySelector('.jsMortgageTerm');
const mortgageInterestElement = document.querySelector('.jsMortgageInterest');
// radio buttons
const repaymentRadioElement = document.querySelector('.jsRepaymentRadio');
const interestRadioElement = document.querySelector('.jsRepaymentInterest');
// result side
const resultSideElement = document.querySelector('.jsResultSide');

let totalRepayment = 0;
let monthlyPayment = 0;
let repaymentRadioClicked = false;
let interestRadioClicked = false;


MortgageTypeBtnClicked();
displayResult();
calculateButton.addEventListener('click', () => {
  const mortgageAmount =  IntegerConverter(mortgageAmountElement.value);
  const mortgageTerm =  IntegerConverter(mortgageTermElement.value);
  const mortgageInterest =  IntegerConverter(mortgageInterestElement.value);

  if(repaymentRadioClicked){
    console.log('test')
    CalcuteRepayment(mortgageAmount,mortgageTerm,mortgageInterest);
  }
});



function MortgageTypeBtnClicked(){
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
  if(str.includes('.')){
    return parseFloat(str);
  };
    return parseInt(str.replace(/,/g, ''));
}

function CalcuteRepayment(amount,years,interest){
  let months = 12;
  let monthlyInterestRate = ((interest/months)/100);
  let totalPayments = (years*months);
  let numerator = (amount * monthlyInterestRate);
  let denominator = (1 - Math.pow(1 + monthlyInterestRate,(-1*totalPayments)));
  monthlyPayment = (numerator/denominator);
  totalRepayment =  (monthlyPayment*totalPayments);
  displayResult();
}

function displayResult(){
  const div = document.createElement('div');
  div.classList.add('result-populate');
  div.innerHTML = `
          <div class="result-populate-title">
            Your results
          </div>
          <div class="result-populate-message">
            Your results are shown below based on the information you provided.
            To adjust the results. edit the form and click "calculate repayments" again.
          </div>
          <div class="result-populate-repayment">
            <div class="result-populate-repayment-monthly">
              <p>Your monthly repayments</p>
              <div class="jsMonthlyRepayment">${monthlyPayment}}</div>
            </div>
            <div class="result-populate-repayment-total">
              <p>Total you'll repay over the term</p>
              <div class="jsRepaymentTotal">${totalRepayment}</div>
            </div>
          </div>`;

  const div2 = document.createElement('div');
  div2.classList.add('result-empty');
  div2.innerHTML = `
           <div>
            <img src="/assets/images/illustration-empty.svg" alt="">
          </div>
          <div class="result-side-title">Results shown here</div>
          <div class="result-side-text">  Complete the form and click “calculate repayments” to see what 
            your monthly repayments would be.</div>`;

  if(monthlyPayment && totalRepayment){
    resultSideElement.innerHTML = div.innerHTML;
  } else {
    resultSideElement.innerHTML = div2.innerHTML;
  }
}
