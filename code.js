var avgPrice = 0
var tot = 0
count = 0
var arrValues = []
var arrTemp = []

function calcPrice() {
  html = `
  <div class="data" id="data${count+1}" style="visibility: visible;">
      <table align="center" > 
        <tr>
          <td id="quantidade">Quantidade:</td>
          <td id="preco">Preço Médio:</td>
        </tr>
        <tr>
          <td>
            <label><input type="number" id="quantityN${count+1}" min=0 value=0>
            </label>
          </td>
          <td>
            <span>R$</span>
            <label><input type="number" id="priceN${count+1}" min=0 value=0.00>
            </label>
          </td>
          <td>
            <button class="trash" id="trash${count+1}" onClick="wipeOut(${count+1})" style="visibility: visible;" >🔥</button>
          </td>
        </tr>
      </table> 
  </div>
  `;
  if (count == 0) {
    document.getElementById("trash0").style.visibility = "visible";
    document.getElementById("data0").innerHTML += html
  } else {
    document.getElementById(`data${count}`).innerHTML += html
  }
  /*
  quant = document.getElementById(`quantityN${count}`).value
  prc = document.getElementById(`priceN${count}`).value

  if (quant!=0 && prc!=0.00) {
    arrTemp.push(document.getElementById(`quantityN${count}`).value)
    arrTemp.push(document.getElementById(`priceN${count}`).value)
    arrValues.push(arrTemp)
  }
  */
  attFooter()
  count ++ 
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
