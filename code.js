var avgPrice = 0
var tot = 0
var count = 0
var quantityN
var priceN

function calcPrice() {
    
    quantityN = document.getElementById("quantityN").value
    priceN = document.getElementById("priceN").value

    chng = document.getElementById("trash")
    html = '<button class="trash" onClick="wipeOut()" style="visibility: visible;">🔥</button>'
    chng.innerHTML = html
    
    //avgPrice = avgPrice.toFixed(2)
    attFooter()
    
    html1 = ""
    html1 += `
      <div class="data" id="data${count}" style="visibility: visible">
          <table align="center" > 
            <tr>
              <td id="quantidade">Quantidade:</td>
              <td id="preco">Preço Médio:</td>
            </tr>
            <tr>
              <td>
                <input type="number" id="quantityN" min=0>
              </td>
              <td>
                <span>R$</span>
                <input type="number" id="priceN" min=0>
              </td>
              <td>
                <button class="trash" id="" onClick="wipeOut()" style="visibility: visible;">🔥</button>
              </td>
            </tr>
          </table> 
      </div>
    `;
    
    content_table = document.getElementById("data")
    content_table.innerHTML += html1

}

function attFooter() {
  var changeFooter = document.getElementById("footer")

  var html2 = `
  <label> Quantidade Total: &nbsp;&nbsp; Preço Médio: </label> <br>
  <span class="quantidade"> `+ tot +`</span>
  <span class="preco"> R$`+ avgPrice +`</span>
  `;
  
  changeFooter.innerHTML = html2
}

function wipeOut() {

}
