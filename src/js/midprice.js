import { blockChar } from "./simulation"

let avgPrice = 0;
let tot = 0;
let products = 0;
let arrValues = [];
let arrFunctTrash = [];
let arrFunctInput = [];
let activedInfo = 0;
let valueQ = "";
let valueP = "";

window.addEventListener(
  "keydown",
  function (e) {
    if (
      e.keyIdentifier == "U+000A" ||
      e.keyIdentifier == "Enter" ||
      e.keyCode == 13
    ) {
      if (e.target.nodeName == "INPUT" && e.target.type == "text") {
        e.preventDefault();
        return false;
      }
    }
  },
  true
);

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export const updateVal = (index) => {
    
  if (validateInputs(index)) {
    
    calcValues(valueQ, valueP, "update", index);
    keepValuesOnDisplay(arrValues);
    attMPResults();
    
    for (let count = 0; count < document.getElementsByClassName("mid-price--info").length; count++) {
      setBorderColor(`quantity${count}`, "none");
      setBorderColor(`price${count}`, "none");
    };
  };
};

export const onAddClick = () => {

  if (validateInputs(activedInfo)) {
    
    calcValues(valueQ, valueP, "new");
    generateNewInfo(activedInfo);
    setBiggerInfo(activedInfo);
    showTrashButton(activedInfo);
    keepValuesOnDisplay(arrValues);
    makeReadOnly();
    attMPResults();
    
    for (let index = 0; index < document.getElementsByClassName("mid-price--info").length - 1; index++) {
      if (arrFunctTrash[index]) {
        remEvents(index);
      };
      addEvents(index);
    };

    for (let count = 0; count < document.getElementsByClassName("mid-price--info").length; count++) {
      setBorderColor(`quantity${count}`, "none");
      setBorderColor(`price${count}`, "none");
    };

    addBlockChar();
  
    activedInfo += 1;
  };
};

const addBlockChar = () => {
  
  document.querySelector(`#quantity${activedInfo+1}`).addEventListener("keypress", blockChar)
  document.querySelector(`#price${activedInfo+1}`).addEventListener("keypress", blockChar)
  
};

const validateInputs = (activedInfo) => {

  valueQ = document.getElementsByName("quantity-mp__input")[activedInfo].value;
  valueP = document.getElementsByName("price-mp__input")[activedInfo].value;
  
  if (checkAll(valueQ, valueP, activedInfo)) {
    valueQ = parseFloat(handleComma(valueQ));
    valueP = parseFloat(handleComma(valueP));
    return true;
  } else {
    return false;
  };
};

const makeReadOnly = () => {
  for (let index = 0; index < document.getElementsByClassName("mid-price--info").length - 1; index++) {
    document.getElementsByName("quantity-mp__input")[index].setAttribute("class", "values--info values-mp--info readonly");
    document.getElementsByName("quantity-mp__input")[index].setAttribute("readonly", "true");
    document.getElementsByName("price-mp__input")[index].setAttribute("class", "values--info values-mp--info readonly");
    document.getElementsByName("price-mp__input")[index].setAttribute("readonly", "true");
  };
};  

const handleComma = (valueP) => {
  if (valueP.replace(/,/g, ".")) {
    valueP = valueP.replace(/,/g, ".");
  };
  return valueP;
};

export const setBorderColor = (id, color) => {
  document.getElementById(`${id}`).setAttribute("style", `border-color: ${color};`)
};

const checkAll = (valueQ, valueP, activedInfo) => {
  let result = true;
  result = checkZeros(valueQ, valueP, activedInfo);
  result = checkOnlyChar(valueQ, valueP, activedInfo);
  return result;
};

const checkZeros = (valueQ, valueP, activedInfo) => {
  let resultZeros = true;
  if (valueQ == 0) {
    setBorderColor(`quantity${activedInfo}`, "red");
    document.getElementById("results-mp--total").innerHTML = `-`;
    document.getElementById("results-mp--average").innerHTML = `R$ -`;
    resultZeros = false;
  };
  if (valueP == 0) {
    setBorderColor(`price${activedInfo}`, "red");
    document.getElementById("results-mp--total").innerHTML = `-`;
    document.getElementById("results-mp--average").innerHTML = `R$ -`;
    resultZeros = false;
  };
  return resultZeros;
};

const checkOnlyChar = (valueQ, valueP, activedInfo) => {
  let resultOnlyChar = true;
  const validateVal = new RegExp("[0-9]+(,|.)?[0-9]*");

  let validationQ = validateVal.exec(valueQ);
  let validationP = validateVal.exec(valueP);

  if (validationQ == null) {
    setBorderColor(`quantity${activedInfo}`, "red");
    document.getElementById("results-mp--total").innerHTML = `-`;
    document.getElementById("results-mp--average").innerHTML = `R$ -`;
    resultOnlyChar = false;
  };

  if (validationP == null) {
    setBorderColor(`price${activedInfo}`, "red");
    document.getElementById("results-mp--total").innerHTML = `-`;
    document.getElementById("results-mp--average").innerHTML = `R$ -`;
    resultOnlyChar = false;
  };
  return resultOnlyChar;
};

const calcValues = (valueQ, valueP, choice="", index) => {
  
  if (choice=="new") {
    calcValues_new(valueQ, valueP);
  };

  if (choice=="update") {
    calcValues_update(valueQ, valueP, index);
  };

  if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2);
  } else {
    avgPrice = (products / tot).toFixed(2);
  };
};

const calcValues_new = (valueQ, valueP) => {
  let arrTemp = [];

  arrTemp.push(valueQ);
  arrTemp.push(valueP);
  arrValues.push(arrTemp);
  arrTemp = [];
  tot += valueQ;
  products += valueQ * valueP;

};

const calcValues_update = (valueQ, valueP, index) => {

  tot -= arrValues[index][0];
  products -= arrValues[index][0] * arrValues[index][1];
  arrValues[index][0] = valueQ;
  arrValues[index][1] = valueP;
  tot += valueQ;
  products += valueQ * valueP;

};

const setBiggerInfo = (activedInfo) => {
  if (document.getElementsByClassName("mid-price--info").length == 2) {
    document
      .getElementsByClassName("mid-price--info")[0]
      .setAttribute("class", "info mid-price--info is-bigger");
  }
  document
    .getElementsByClassName("mid-price--info")
    [activedInfo + 1].setAttribute("class", "info mid-price--info is-bigger");
};

const showTrashButton = (activedInfo) => {
  document.getElementsByClassName("trash-button")[activedInfo].className =
    "trash-button is-shown";
};

const generateNewInfo = (activedInfo) => {
  const html = `
    <div class="info mid-price--info">
      <div class="quantity--info">
        <label for="quantity-mp__input"  class="text--info">Quantidade:</label>
        <input type="text" class="values--info values-mp--info" name="quantity-mp__input" id="quantity${activedInfo + 1}" placeholder="0" autocomplete="off" min="0" value="">
      </div>
      <div class="price--info">
        <label for="price-mp__input" class="text--info">Preço:</label>
        <input type="text" class="values--info values-mp--info" name="price-mp__input" id="price${activedInfo + 1}" placeholder="R$ 0,00" autocomplete="off" min="0" value=""> 
      </div>
      <div class="trash-button">
        <button class="trash" id="trash${activedInfo + 1}" title="Limpar"></button>
      </div>
    </div>
  `;
  document.getElementById("mid-price--section").innerHTML += html;
};

const addEvents = (selector) => {

  const callRemove = () => {
    removeInfo(selector);
  };

  const callInput = () => {
    updateVal(selector);
  };

  document.getElementsByClassName("trash")[selector].addEventListener("click", callRemove);
  document.getElementsByName("quantity-mp__input")[selector].addEventListener("input", callInput);
  document.getElementsByName("price-mp__input")[selector].addEventListener("input", callInput);

  if (arrFunctTrash[selector]) {
    arrFunctTrash[selector] = callRemove;
  } else {
    arrFunctTrash.push(callRemove);
  };

  if (arrFunctInput[selector]) {
    arrFunctInput[selector] = callInput;
  } else {
    arrFunctInput.push(callInput);
  };

};

const remEvents = (selector) => {
  document.getElementsByClassName("trash")[selector].removeEventListener("click", arrFunctTrash[selector]);
  document.getElementsByName("quantity-mp__input")[selector].removeEventListener("input", arrFunctInput[selector]);
  document.getElementsByName("price-mp__input")[selector].removeEventListener("input", arrFunctInput[selector]);
};

const keepValuesOnDisplay = (arrValues) => {
  for (let u = 0; u < document.getElementsByClassName("mid-price--info").length - 1; u++) {
    document
      .getElementsByName("quantity-mp__input")
      [u].setAttribute("value", `${arrValues[u][0]}`);
    document
      .getElementsByName("price-mp__input")
      [u].setAttribute("value", `${money.format(arrValues[u][1].toFixed(2))}`);
  };
};

const removeInfo = (trashID) => {

  for (let index = 0; index < document.getElementsByClassName("trash").length - 1; index++) {
    if (arrFunctTrash[index]) {
      remEvents(index);
    };
  };

  document.getElementsByClassName("mid-price--info")[trashID].remove();

  for (let index = 0; index < document.getElementsByClassName("trash").length - 1; index++) {
    addEvents(index);
  };

  for (let id = 0; id < document.getElementsByClassName("mid-price--info").length; id ++) {
    changeId(id);
  };

  recalcValues(arrValues, trashID);
  keepValuesOnDisplay(arrValues);
  handleValues(arrValues);
  attMPResults();

  activedInfo -= 1;

  if (document.getElementsByClassName("mid-price--info").length == 1) {
    uniqueInfo();
  };
};

const recalcValues = (arrValues, trashID) => {
  if (arrValues[trashID]) {
    tot -= arrValues[trashID][0];
    products -= arrValues[trashID][0] * arrValues[trashID][1];
    arrValues.splice(trashID, 1);
  };
};

const changeId = (id) => {
  document.getElementsByClassName("trash")[id].setAttribute("id", `trash${id}`);
  document.getElementsByName("quantity-mp__input")[id].setAttribute("id", `quantity${id}`);
  document.getElementsByName("price-mp__input")[id].setAttribute("id", `price${id}`);
};

const handleValues = (arrValues) => {
  if (arrValues.length == 0) {
    tot = 0;
    avgPrice = 0.0;
    avgPrice = avgPrice.toFixed(2);
  } else if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2);
  } else {
    avgPrice = (products / tot).toFixed(2);
  };
};

const uniqueInfo = () => {
  document.getElementsByClassName("mid-price--info")[0].setAttribute("class", "info mid-price--info");
  activedInfo = 0;
};

const attMPResults = () => {
  document.getElementById("results-mp--total").innerHTML = `${tot}`;
  document.getElementById("results-mp--average").innerHTML = `R$ ${avgPrice}`;
  if (tot == 0 && avgPrice == 0) {
    document.getElementById("results-mp").className = "results";
    document.getElementById("reset").className = "reset";
  } else {
    document.getElementById("results-mp").className = "results is-bigger";
    document.getElementById("reset").className = "reset is-shown";
  }
};

export const reset = () => {
  if (document.getElementsByClassName("mid-price--info").length > 1) {
    if (document.getElementsByClassName("mid-price--info").length > 2) {
      for (let w = document.getElementsByClassName("mid-price--info").length - 2; w > 0; w--) {
        removeInfo(w);
      }
      removeInfo(0);
    } else {
      removeInfo(0);
    }
  }
};
