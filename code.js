var avgPrice = 0
var tot = 0
var count = 0
var arrValues = []
var arrTemp = []

function calcPrice() {
  count ++

  var html = `
  <div class="data" id="data${count}" style="visibility: visible;">
      <table align="center" > 
        <tr>
          <td id="quantidade">Quantidade:</td>
          <td id="preco">Preço Médio:</td>
        </tr>
        <tr>
          <td>
            <label><input type="number" id="quantityN${count}" min="0" value="">
            </label>
          </td>
          <td>
            <span>R$</span>
            <label><input type="number" id="priceN${count}" min="0" value="">
            </label>
          </td>
          <td>
            <button class="trash" id="trash${count}" onClick="wipeOut(${count})" style="visibility: visible;" >🔥</button>
          </td>
        </tr>
      </table> 
  </div>
  `;
 
  if (count == 0) {
    document.getElementById(`trash${count}`).style.visibility = "hidden";
  } else {
    document.getElementById(`trash${count-1}`).style.visibility = "visible";
  }
  document.getElementById("section").innerHTML += html
  
  
  quant = document.getElementById(`quantityN${count}`).value
  prc = document.getElementById(`priceN${count}`).value
  if (quant!=0 && prc!=0.00) {
    arrTemp.push(document.getElementById(`quantityN${count}`).value)
    arrTemp.push(document.getElementById(`priceN${count}`).value)
    arrValues.push(arrTemp)
  }
  
  tot = quant
  avgPrice
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
}
