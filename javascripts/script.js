const calculateButton = document.querySelector('.jsCalculateRepayments');
const mortgageAmountElement = document.querySelector('.jsMortageAmount');
const mortgageTermElement = document.querySelector('.jsMortgageTerm');
const mortgageInterestElement = document.querySelector('.jsMortgageInterest');
// radio buttons
const repaymentRadioElement = document.querySelector('.jsRepaymentRadio');
const interestRadioElement = document.querySelector('.jsRepaymentInterest');
// result side
const resultSideElement = document.querySelector('.jsResultSide');
const fieldRequireElement = document.querySelectorAll('.field-require-text');

let totalRepayment = '';
let monthlyPayment = '';
let repaymentRadioClicked = false;
let interestRadioClicked = false;


MortgageTypeBtnClicked();
displayResult();
calculateButton.addEventListener('click', () => {
  const mortgageAmount =  IntegerConverter(mortgageAmountElement.value);
  const mortgageTerm =  IntegerConverter(mortgageTermElement.value);
  const mortgageInterest =  IntegerConverter(mortgageInterestElement.value);

  if(!(mortgageAmount && mortgageTerm && mortgageInterest && (repaymentRadioClicked || interestRadioClicked))){
    fieldRequireElement.forEach(element => {
      element.classList.add('field-require-text-empty');
    })
  }else{
    fieldRequireElement.forEach(element => {
      element.classList.remove('field-require-text-empty');
    })
    if(repaymentRadioClicked){
      CalcuteRepayment(mortgageAmount,mortgageTerm,mortgageInterest);
    }else{
      CalcuteInterestOnly(mortgageAmount,mortgageTerm,mortgageInterest);
    }
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
  console.log(denominator);
  console.log(numerator);
  let monthlyPayments = (numerator/denominator).toFixed(2);
  monthlyPayment = Number((numerator/denominator).toFixed(2)).toLocaleString();
  totalRepayment =  Number((monthlyPayments * totalPayments).toFixed(2)).toLocaleString();
  console.log(totalRepayment);
  displayResult();
}

function CalcuteInterestOnly(amount,years,interest){
  let months = 12;
  interest /= 100;
  let numerator = (amount * interest);
  // let monthlyPayments = (numerator/denominator).toFixed(2);
  monthlyPayment = Number((numerator/months).toFixed(2)).toLocaleString();
  totalRepayment =  Number((numerator*years).toFixed(2)).toLocaleString();
  console.log(monthlyPayment);
  console.log(totalRepayment);
  displayResult();
}

function displayResult(){
  const div = document.createElement('div');
  div.classList.add('result-populate');
  div.innerHTML =  `
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
              <div class="jsMonthlyRepayment">&#8369;${monthlyPayment}</div>
            </div>
            <div class="result-populate-repayment-total">
              <p>Total you'll repay over the term</p>
              <div class="jsRepaymentTotal">&#8369;${totalRepayment}</div>
            </div>
          </div>`;

  if(monthlyPayment && totalRepayment){
    resultSideElement.innerHTML = ""; // Clear previous content
    resultSideElement.appendChild(div); // Append the new content
  } 
}

