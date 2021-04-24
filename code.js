var avgPrice = 0
var tot = 0
var products = 0
var arrValues = []
var arrTemp = []
var verifQ
var verifP
var x = arrValues.length

function calcPrice() {

  // input validation system (1)
  verifQ = document.getElementsByName("quantityN")[0].value
  verifP = document.getElementsByName("priceN")[0].value

  if (verifQ!="" && verifP!="") { 
    
    // input validation system (2)
    verifQ = parseInt(verifQ)
    verifP = parseFloat(verifP)

    // show trash buttons
    if (arrValues!=[]) {
      document.getElementById("trash").style.visibility = "visible"
    } else {
      document.getElementById("trash").style.visibility = "hidden"
    }

      
    // array addition
    verifQ = parseFloat(verifQ)
    verifP = parseFloat(verifP)
    arrTemp.push(verifQ)
    arrTemp.push(verifP)
    arrValues.push(arrTemp)
    arrTemp=[]

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
    

    // form creation
    
    var html = `
    
      <form>

        <label for="quantityN" id="quantidade">Quantidade:</label>
        <input type="number" name="quantityN" min=0 required>

        <label for="priceN" id="preco">Preço:</label>
        <input type="number" name="priceN" min=0 required>

        <button type="submit" id="add" onclick="calcPrice()">+</button>

      </form>
      <button class="trash" id="trash" onclick="wipeOut(${x+1})">🔥</button>
    
    `;
    document.getElementById("section").innerHTML += html

    // footer
    attFooter()
    }
  }

function attFooter() {

  html2 = `
  <label> Quantidade Total: &nbsp;&nbsp; Preço Médio: </label> <br>
  <span class="quantidade">${tot}</span>
  <span class="preco"> R$ ${avgPrice}</span>
  `;
  changeFooter = document.getElementById("footer")
  changeFooter.innerHTML = html2
}

function wipeOut(y) {

  for (u=0; u<arrValues.length; u++) {
    
  }

  if (arrValues[y]) {
    tot -= arrValues[y][0]
    products -= arrValues[y][0]*arrValues[y][1]
    arrValues.splice(y, 1)
  }
  
  if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2)
  } else {
    avgPrice = (products/tot).toFixed(2)
  }
  attFooter()
  
}
