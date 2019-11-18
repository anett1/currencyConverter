const table = document.querySelector(".exchangeRate__table tbody");
const dateSpan = document.querySelector(".exchangeRate h1 span");
const myCurrency = document.querySelector("[name=MyCurrency]");
const wantCurrency = document.querySelector("[name=WantCurrency]");
const valueCurrency = document.querySelector(".formCurrencyConverter__value");
const btnCurrency = document.querySelector(".formCurrencyConverter__btn");
const convertedCurrency = document.querySelector(
  ".formCurrencyConverter__result"
);

let date = new Date();
let dateForRate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

function getExchangeRate() {
  return fetch(`http://api.nbp.pl/api/exchangerates/tables/a/${dateForRate}/`)
    .then(resp => resp.json())
    .then(currencyList => {
      return currencyList[0].rates;
    });
}
getExchangeRate().then(currencyList => {
  dateSpan.textContent = dateForRate;

  currencyList.forEach(currency => {
    let rowTable = document.createElement("tr");
    rowTable.innerHTML = `<td>${currency.code}</td><td>${
      currency.currency
    }</td><td>${currency.mid.toFixed(4)}</td>`;
    table.appendChild(rowTable);
  });
  currencyList.forEach(currency => {
    let selectOptionCurrency = document.createElement("option");
    selectOptionCurrency.setAttribute("value", `${currency.mid.toFixed(4)}`);
    selectOptionCurrency.setAttribute("data-code", `${currency.code}`);
    selectOptionCurrency.innerHTML = `${currency.code} ${currency.currency}`;
    myCurrency.appendChild(selectOptionCurrency);
  });
  currencyList.forEach(currency => {
    let selectOptionCurrency = document.createElement("option");
    selectOptionCurrency.setAttribute("value", `${currency.mid.toFixed(4)}`);
    selectOptionCurrency.setAttribute("data-code", `${currency.code}`);
    selectOptionCurrency.innerHTML = `${currency.code} ${currency.currency}`;
    wantCurrency.appendChild(selectOptionCurrency);
  });
});

btnCurrency.addEventListener("click", e => {
  e.preventDefault();
  let valueCurrencyNumber = valueCurrency.value;

  let myCurrencySelectIndex = document.querySelector("[name=MyCurrency]")
    .selectedIndex;
  let myCurrencySelectOptions = document.querySelector("[name=MyCurrency]")
    .options;
  let myCurrencySelectValue =
    myCurrencySelectOptions[myCurrencySelectIndex].value;
  let myCurrencySelectData = myCurrencySelectOptions[
    myCurrencySelectIndex
  ].getAttribute("data-code");

  let wantCurrencySelectIndex = document.querySelector("[name=WantCurrency]")
    .selectedIndex;
  let wantCurrencySelectOptions = document.querySelector("[name=WantCurrency]")
    .options;
  let wantCurrencySelectValue =
    wantCurrencySelectOptions[wantCurrencySelectIndex].value;
  let wantCurrencySelectData = wantCurrencySelectOptions[
    wantCurrencySelectIndex
  ].getAttribute("data-code");

  let convertedValue = (
    (parseInt(valueCurrencyNumber) * parseInt(myCurrencySelectValue)) /
    parseInt(wantCurrencySelectValue)
  ).toFixed(2);

  convertedCurrency.textContent = `${valueCurrencyNumber} ${myCurrencySelectData} = ${convertedValue} ${wantCurrencySelectData}`;
});
