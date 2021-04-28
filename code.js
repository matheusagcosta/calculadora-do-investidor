var avgPrice = 0
var tot = 0
var products = 0
var arrValues = []
var arrTemp = []
var verifQ
var verifP
// keep values inside the input
function calcPrice(y) {

  // input validation system (1) -> empty strings
  verifQ = document.getElementsByName("quantityN")[y].value
  verifP = document.getElementsByName("priceN")[y].value

  if (verifQ!="" && verifP!="") {
    
    // input validation system (2) -> characters
    verifQ = parseInt(verifQ)
    verifP = parseFloat(verifP)
    
    if (verifQ && verifP) {
      
      // input validation system (3) -> negative numbers
      if (verifQ>=0 && verifP>=0) {
  
        // array addition
        arrTemp.push(verifQ)
        arrTemp.push(verifP)
        arrValues.push(arrTemp)
        arrTemp=[]

        // remove add button
        document.getElementById('add').remove()

        // calculations
        tot += verifQ
        products += verifQ*verifP
        if (arrValues.length == 1) {
          avgPrice = arrValues[0][1].toFixed(2)
        } else {
          avgPrice = (products/tot).toFixed(2)
        }

        // form creation
        
        var html = `
        
        <form>

        <label for="quantityN" id="quantidade">Quantidade:</label>
        <input type="text" name="quantityN" min="0" value="" required>

        <label for="priceN" id="preco">Preço:</label>
        <input type="text" name="priceN" min="0" value="" required>

        <input type="submit" id="add" value="+" onclick="calcPrice(${y+1})">

        </form>
        `;
        document.getElementById("section").innerHTML += html

        // add trash button to previous form
        document.forms[y].innerHTML += `<button class="trash" id="trash${y}" onclick="wipeOut(${y})">🔥</button>`

        // footer
        attFooter()

      }
    }
  }
}

function attFooter() {

  html2 = `
  <label> Quantidade Total: &nbsp;&nbsp; Preço Médio: </label> <br>
  <span class="quantidade">${tot}</span>
  <span class="preco"> R$ ${avgPrice}</span>
  `;
  document.getElementById("footer").innerHTML = html2
}

function wipeOut(z) {
  
  const count = document.forms.length
  // redo calculations and remove itens from the array
  if (arrValues[z]) {
    tot -= arrValues[z][0]
    products -= arrValues[z][0]*arrValues[z][1]
    arrValues.splice(z, 1)
  }

  // change next sections' id's
  for (u=z+1; u < count; u++) {
    if (u == count-1) {
      document.forms[u].elements[2].innerHTML = `<input type="submit" id="add" value="+" onclick="calcPrice(${document.forms.length-2})">`
    } else {
      document.forms[u].elements[2].innerHTML = `<button class="trash" id="trash${u-1}" onclick="wipeOut(${u-1})" style="visibility: visible;">🔥</button>`
    }
  }
  document.getElementById("add").innerHTML = `<input type="submit" id="add" value="+" onclick="calcPrice(${document.forms.length-2})">`
  

  // remove specified section
  document.forms[z].remove()

  // hide trash button (single form)

  // att footer
  if (arrValues.lenght == 0) {
    tot = 0
    avgPrice = 0.00
  } else if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2)
  } else {
    avgPrice = (products/tot).toFixed(2)
  }
  attFooter()
  
}
