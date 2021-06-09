let avgPrice = 0;
let tot = 0;
let products = 0;
let arrValues = [];

window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2
})

const addGarb = () => {
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

const calcPrice = (y) => {
  let arrTemp = [];
  let valueQ = "";
  let valueP = "";
  // input validation system (1) -> empty strings
  valueQ = document.getElementsByName("quantityN")[y].value
  valueP = document.getElementsByName("priceN")[y].value
  if (valueQ!="" && valueP!="") {
    // input validation system (2) -> characters
    if (valueP.replace(/,/g, '.')) {
      valueP = valueP.replace(/,/g, '.')
    }
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
        // calculations
        tot += valueQ
        products += valueQ*valueP
        if (arrValues.length == 1) {
          avgPrice = arrValues[0][1].toFixed(2)
        } else {
          avgPrice = (products/tot).toFixed(2)
        }
        // form creation
        const html = `
        <form class="form">
          <div id="qForm">
            <label for="quantityN"  class="textForm" id="quantidade">Quantidade:</label>
            <input type="text" class="valuesForm" name="quantityN" id="quantityN" placeholder="0" min="0" value="" required>
          </div>
          <div id="pForm">
            <label for="priceN" class="textForm" id="preco">Preço:</label>
            <input type="text" class="valuesForm" name="priceN" id="priceN" placeholder="R$ 0,00" min="0" value="" required> 
          </div>
          <div class="trash_button" id="trash_button">
            <button class="trash" id="trash${y+1}"></button>
          </div>
        </form>
        `;
        document.getElementById("section").innerHTML += html
        document.getElementById("add").setAttribute("onclick", `calcPrice(${y+1})`)
        // update trash button of previous form
        document.getElementById(`trash${y}`).setAttribute("onclick", `wipeOut(${y})`)
        // add values to previous forms
        for (u=0; u<document.forms.length-1; u++) {
          document.getElementsByName("quantityN")[u].setAttribute("value", `${arrValues[u][0]}`) 
          document.getElementsByName("priceN")[u].setAttribute("value", `${arrValues[u][1].toFixed(2)}`)
        }
        // increase form size
        if (document.forms.length == 2) {
          document.getElementsByClassName("form")[0].setAttribute("class", "form is-bigger")
        }
        document.getElementsByClassName("form")[y+1].setAttribute("class", "form is-bigger")
        // change trash button opacity
        document.getElementsByClassName("trash_button")[y].className = "trash_button is-shown"
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

const attFooter = () => {
  document.getElementById("vTot").innerHTML = `${tot}`
  document.getElementById("vPM").innerHTML = `R$ ${avgPrice}`
  if (tot == 0 && avgPrice == 0) {
    document.getElementById("foot").className = "foot"
    document.getElementById("reset").className = "reset"
  } else {
    document.getElementById("foot").className = "foot is-bigger"
    document.getElementById("reset").className = "reset is-shown"
  }
}

const wipeOut = (z) => {
  // redo calculations and remove itens from the array
  if (arrValues[z]) {
    tot -= arrValues[z][0]
    products -= arrValues[z][0]*arrValues[z][1]
    arrValues.splice(z, 1)
  }
  // change next sections' id's
  for (u=z+1; u < document.forms.length; u++) {
    if (u == document.forms.length-1) {
      document.getElementById("add").setAttribute("onclick", `calcPrice(${document.forms.length-2})`)
      document.getElementById(`trash${u}`).id = `trash${u-1}`;
    } else {
      document.getElementById(`trash${u}`).setAttribute("onclick", `wipeOut(${u-1})`)
      document.getElementById(`trash${u}`).id = `trash${u-1}`;
    }
  }
  // remove specified section
  document.forms[z].remove()
  // att values from forms
  for (u=0; u<document.forms.length-1; u++) {
    document.getElementsByName("quantityN")[u].setAttribute("value", `${arrValues[u][0]}`) 
    document.getElementsByName("priceN")[u].setAttribute("value", `${arrValues[u][1].toFixed(2)}`)
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
  // change unique form size
  if (document.forms.length==1) {
    document.getElementsByClassName("form")[0].setAttribute("class", "form")
  }
}

const reset = () => {
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
