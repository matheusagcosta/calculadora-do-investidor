import { setBorderColor } from "./midprice";

const validateFloat = new RegExp("[0-9]+[\.]?[0-9]*");
const validateInt = new RegExp("[0-9]+");

const getQuant = () => {
  let simuQuant = document.getElementById("quantity-simu").value;

  simuQuant = validateInt.exec(simuQuant)[0];
  simuQuant = parseInt(simuQuant);
  
  return simuQuant;
};

const getBuyPrice = () => {

  let simuBprice = document.getElementById("Bprice-simu").value;

  simuBprice = handleComma(simuBprice);

  if (validateFloat.exec(simuBprice) != null) {
    simuBprice = validateFloat.exec(simuBprice)[0];
    simuBprice = parseFloat(simuBprice).toFixed(2); //retorna string

    return [true, parseFloat(simuBprice)];
  } 
  else if (validateInt.exec(simuBprice) != null) {
    simuBprice = validateInt.exec(simuBprice)[0];
    simuBprice = parseFloat(simuBprice).toFixed(2); //retorna string

    return [true, parseFloat(simuBprice)];
  }
  else {
    setBorderColor("Bprice-simu", "red");
    return [false]
  };

};

const getTargetPrice = () => {
  let simuTprice = document.getElementById("Tprice-simu").value;

  simuTprice = handleComma(simuTprice);
  simuTprice = validateFloat.exec(simuTprice)[0];

  return simuTprice;
};

const handleComma = (str) => {
  if (str.replace(/,/g, ".")) {
    str = str.replace(/,/g, ".");
  };

  return str;
};

const calculations = () => {

};


const attSimuResults = (quant, Bprice, Tprice, percent) => {

};
