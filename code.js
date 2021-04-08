var avgPrice = 0
var tot = 0
var arrTot

function calcPrice() {
    
    var quantityN = document.getElementById("quantityN").value
    var priceN = document.getElementById("priceN").value

    
    
    
    
    //avgPrice = avgPrice.toFixed(2)
    //attFooter()
    
    html1 = ""
    html1 += `
    <div class="data" id="data">
        <br>
        <table align="center" > 
          <tr>
            <td>Quantidade:</td>
            <td>Preço Médio:</td>
          </tr>
          <tr>
            <td>
              <input type="number" id="quantityN" min=0>
            </td>
            <td>
              <span>R$</span>
              <input type="number" id="priceN" min=0>
            </td>
          </tr>
        </table> 
    </div>
    `;
    
    content_table = document.getElementById("data")
    content_table.innerHTML += html1

}

function attFooter() {
  var changeFooter = document.getElementById("footer-data")
  var html2 = ""
  html2 = "Total Quantity: " + tot + "Average Price: R$" + avgPrice
  changeFooter.innerHTML = html2
}
