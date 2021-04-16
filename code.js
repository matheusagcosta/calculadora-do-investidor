var avgPrice = 0
var tot = 0
var products = 0
var arrValues = []
var arrTemp = []
var verifQ
var verifP
var x = 0

function calcPrice() {
  x ++
  // input validation system 
  verifQ = document.getElementById(`quantityN${x-1}`).value 
  verifP = document.getElementById(`priceN${x-1}`).value

  if (verifQ == "" && verifP == "") {
    console.log("escreve aí poha")
    x--
    
  } else {
    
    // value validation
    if (!(parseFloat(verifQ))) {
      verifQ = 0
    }
    if (!(parseFloat(verifP))) {
      verifP = 0
      verifQ = 0
    }
    if (verifQ<0) {
      verifQ = 0
    }
    if (verifP<0) {
      verifP = 0
      verifQ = 0
    }
    
    // array addition
    verifQ = parseFloat(verifQ)
    verifP = parseFloat(verifP)
    arrTemp.push(verifQ)
    arrTemp.push(verifP)
    arrValues.push(arrTemp)
    arrTemp=[]


    // data creation
    var html = `
    <div class="data" id="data${x}" style="visibility: visible;">
        <table align="center" > 
          <tr>
            <td id="quantidade">Quantidade:</td>
            <td id="preco">Preço Médio:</td>
          </tr>
          <tr>
            <td>
              <label><input type="text" id="quantityN${x}" min="0" value="" required>
              </label>
            </td>
            <td>
              <span>R$</span>
              <label><input type="text" id="priceN${x}" min="0" value="" required>
              </label>
            </td>
            <td>
              <button class="trash" id="trash${x}" onclick="wipeOut(${x})" style="visibility: visible;">🔥</button>
            </td>
          </tr>
        </table> 
    </div>
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
}



function attFooter() {

  if (x>0) {
    document.getElementById('trash0').style.visibility = "visible"
  } else {
    document.getElementById('trash0').style.visibility = "hidden"
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
  x --
  document.getElementById(`data${y}`).remove()
  
  //change data id's
  if (y != arrValues.length) {
    for (u=0; u < arrValues; u++) {
      html3 = `
        <div class="data" id="data${u}" style="visibility: visible;">
          <table align="center" > 
            <tr>
              <td id="quantidade">Quantidade:</td>
              <td id="preco">Preço Médio:</td>
            </tr>
            <tr>
              <td>
                <label><input type="text" id="quantityN${u}" min="0" value="" required>
                </label>
              </td>
              <td>
                <span>R$</span>
                <label><input type="text" id="priceN${u}" min="0" value="" required>
                </label>
              </td>
              <td>
                <button class="trash" id="trash${u}" onclick="wipeOut(${u})" style="visibility: visible;">🔥</button>
              </td>
            </tr>
          </table> 
        </div>
      `;
      change = document.getElementById(`data${u}`)
      change.innerHTML = html3
      x = arrValues.length-1
    }
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
