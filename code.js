var avgPrice = 0
var tot = 0

function calcPrice(qnt=Array, price=Array) {
    html = ""
    for (i= 0; i< qnt.length; i++) {
      tot += qnt[i]*price[i]
    }
    avgPrice = tot/qnt.length
    
    html += `
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
    content_table.innerHTML += html

    return tot, avgPrice
}
