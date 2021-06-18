let avgPrice = 0;
let tot = 0;
let products = 0;
let arrValues = [];
let arrFunct = [];
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

export const onAddClick = () => {

  if (validateInputs(activedInfo)) {
    
    calcNewValues(valueQ, valueP);
    generateNewInfo(activedInfo);
    setBiggerInfo(activedInfo);
    showTrashButton(activedInfo);
    keepValuesOnDisplay(arrValues);
    attFooter();
    
    for (let index = 0; index < document.getElementsByClassName("trash").length - 1; index++) {
      if (arrFunct[index]) {
        remTrashClick(index);
      };
      addTrashClick(index);
    };
    
    for (let count = 0; count < document.getElementsByClassName("info").length; count++) {
      setBorderColor(`quantity${activedInfo}`, "none");
      setBorderColor(`price${activedInfo}`, "none");
    }
  
    activedInfo += 1;
  };
};

const handleComma = (valueP) => {
  if (valueP.replace(/,/g, ".")) {
    valueP = valueP.replace(/,/g, ".");
  };
  return valueP;
};

const setBorderColor = (id, color) => {
  document.getElementById(`${id}`).setAttribute("style", `border-color: ${color};`)
};

const visualError = (valueQ, valueP, activedInfo) => {
  let result = true;
  if (valueQ == 0) {
    setBorderColor(`quantity${activedInfo}`, "red");
    result = false;
  };
  if (valueP == 0) {
    setBorderColor(`price${activedInfo}`, "red");
    result = false;
  };
  return result;
};

const validateInputs = (activedInfo) => {

  const validateQuantity = new RegExp("[0-9]+");
  const validatePrice = new RegExp("[0-9]+(,|.)?[0-9]*");

  valueQ = document.getElementsByName("quantityN")[activedInfo].value;
  valueP = document.getElementsByName("priceN")[activedInfo].value;
  
  if (visualError(valueQ, valueP, activedInfo)) {
    valueQ = parseInt(validateQuantity.exec(valueQ)[0]);
    valueP = parseFloat(handleComma(validatePrice.exec(valueP)[0]));
    return true;
  } else {
    return false;
  };
};

const calcNewValues = (valueQ, valueP) => {
  let arrTemp = [];

  arrTemp.push(valueQ);
  arrTemp.push(valueP);
  arrValues.push(arrTemp);
  arrTemp = [];

  tot += valueQ;
  products += valueQ * valueP;
  if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2);
  } else {
    avgPrice = (products / tot).toFixed(2);
  };
};

const setBiggerInfo = (activedInfo) => {
  if (document.getElementsByClassName("info").length == 2) {
    document
      .getElementsByClassName("info")[0]
      .setAttribute("class", "info is-bigger");
  }
  document
    .getElementsByClassName("info")
    [activedInfo + 1].setAttribute("class", "info is-bigger");
};

const showTrashButton = (activedInfo) => {
  document.getElementsByClassName("trash_button")[activedInfo].className =
    "trash_button is-shown";
};

const generateNewInfo = (activedInfo) => {
  const html = `
    <div class="info">
      <div class="qInfo">
        <label for="quantityN"  class="textInfo">Quantidade:</label>
        <input type="text" class="valuesInfo" name="quantityN" id="quantity${activedInfo + 1}" placeholder="0" autocomplete="off" min="0" value="">
      </div>
      <div class="pInfo">
        <label for="priceN" class="textInfo">Preço:</label>
        <input type="text" class="valuesInfo" name="priceN" id="price${activedInfo + 1}" placeholder="R$ 0,00" autocomplete="off" min="0" value=""> 
      </div>
      <div class="trash_button" id="trash_button">
        <button class="trash" id="trash${activedInfo + 1}"></button>
      </div>
    </div>
  `;
  document.getElementById("section").innerHTML += html;
};

const addTrashClick = (selector) => {
  const callRemove = () => {
    removeInfo(selector);
  };
  document.getElementsByClassName("trash")[selector].addEventListener("click", callRemove)
  if (arrFunct[selector]) {
    arrFunct[selector] = callRemove;
  } else {
    arrFunct.push(callRemove);
  };
};

const remTrashClick = (selector) => {
  document.getElementsByClassName("trash")[selector].removeEventListener("click", arrFunct[selector]);
};

const keepValuesOnDisplay = (arrValues) => {
  for (let u = 0; u < document.getElementsByClassName("info").length - 1; u++) {
    document
      .getElementsByName("quantityN")
      [u].setAttribute("value", `${arrValues[u][0]}`);
    document
      .getElementsByName("priceN")
      [u].setAttribute("value", `${arrValues[u][1].toFixed(2)}`);
  };
};

const removeInfo = (trashID) => {

  for (let index = 0; index < document.getElementsByClassName("trash").length - 1; index++) {
    if (arrFunct[index]) {
      remTrashClick(index);
    };
  };

  document.getElementsByClassName("info")[trashID].remove();

  for (let index = 0; index < document.getElementsByClassName("trash").length - 1; index++) {
    addTrashClick(index);
  };

  for (let id = 0; id < document.getElementsByClassName("info").length; id ++) {
    changeId(id);
  };

  recalcValues(arrValues, trashID);
  keepValuesOnDisplay(arrValues);
  handleValues(arrValues);
  attFooter();

  activedInfo -= 1;

  if (document.getElementsByClassName("info").length == 1) {
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
  document.getElementsByName("quantityN")[id].setAttribute("id", `quantity${id}`);
  document.getElementsByName("priceN")[id].setAttribute("id", `price${id}`);
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
  document.getElementsByClassName("info")[0].setAttribute("class", "info");
  activedInfo = 0;
};

export const attFooter = () => {
  document.getElementById("vTot").innerHTML = `${tot}`;
  document.getElementById("vPM").innerHTML = `R$ ${avgPrice}`;
  if (tot == 0 && avgPrice == 0) {
    document.getElementById("foot").className = "foot";
    document.getElementById("reset").className = "reset";
  } else {
    document.getElementById("foot").className = "foot is-bigger";
    document.getElementById("reset").className = "reset is-shown";
  }
};

export const reset = () => {
  if (document.getElementsByClassName("info").length > 1) {
    if (document.getElementsByClassName("info").length > 2) {
      for (let w = document.getElementsByClassName("info").length - 2; w > 0; w--) {
        removeInfo(w);
      }
      removeInfo(0);
    } else {
      removeInfo(0);
    }
  }
};
