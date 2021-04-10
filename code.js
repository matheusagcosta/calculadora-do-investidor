var avgPrice = 0
var tot = 0
count = 0

function calcPrice() {
      
  html = `
  <br>
    <div class="section" id="section${count}">
      <div class="data" id="data" style="visibility: visible;">
          <table align="center" > 
            <tr>
              <td id="quantidade">Quantidade:</td>
              <td id="preco">Preço Médio:</td>
            </tr>
            <tr>
              <td>
                <label><input type="number" id="quantityN${count}" min=0></label>
              </td>
              <td>
                <span>R$</span>
                <label><input type="number" id="priceN${count}" min=0></label>
              </td>
              <td id="trash${count}">
                <button class="trash" onClick="wipeOut()" style="visibility: visible;" >🔥</button>
              </td>
            </tr>
          </table> 
      </div>
    </div>
  `;
  
  if (count == 0) {
    document.getElementById("trash").style.visibility = "visible";
    document.getElementById("section").innerHTML += html
  } else {
    document.getElementById(`section${count-1}`).innerHTML += html
  }


  attFooter()
  count ++
}

function attFooter() {
  var changeFooter = document.getElementById("footer")

  var html2 = `
  <label> Quantidade Total: &nbsp;&nbsp; Preço Médio: </label> <br>
  <span class="quantidade">${tot}</span>
  <span class="preco"> R$ ${avgPrice}</span>
  `;
  
  changeFooter.innerHTML = html2
}

function wipeOut() {
    document.getElementById(this).remove()
}
