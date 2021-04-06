avgPrice = 0

function calcPrice(qnt=Array, price=Array) {
    
    for (i= 0; i< qnt.length; i++) {
      avgPrice += qnt[i]*price[i]
    }
    document.write(" " + avgPrice)
    avgPrice /= qnt.length
    return avgPrice
}
document.write(" " + calcPrice([500,200,100], [10,10,10]).toFixed(2))


