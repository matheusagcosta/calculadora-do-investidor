var avgPrice = 0
var tot = 0
var arrValues = []
var arrTemp = []
var verifQ
var verifP
var x = 0

function calcPrice() {
  x ++

  verifQ = document.getElementById(`quantityN${x-1}`).value 
  verifP = document.getElementById(`priceN${x-1}`).value

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
  
  for (u=1; u < arrValues.length; u++) {

  }

  
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
            <button class="trash" id="trash${x}" onClick="wipeOut(${x})" style="visibility: visible;" >🔥</button>
          </td>
        </tr>
      </table> 
  </div>
  `;

  if (arrValues.length == 0) {
    document.getElementById(`trash0`).style.visibility = "hidden";
  }
  if (x==1 && arrValues.length == 1) {
    document.getElementById(`trash0`).style.visibility = "hidden";
  } else {
    document.getElementById(`trash0`).style.visibility = "visible";
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

function wipeOut(y) {
    
  if (y==x) {
    document.getElementById(`data${y}`).remove()
  } else {
    document.getElementById(`data${y}`).remove()
    arrValues[y][0] = -1
    arrValues[y][1] = -1
  }
  c = 0
  t = 0
  for (i=0;i<arrValues.length;i++) {
    if (arrValues[i][0]!=-1) {
      t = i
      c += 1
    }
  }
  if (c==1) {
    document.getElementById(`trash${t}`).style.visibility = "hidden";
  }
}
