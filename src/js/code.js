let avgPrice = 0;
let tot = 0;
let products = 0;
let arrValues = [];
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

  validateInputs(activedInfo);

  calcNewValues(valueQ, valueP);

  generateNewInfo(activedInfo);

  setBiggerInfo(activedInfo);

  showTrashButton(activedInfo);

  keepValuesOnDisplay(arrValues);

  attFooter();
  
  remTrashClick();

  addTrashClick();

  activedInfo += 1;

};

const validateInputs = (activedInfo) => {

  const validateQuantity = new RegExp("[0-9]+");
  const validatePrice = new RegExp("[0-9]+(,|.)?[0-9]*");

  valueQ = document.getElementsByName("quantityN")[activedInfo].value;
  valueP = document.getElementsByName("priceN")[activedInfo].value;

  valueQ = validateQuantity.exec(valueQ)[0];
  valueP = validatePrice.exec(valueP)[0];

  if (valueP.replace(/,/g, ".")) {
    valueP = valueP.replace(/,/g, ".");
  };

  valueQ = parseInt(valueQ);
  valueP = parseFloat(valueP);

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
      <div id="qInfo">
        <label for="quantityN"  class="textInfo" id="quantidade">Quantidade:</label>
        <input type="text" class="valuesInfo" name="quantityN" id="quantityN" placeholder="0" autocomplete="off" min="0" value="" required>
      </div>
      <div id="pInfo">
        <label for="priceN" class="textInfo" id="preco">Preço:</label>
        <input type="text" class="valuesInfo" name="priceN" id="priceN" placeholder="R$ 0,00" autocomplete="off" min="0" value="" required> 
      </div>
      <div class="trash_button" id="trash_button">
        <button class="trash" id="trash${activedInfo + 1}"></button>
      </div>
    </div>
  `;
  document.getElementById("section").innerHTML += html;
};

const addTrashClick = () => {
  for (let id = 0; id < document.getElementsByClassName("trash").length - 1; id++){
    document.getElementById(`trash${id}`).addEventListener("click", Element.rem = function(){
      console.log(id)
    });
  };
};

const remTrashClick = () => {
  for (let id = 0; id < document.getElementsByClassName("trash").length - 1; id++){
    document.getElementById(`trash${id}`).removeEventListener("click", Element.rem);
  };
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

  console.log(`entrei com trashID = ${trashID}`);

  document.getElementsByClassName("info")[trashID].remove();
  
  recalcValues(arrValues, trashID);

  for (let id = 0; id < document.getElementsByClassName("info").length; id ++) {
    changeTrashId(id);
  };

  addTrashClick(trashID-1);
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

const changeTrashId = (id) => {
    document.getElementsByClassName("trash")[id].setAttribute("id", `trash${id}`);
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
