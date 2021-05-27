var avgPrice = 0
var tot = 0
var products = 0
var arrValues = []
var arrTemp = []
var valueQ
var valueP
var garb = `
<form id="garb">
<label for="quantityN" id="quantidade">Quantidade:</label>
<label for="priceN" id="preco">Preço:</label>
<input type="text" name="quantityN" id="quantityN" min="0" value="" required>
<input type="text" name="priceN" id="priceN" min="0" value="" required>
</form>
`;

function addGarb() {
  // add garb to stop the form from reloading
  document.getElementById("section").innerHTML += garb
  document.getElementById("garb").remove()
  // add values to previous forms
  for (u=0; u<document.forms.length-1; u++) {
    document.getElementsByName("quantityN")[u].value = arrValues[u][0]
    document.getElementsByName("priceN")[u].value = arrValues[u][1]
  }
}

function calcPrice(y) {
  // input validation system (1) -> empty strings
  valueQ = document.getElementsByName("quantityN")[y].value
  valueP = document.getElementsByName("priceN")[y].value
  if (valueQ!="" && valueP!="") {
    // input validation system (2) -> characters
    valueQ = parseInt(valueQ)
    valueP = parseFloat(valueP)
    if (valueQ && valueP) {
      // input validation system (3) -> negative numbers
      if (valueQ>=0 && valueP>=0) {
        // array addition
        arrTemp.push(valueQ)
        arrTemp.push(valueP)
        arrValues.push(arrTemp)
        arrTemp=[]
        // remove add button
        document.getElementById('add').remove()
        // calculations
        tot += valueQ
        products += valueQ*valueP
        if (arrValues.length == 1) {
          avgPrice = arrValues[0][1].toFixed(2)
        } else {
          avgPrice = (products/tot).toFixed(2)
        }
        // form creation
        var html = `
        <form class="form">
          <div id="qForm">
            <label for="quantityN"  class="textForm" id="quantidade">Quantidade:</label>
            <input type="text" class="valuesForm" name="quantityN" id="quantityN" min="0" value="" required>
          </div>
          <div id="pForm">
            <label for="priceN" class="textForm" id="preco">Preço:</label>
            <input type="text" class="valuesForm" name="priceN" id="priceN" min="0" value="" required> 
          </div>
          <button id="add" value="" onclick="calcPrice(${y+1})"></button>
        </form>
        `;
        document.getElementById("section").innerHTML += html
        // add trash button to previous form
        document.forms[y].innerHTML += `<button class="trash" id="trash${y}" onclick="wipeOut(${y})"></button>`
        // add values to previous forms
        for (u=0; u<document.forms.length-1; u++) {
          document.getElementsByName("quantityN")[u].value = arrValues[u][0]
          document.getElementsByName("priceN")[u].value = arrValues[u][1]
        }
        // footer
        attFooter()
      } else {
        addGarb()
      }
    } else {
        addGarb()
    }
  } else {
    addGarb()
  }
}

function attFooter() {
  document.getElementById("vTot").innerHTML = `<span class="valuesFoot" id="vTot">${tot}</span>`
  document.getElementById("vPM").innerHTML = `<span class="valuesFoot" id="vPM">R$ ${avgPrice}</span>`
}

function wipeOut(z) {
  var count = document.forms.length
  // redo calculations and remove itens from the array
  if (arrValues[z]) {
    tot -= arrValues[z][0]
    products -= arrValues[z][0]*arrValues[z][1]
    arrValues.splice(z, 1)
  }
  // change next sections' id's
  for (u=z+1; u < count; u++) {
    if (u == count-1) {
      document.forms[u].elements[2].innerHTML = `<button id="add" value="" onclick="calcPrice(${document.forms.length-2})"></button>`
    } else {
      document.forms[u].elements[2].remove()
      document.forms[u].innerHTML += `<button class="trash" id="trash${u-1}" onclick="wipeOut(${u-1})"></button>`
    }
  }
  // change add button's id
  document.getElementById("add").remove()
  document.forms[count-1].innerHTML += `<button id="add" value="" onclick="calcPrice(${document.forms.length-2})"></button>`
  // remove specified section
  document.forms[z].remove()
  // att values from forms
  for (u=0; u<document.forms.length-1; u++) {
    document.getElementsByName("quantityN")[u].value = arrValues[u][0]
    document.getElementsByName("priceN")[u].value = arrValues[u][1]
  }
  // att footer
  if (arrValues.length == 0) {
    tot = 0
    avgPrice = 0.00
    avgPrice = avgPrice.toFixed(2)
  } else if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2)
  } else {
    avgPrice = (products/tot).toFixed(2)
  }
  attFooter()
}

function reset() {
  if (document.forms.length>1) {
    if (document.forms.length>2) {
      for (w=document.forms.length-2; w>0; w--) {
        wipeOut(w)
      }
      wipeOut(0)
    } else {
      wipeOut(0)
    }
  }   
}
