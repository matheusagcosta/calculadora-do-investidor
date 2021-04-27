var avgPrice = 0
var tot = 0
var products = 0
var arrValues = []
var arrTemp = []
var verifQ
var verifP

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

        // show trash buttons
        if (arrValues!=[]) {
          document.getElementById(`trash0`).style.visibility = "visible"
        } else {
          document.getElementById("trash0").style.visibility = "hidden"
        }

        // remove add button
        var rem = document.getElementById('add')
        rem.remove()

        // calculations
        tot += verifQ
        products += verifQ*verifP
        if (arrValues.length == 1) {
          avgPrice = arrValues[0][1].toFixed(2)
        } else {
          avgPrice = (products/tot).toFixed(2)
        }

        // footer
        attFooter()

        // form creation
        
        var html = `
        
        <form>

        <label for="quantityN" id="quantidade">Quantidade:</label>
        <input type="text" name="quantityN" min="0" value="" required>

        <label for="priceN" id="preco">Preço:</label>
        <input type="text" name="priceN" min="0" value="" required>

        <input type="submit" id="add" value="+" onclick="calcPrice(${y+1})">

        </form>
        <button class="trash" id="trash${y+1}" onclick="wipeOut(${y+1})" style="visibility: visible;">🔥</button>
       
        `;
        document.getElementById("section").innerHTML += html

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

  // redo calculations and remove itens from the array
  if (arrValues[z]) {
    tot -= arrValues[z][0]
    products -= arrValues[z][0]*arrValues[z][1]
    arrValues.splice(z, 1)
  }
  
  // att footer
  if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2)
  } else {
    avgPrice = (products/tot).toFixed(2)
  }

  // change next sections' id's
  for (u=0; u<document.forms.length; u++) {
    
  }

  // remove specified section


  // hide trash button (single form)
  

  attFooter()
  
}
