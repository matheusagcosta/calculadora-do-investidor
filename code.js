var avgPrice = 0
var tot = 0

function calcPrice(qnt=Array, price=Array) {

    for (i= 0; i< qnt.length; i++) {
      tot += qnt[i]*price[i]
    }
    avgPrice = tot/qnt.length
    return tot, avgPrice
}
