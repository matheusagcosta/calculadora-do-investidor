var avgPrice = 0
var tot = 0
var products = 0
var arrValues = []
var arrTemp = []
var valueQ
var valueP
var garb = `
<form id="garb">

<label for="quantityN" id="quantidade">Quantidade:</label>
<input type="text" name="quantityN" min="0" value="" required>

<label for="priceN" id="preco">Preço:</label>
<input type="text" name="priceN" min="0" value="" required>

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
        <form>

        <label for="quantityN" id="quantidade">Quantidade:</label>
        <input type="text" name="quantityN" min="0" value="" required>

        <label for="priceN" id="preco">Preço:</label>
        <input type="text" name="priceN" min="0" value="" required>

        <input type="submit" id="add" value="+" onclick="calcPrice(${y+1})">

        </form>
        `;
        document.getElementById("section").innerHTML += html

        // add trash button to previous form
        document.forms[y].innerHTML += `<button class="trash" id="trash${y}" onclick="wipeOut(${y})">🔥</button>`

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

  html2 = `
  <label> Quantidade Total: &nbsp;&nbsp; Preço Médio: </label> <br>
  <span class="quantidade">${tot}</span>
  <span class="preco"> R$ ${avgPrice}</span>
  `;
  document.getElementById("footer").innerHTML = html2

  if (arrValues.length!=0) {
    restart = `<button id="restart" onclick="reset()">
    <svg width="20" height="20" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.839 7.92003L14.2693 6.21364C14.1653 6.11127 14.0253 6.05389 13.8794 6.05389C13.7335 6.05389 13.5934 6.11127 13.4895 6.21364L11.9177 7.92003C11.8665 7.97078 11.8257 8.03119 11.7979 8.09777C11.7702 8.16436 11.7559 8.23579 11.7559 8.30794C11.7559 8.38009 11.7702 8.45152 11.7979 8.51811C11.8257 8.58469 11.8665 8.64511 11.9177 8.69585H13.2181C12.9749 9.6097 12.4947 10.4431 11.8261 11.1119C11.1575 11.7807 10.3242 12.2611 9.4104 12.5046C8.34252 12.7839 7.21471 12.7296 6.17862 12.3489C5.14253 11.9682 4.24785 11.2794 3.61488 10.3751L2.51849 11.1298C3.30828 12.2582 4.4247 13.1176 5.71756 13.5925C7.01042 14.0673 8.4177 14.1348 9.75007 13.7859C10.9484 13.4682 12.035 12.8241 12.8889 11.9255C13.7429 11.0268 14.3307 9.90878 14.5869 8.69585H15.838C15.8893 8.6451 15.93 8.58472 15.9577 8.51818C15.9855 8.45164 15.9999 8.38026 16 8.30815C16.0001 8.23604 15.9859 8.16462 15.9583 8.09801C15.9307 8.0314 15.8901 7.97091 15.839 7.92003Z" fill="#313060"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46205 7.02865C4.51334 6.9779 4.55406 6.91749 4.58184 6.8509C4.60963 6.78432 4.62394 6.71289 4.62394 6.64074C4.62394 6.56859 4.60963 6.49715 4.58184 6.43057C4.55406 6.36399 4.51334 6.30357 4.46205 6.25283H2.99785C3.24694 5.35051 3.72778 4.52907 4.39258 3.87008C5.05738 3.2111 5.88302 2.7375 6.78749 2.49634C7.85542 2.21669 8.98339 2.27108 10.0195 2.65219C11.0555 3.0333 11.9499 3.72281 12.582 4.62783L13.6794 3.87211C12.8894 2.74314 11.7726 1.8832 10.4792 1.40799C9.18575 0.932778 7.77783 0.865091 6.44481 1.21403C5.25576 1.5303 4.1767 2.16774 3.32585 3.05652C2.47501 3.9453 1.8852 5.05112 1.62107 6.25283H0.16189C0.110601 6.30357 0.0698842 6.36399 0.0420961 6.43057C0.014308 6.49715 0 6.56859 0 6.64074C0 6.71289 0.014308 6.78432 0.0420961 6.8509C0.0698842 6.91749 0.110601 6.9779 0.16189 7.02865L1.80799 8.67374C1.91195 8.77611 2.052 8.83349 2.19791 8.83349C2.34381 8.83349 2.48386 8.77611 2.58783 8.67374L4.46205 7.02865Z" fill="#313060"/>
    </svg>
    </button>`
    document.getElementById("footer").innerHTML += restart
  }
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
      document.forms[u].elements[2].innerHTML = `<input type="submit" id="add" value="+" onclick="calcPrice(${document.forms.length-2})">`
    } else {
      document.forms[u].elements[2].remove()
      document.forms[u].innerHTML += `<button class="trash" id="trash${u-1}" onclick="wipeOut(${u-1})">🔥</button>`
    }
  }

  // change add button's id
  document.getElementById("add").remove()
  document.forms[count-1].innerHTML += `<input type="submit" id="add" value="+" onclick="calcPrice(${document.forms.length-2})">`
  

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
  
  if (document.forms.length>2) {
    for (w=document.forms.length-2; w>0; w--) {
      wipeOut(w)
    }
    wipeOut(0)

  } else {
    wipeOut(0)
  }
}
