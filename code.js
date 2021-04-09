var avgPrice = 0
var tot = 0
var arrTot

function calcPrice() {
    
    //var quantityN = document.getElementById("quantityN").value
    //var priceN = document.getElementById("priceN").value

    
    
    
    
    //avgPrice = avgPrice.toFixed(2)
    attFooter()
    
    html1 = ""
    html1 += `
    <div class="data" id="data">
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
              <button class="trash" id="" onClick="wipeOut()">🔥</button>
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
