var avgPrice = 0
var tot = 0
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
    alert("escreve aí poha")
    x--
    
  } else {
    
    // value validation system start
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
    // value validation system end

    arrTemp.push(parseFloat(verifQ))
    arrTemp.push(parseFloat(verifP))
    arrValues.push(arrTemp)
    arrTemp=[]

    
    var html = `
    <div class="data" id="data${x}" style="visibility: visible;">
        <table align="center" > 
          <tr>
            <td id="quantidade">Quantidade:</td>
            <td id="preco">Preço Médio:</td>
          </tr>
          <tr>
            <td>
              <label><input type="text" id="quantityN${x}" min="0" value="">
              </label>
            </td>
            <td>
              <span>R$</span>
              <label><input type="text" id="priceN${x}" min="0" value="">
              </label>
            </td>
            <td>
              <button class="trash" id="trash${x}" onclick="wipeOut(${x})" style="visibility: visible;" >🔥</button>
            </td>
          </tr>
        </table> 
    </div>
    `;

    document.getElementById("section").innerHTML += html
    
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
  document.getElementById(`data${y}`).remove()
  arrValues.splice(y, 1)
  for (u=y+1; u = arrValues.length; u++) {
    document.getElementById(`data${u}`).id.innerHTML = `data${u-1}`
    document.getElementById(`quantityN${u}`).id.innerHTML = `quantityN${u-1}`
    document.getElementById(`priceN${u}`).id.innerHTML = `priceN${u-1}`
    document.getElementById(`trash${u}`).id.innerHTML = `trash${u-1}`
    document.getElementById(`wipeOut(${u})`).onclick.innerHTML = `wipeOut(${u-1})`
  }
}
