let avgPrice = 0;
let tot = 0;
let products = 0;
let arrValues = [];
let y = 0;
let z = 0;

export const addGarb = () => {
  const garb = `
    <form id="garb">
    <label for="quantityN" id="quantidade">Quantidade:</label>
    <label for="priceN" id="preco">Preço:</label>
    <input type="text" name="quantityN" id="quantityN" min="0" value="" required>
    <input type="text" name="priceN" id="priceN" min="0" value="" required>
    </form>
  `;
  // add garb to stop the form from reloading
  document.getElementById("section").innerHTML += garb
  document.getElementById("garb").remove()
  // add values to previous forms
  for (u=0; u<document.forms.length-1; u++) {
    document.getElementsByName("quantityN")[u].value = arrValues[u][0]
    document.getElementsByName("priceN")[u].value = arrValues[u][1]
  }
}

export const calcPrice = (y) => {
  let valueQ = "";
  let valueP = "";
  let arrTemp = [];
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
        //
        if (document.forms.length == 1) {
          document.getElementById("firstForm").className = "form is-bigger"
        }
        // form creation
        const html = `
        <form class="form is-bigger">
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
        if (document.getElementById("trash")) { document.getElementById("trash").remove() }
        document.forms[y].innerHTML += `<button class="trash is-shown" id="trash${y}" onclick="wipeOut(${y})"></button>`
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

export const attFooter = () => {
  if (tot == 0 && avgPrice == 0) {
    document.getElementById("footer").innerHTML = `
    <div class="foot">
      <div id="qFoot">
        <label class="textFoot" id="qTot">Quantidade Total:</label>
        <span class="valuesFoot" id="vTot">0</span>
      </div>
      <div id="pFoot">
        <label class="textFoot" id="pMed">Preço Médio:</label>
        <span class="valuesFoot" id="vPM">R$ 0.00</span>
      </div>
      <button class="reset" id="reset"></button>
    </div>
    `
  } else {
      document.getElementById("footer").innerHTML = `
      <div class="foot is-bigger">
        <div id="qFoot">
          <label class="textFoot" id="qTot">Quantidade Total:</label>
          <span class="valuesFoot" id="vTot">${tot}</span>
        </div>
        <div id="pFoot">
          <label class="textFoot" id="pMed">Preço Médio:</label>
          <span class="valuesFoot" id="vPM">R$ ${avgPrice}</span>
        </div>
        <button class="reset is-shown" id="reset"></button>
      </div>
      `
  }
}

export const wipeOut = (z) => {
  // redo calculations and remove itens from the array
  if (arrValues[z]) {
    tot -= arrValues[z][0]
    products -= arrValues[z][0]*arrValues[z][1]
    arrValues.splice(z, 1)
  }
  // change next sections' id's
  for (u=z+1; u < document.forms.length; u++) {
    if (u == document.forms.length-1) {
      document.forms[u].elements[2].innerHTML = `<button id="add" value="" onclick="calcPrice(${document.forms.length-2})"></button>`
    } else {
      document.forms[u].elements[2].remove()
      document.forms[u].innerHTML += `<button class="trash is-shown" id="trash${u-1}" onclick="wipeOut(${u-1})"></button>`
    }
  }
  // change add button's id
  document.getElementById("add").remove()
  document.forms[document.forms.length-1].innerHTML += `<button id="add" value="" onclick="calcPrice(${document.forms.length-2})"></button>`
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
  //change class back to form
  if (document.forms.length == 1) {
    document.getElementById("section").removeChild(document.forms[0])
    document.getElementById("section").innerHTML = `
    <form class="form" id="firstForm">
      <div id="qForm">
        <label for="quantityN"  class="textForm" id="quantidade">Quantidade:</label>
        <input type="text" class="valuesForm" name="quantityN" id="quantityN" min="0" value="" required>
      </div>
      <div id="pForm">
        <label for="priceN" class="textForm" id="preco">Preço:</label>
        <input type="text" class="valuesForm" name="priceN" id="priceN" min="0" value="" required> 
      </div>
      <button id="add" value=""></button>
      <button class="trash" id="trash"></button>
    </form>
    `
  }
}

export const reset = () => {
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
