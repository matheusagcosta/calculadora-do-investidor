//tom de vermelho => #F5899D;
export const blockChar = (evnt) => {
  let charCode = evnt.charCode;
  if (charCode != 0) {
    if (charCode < 44 || charCode > 57 || charCode == 45 || charCode==47) {
      evnt.preventDefault();
    };
  };
};

const handleComma = (str) => {
  if (str.replace(/,/g, ".")) {
    str = str.replace(/,/g, ".");
  };

  return str;
};

const getQuant = () => {
  let simuQuant = document.getElementById("quantity-simu").value;

  simuQuant = handleComma(simuQuant);
  simuQuant = parseInt(simuQuant); //retorna uma string 

  return parseInt(simuQuant);
};

const getBuyPrice = () => {
  let simuBprice = document.getElementById("Bprice-simu").value;

  simuBprice = handleComma(simuBprice);
  simuBprice = parseFloat(simuBprice).toFixed(2); //retorna uma string

  return parseFloat(simuBprice);
};

const getTargetPrice = () => {
  let simuTprice = document.getElementById("Tprice-simu").value;

  simuTprice = handleComma(simuTprice);
  simuTprice = parseFloat(simuTprice).toFixed(2); //retorna uma string

  return parseFloat(simuTprice);
};

const calculations = () => {
  let quant = getQuant();
  let Bprice = getBuyPrice();
  let Tprice = getTargetPrice();

  let start = (quant * Bprice).toFixed(2);
  
  let valorization = (quant * (Tprice - Bprice)).toFixed(2);

  let percent = ((Tprice / Bprice) - 1)*100;
  percent = percent.toFixed(2);
  
  let total = (quant * Tprice).toFixed(2);

  return [start, valorization, percent, total];
};

const attSimuResults = (start, valorization, percent, total) => {

};  
