var avgPrice = 0
var tot = 0
var count = 0
var arrValues = []
var arrTemp = []
var quant
var price
var verifQ
var verifP

function calcPrice() {
  count ++

  verifQ = document.getElementById(`quantityN${count-1}`).value 
  verifP = document.getElementById(`priceN${count-1}`).value

  if (!(parseFloat(verifQ))) {
    verifQ = 0
  }
  if (!(parseFloat(verifP))) {
    verifP = 0
  }
  if (verifQ<0) {
    verifQ = 0
  }
  if (verifP<0) {
    verifP = 0
  }

  arrTemp.push(parseFloat(verifQ))
  arrTemp.push(parseFloat(verifP))
  arrValues.push(arrTemp)
  arrTemp=[]
  
  
  quant = price = "0"
  var html = `
  <div class="data" id="data${count}" style="visibility: visible;">
      <table align="center" > 
        <tr>
          <td id="quantidade">Quantidade:</td>
          <td id="preco">Preço Médio:</td>
        </tr>
        <tr>
          <td>
            <label><input type="text" id="quantityN${count}" min="0" value="${quant}">
            </label>
          </td>
          <td>
            <span>R$</span>
            <label><input type="text" id="priceN${count}" min="0" value="${price}">
            </label>
          </td>
          <td>
            <button class="trash" id="trash${count}" onClick="wipeOut(${count})" style="visibility: visible;" >🔥</button>
          </td>
        </tr>
      </table> 
  </div>
  `;
  
  for (i=0; i < count; i++) {
    if (arrValues[i][0] != -1 && arrValues[i][1] != -1) {
      document.getElementById(`quantityN${i}`).value = toString(arrValues[i][0])
      document.getElementById(`priceN${i}`).value = toString(arrValues[i][1])
    }
  }



  if (count == 0) {
    document.getElementById(`trash${count}`).style.visibility = "hidden";
  } else {
    document.getElementById(`trash${count-1}`).style.visibility = "visible";
  }
  document.getElementById("section").innerHTML += html
  

  attFooter()
   
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

function wipeOut(x) {
    document.getElementById(`data${x}`).remove()
    arrValues[x][0] = -1
    arrValues[x][1] = -1
}
