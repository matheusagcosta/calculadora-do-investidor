let avgPrice = 0;
let tot = 0;
let products = 0;
let arrValues = [];
let activedForm = 0;
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

  validateInputs(activedForm);
  calcNewValues(valueQ, valueP);
  generateNewForm(activedForm);
  setBiggerForm(activedForm);
  showTrashButton(activedForm);
  keepValuesOnDisplay(arrValues);
  attFooter();

  activedForm += 1;
};

export const removeForm = (trashID) => {
  
  recalcValues(arrValues, trashID);
  fixID(trashID);
  document.forms[trashID].remove();
  keepValuesOnDisplay(arrValues);
  handleValues(arrValues);
  attFooter();
  activedForm -= 1
  console.log(activedForm)
  if (document.forms.length == 1) {
    uniqueForm();
  };
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
  if (document.forms.length > 1) {
    if (document.forms.length > 2) {
      for (let w = document.forms.length - 2; w > 0; w--) {
        removeForm(w);
      }
      removeForm(0);
    } else {
      removeForm(0);
    }
  }
};

const validateInputs = (activedForm) => {

  const validateQuantity = new RegExp("[0-9]+");
  const validatePrice = new RegExp("[0-9]+(,|.)?[0-9]*");

  valueQ = document.getElementsByName("quantityN")[activedForm].value;
  valueP = document.getElementsByName("priceN")[activedForm].value;

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

const keepValuesOnDisplay = (arrValues) => {
  for (let u = 0; u < document.forms.length - 1; u++) {
    document
      .getElementsByName("quantityN")
      [u].setAttribute("value", `${arrValues[u][0]}`);
    document
      .getElementsByName("priceN")
      [u].setAttribute("value", `${arrValues[u][1].toFixed(2)}`);
  };
};

const setBiggerForm = (activedForm) => {
  if (document.forms.length == 2) {
    document
      .getElementsByClassName("form")[0]
      .setAttribute("class", "form is-bigger");
  }
  document
    .getElementsByClassName("form")
    [activedForm + 1].setAttribute("class", "form is-bigger");
};

const showTrashButton = (activedForm) => {
  document.getElementsByClassName("trash_button")[activedForm].className =
    "trash_button is-shown";
};

const generateNewForm = (activedForm) => {
  const html = `
    <form class="form">
      <div id="qForm">
        <label for="quantityN"  class="textForm" id="quantidade">Quantidade:</label>
        <input type="text" class="valuesForm" name="quantityN" id="quantityN" placeholder="0" autocomplete="off" min="0" value="" required>
      </div>
      <div id="pForm">
        <label for="priceN" class="textForm" id="preco">Preço:</label>
        <input type="text" class="valuesForm" name="priceN" id="priceN" placeholder="R$ 0,00" autocomplete="off" min="0" value="" required> 
      </div>
      <div class="trash_button" id="trash_button">
        <button class="trash" id="trash${activedForm + 1}"></button>
      </div>
    </form>
  `;
  document.getElementById("section").innerHTML += html;
};

const recalcValues = (arrValues, trashID) => {
  if (arrValues[trashID]) {
    tot -= arrValues[trashID][0];
    products -= arrValues[trashID][0] * arrValues[trashID][1];
    arrValues.splice(trashID, 1);
  };
};

const fixID = (trashID) => {
  for (let u = trashID + 1; u < document.forms.length; u++) {
    document.getElementById(`trash${u}`).id = `trash${u - 1}`;
  };
};

const uniqueForm = () => {
  document.getElementsByClassName("form")[0].setAttribute("class", "form");
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
