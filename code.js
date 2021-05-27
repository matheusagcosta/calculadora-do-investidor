var avgPrice = 0
var tot = 0
var products = 0
var arrValues = []
var arrTemp = []
var valueQ
var valueP
var trashIco = `
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.2 3.70088H11.2V2.36497C11.1812 1.85286 10.9602 1.36909 10.5853 1.0197C10.2104 0.670312 9.7122 0.483818 9.2 0.501103H6.8C6.2878 0.483818 5.78965 0.670312 5.41474 1.0197C5.03984 1.36909 4.81877 1.85286 4.8 2.36497V3.70088H0.8C0.587827 3.70088 0.384344 3.78516 0.234315 3.93518C0.0842854 4.0852 0 4.28867 0 4.50083C0 4.71299 0.0842854 4.91645 0.234315 5.06647C0.384344 5.21649 0.587827 5.30077 0.8 5.30077H1.6V14.1002C1.6 14.7366 1.85286 15.347 2.30294 15.7971C2.75303 16.2472 3.36348 16.5 4 16.5H12C12.6365 16.5 13.247 16.2472 13.6971 15.7971C14.1471 15.347 14.4 14.7366 14.4 14.1002V5.30077H15.2C15.4122 5.30077 15.6157 5.21649 15.7657 5.06647C15.9157 4.91645 16 4.71299 16 4.50083C16 4.28867 15.9157 4.0852 15.7657 3.93518C15.6157 3.78516 15.4122 3.70088 15.2 3.70088ZM6.4 2.36497C6.4 2.23698 6.568 2.10099 6.8 2.10099H9.2C9.432 2.10099 9.6 2.23698 9.6 2.36497V3.70088H6.4V2.36497ZM12.8 14.1002C12.8 14.3123 12.7157 14.5158 12.5657 14.6658C12.4157 14.8158 12.2122 14.9001 12 14.9001H4C3.78783 14.9001 3.58434 14.8158 3.43431 14.6658C3.28429 14.5158 3.2 14.3123 3.2 14.1002V5.30077H12.8V14.1002Z" fill="white"/>
</svg>
`
var garb = `
<form id="garb">
<label for="quantityN" id="quantidade">Quantidade:</label>
<label for="priceN" id="preco">Preço:</label>
<input type="text" name="quantityN" id="quantityN" min="0" value="" required>
<input type="text" name="priceN" id="priceN" min="0" value="" required>
</form>
`;

function addGarb() {
  // add garb to stop the form from reloading
  document.getElementById("section").innerHTML += garb
  document.getElementById("garb").remove()
  // add values to previous forms
  for (u=0; u<document.forms.length-1; u++) {
    document.getElementsByName("quantityN")[u].value = arrValues[u][0]
    document.getElementsByName("priceN")[u].value = arrValues[u][1]
  }
}

function calcPrice(y) {
  // input validation system (1) -> empty strings
  valueQ = document.getElementsByName("quantityN")[y].value
  valueP = document.getElementsByName("priceN")[y].value
  if (valueQ!="" && valueP!="") {
    // input validation system (2) -> characters
    valueQ = parseInt(valueQ)
    valueP = parseFloat(valueP)
    if (valueQ && valueP) {
      // input validation system (3) -> negative numbers
      if (valueQ>=0 && valueP>=0) {
        // array addition
        arrTemp.push(valueQ)
        arrTemp.push(valueP)
        arrValues.push(arrTemp)
        arrTemp=[]
        // remove add button
        document.getElementById('add').remove()
        // calculations
        tot += valueQ
        products += valueQ*valueP
        if (arrValues.length == 1) {
          avgPrice = arrValues[0][1].toFixed(2)
        } else {
          avgPrice = (products/tot).toFixed(2)
        }
        // form creation
        var html = `
        <form class="form">
          <div>
            <label for="quantityN" id="quantidade">Quantidade:</label>
            <input type="text" name="quantityN" id="quantityN" min="0" value="" required>
          </div>
          <div>
            <label for="priceN" id="preco">Preço:</label>
            <input type="text" name="priceN" id="priceN" min="0" value="" required> 
          </div>
          <input type="submit" id="add" value="" onclick="calcPrice(${y+1})">
        </form>
        `;
        document.getElementById("section").innerHTML += html
        // add trash button to previous form
        document.forms[y].innerHTML += `<button class="trash" id="trash${y}" onclick="wipeOut(${y})">${trashIco}</button>`
        // add values to previous forms
        for (u=0; u<document.forms.length-1; u++) {
          document.getElementsByName("quantityN")[u].value = arrValues[u][0]
          document.getElementsByName("priceN")[u].value = arrValues[u][1]
        }
        // footer
        attFooter()
      } else {
        addGarb()
      }
    } else {
        addGarb()
    }
  } else {
    addGarb()
  }
}

function attFooter() {
  document.getElementById("vTot").innerHTML = `<span class="quantidade" id="vTot">${tot}</span>`
  document.getElementById("vPM").innerHTML = `<span class="preco" id="vPM">R$ ${avgPrice}</span>`
}

function wipeOut(z) {
  var count = document.forms.length
  // redo calculations and remove itens from the array
  if (arrValues[z]) {
    tot -= arrValues[z][0]
    products -= arrValues[z][0]*arrValues[z][1]
    arrValues.splice(z, 1)
  }
  // change next sections' id's
  for (u=z+1; u < count; u++) {
    if (u == count-1) {
      document.forms[u].elements[2].innerHTML = `<input type="submit" id="add" value="" onclick="calcPrice(${document.forms.length-2})">`
    } else {
      document.forms[u].elements[2].remove()
      document.forms[u].innerHTML += `<button class="trash" id="trash${u-1}" onclick="wipeOut(${u-1})">${trashIco}</button>`
    }
  }
  // change add button's id
  document.getElementById("add").remove()
  document.forms[count-1].innerHTML += `<input type="submit" id="add" value="" onclick="calcPrice(${document.forms.length-2})">`
  // remove specified section
  document.forms[z].remove()
  // att values from forms
  for (u=0; u<document.forms.length-1; u++) {
    document.getElementsByName("quantityN")[u].value = arrValues[u][0]
    document.getElementsByName("priceN")[u].value = arrValues[u][1]
  }
  // att footer
  if (arrValues.length == 0) {
    tot = 0
    avgPrice = 0.00
  } else if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2)
  } else {
    avgPrice = (products/tot).toFixed(2)
  }
  attFooter()
}

function reset() {
  if (document.forms.length>1) {
    if (document.forms.length>2) {
      for (w=document.forms.length-2; w>0; w--) {
        wipeOut(w)
      }
      wipeOut(0)
    } else {
      wipeOut(0)
    }
  }   
}
