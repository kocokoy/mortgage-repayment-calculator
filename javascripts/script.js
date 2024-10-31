const calculateButton = document.querySelector('.jsCalculateRepayments');
const mortgageAmountElement = document.querySelector('.jsMortageAmount');
const mortgageTermElement = document.querySelector('.jsMortgageTerm');
const mortgageInterestElement = document.querySelector('.jsMortgageInterest');
const clearAllBtnElement = document.querySelector('.jsClearAllBtn');
// radio buttons
const repaymentRadioElement = document.querySelector('.jsRepaymentRadio');
const interestRadioElement = document.querySelector('.jsRepaymentInterest');
const repaymentParentLabel = repaymentRadioElement.parentElement;
const interestParentLabel = interestRadioElement.parentElement;
// result side
const resultSideElement = document.querySelector('.jsResultSide');
const fieldRequireElement = document.querySelectorAll('.field-require-text');


totalRepayment = '';
monthlyPayment = '';
repaymentRadioClicked = false;
interestRadioClicked = false;
months = 12;
monthlyInterestRate = 0;
monthlyPayments = 0;
totalPayments = 0;
numerator = 0;
denominator = 0;


MortgageTypeBtnClicked();
DisplayResult();
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

clearAllBtnElement.addEventListener('click', () => {
  ClearAllClicked();
});


function MortgageTypeBtnClicked(){
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
  monthlyInterestRate = ((interest/months)/100);
  totalPayments = (years*months);
  numerator = (amount * monthlyInterestRate);
  denominator = (1 - Math.pow(1 + monthlyInterestRate,(-1*totalPayments)));
  console.log(denominator);
  console.log(numerator);
  monthlyPayments = (numerator/denominator).toFixed(2);
  monthlyPayment = Number((numerator/denominator).toFixed(2)).toLocaleString();
  totalRepayment =  Number((monthlyPayments * totalPayments).toFixed(2)).toLocaleString();
  console.log(totalRepayment);
  DisplayResult();
}

function CalcuteInterestOnly(amount,years,interest){
  interest /= 100;
  numerator = (amount * interest);
  monthlyPayment = Number((numerator/months).toFixed(2)).toLocaleString();
  totalRepayment =  Number((numerator*years).toFixed(2)).toLocaleString();
  console.log(monthlyPayment);
  console.log(totalRepayment);
  DisplayResult();
}

function DisplayResult(){
  emptyDiv = document.createElement('div');
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


  emptyDiv.classList.add('result-empty');
  emptyDiv.innerHTML =  `
            <img src="/assets/images/illustration-empty.svg" alt="">
            <div class="result-side-title">Results shown here</div>
          <div class="result-side-text">  Complete the form and click “calculate repayments” to see what 
            your monthly repayments would be.</div>`;

  if(monthlyPayment && totalRepayment){
    resultSideElement.innerHTML = ""; // Clear previous content
    resultSideElement.appendChild(div); // Append the new content
  }else{
    resultSideElement.innerHTML = ""; // Clear previous content
    resultSideElement.appendChild(emptyDiv);
  }
}

function ClearAllClicked(){
  totalRepayment = '';
  monthlyPayment = '';
  repaymentRadioClicked = false;
  interestRadioClicked = false;
  months = 12;
  monthlyInterestRate = 0;
  monthlyPayments = 0;
  totalPayments = 0;
  numerator = 0;
  denominator = 0;
  mortgageAmountElement.value = '';
  mortgageTermElement.value = '';
  mortgageInterestElement.value = '';
  repaymentRadioElement.checked = false;
  repaymentParentLabel.classList.remove('mortgage-calculator-type-radio-clicked');
  interestRadioElement.checked = false;
  interestParentLabel.classList.remove('mortgage-calculator-type-radio-clicked');
  DisplayResult();
}
