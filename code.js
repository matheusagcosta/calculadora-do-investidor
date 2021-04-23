var avgPrice = 0
var tot = 0
var products = 0
var arrValues = []
var arrTemp = []
var verifQ
var verifP
var x = 0

function calcPrice() {
  
  // input validation system 
  verifQ = document.getElementById(`quantityN`).value 
  verifP = document.getElementById(`priceN`).value
    
  // array addition
  verifQ = parseFloat(verifQ)
  verifP = parseFloat(verifP)
  arrTemp.push(verifQ)
  arrTemp.push(verifP)
  arrValues.push(arrTemp)
  arrTemp=[]


  // form creation
  var html = `
  `;
  document.getElementById("section").innerHTML += html

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
    
  }




function attFooter() {

  if (x>0) {
    for (z=0; z<arrValues.length; z++) {
      document.getElementById(`trash${z}`).style.visibility = "visible"
    }
  } else {
    document.getElementById("trash0").style.visibility = "hidden"
  }

  html2 = `
  <label> Quantidade Total: &nbsp;&nbsp; Preço Médio: </label> <br>
  <span class="quantidade">${tot}</span>
  <span class="preco"> R$ ${avgPrice}</span>
  `;
  changeFooter = document.getElementById("footer")
  changeFooter.innerHTML = html2
}

function wipeOut(y) {
  
  

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
