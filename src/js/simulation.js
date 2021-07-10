import { setBorderColor } from "./midprice";

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

  
};

const getBuyPrice = () => {

  let simuBprice = document.getElementById("Bprice-simu").value;


};

const getTargetPrice = () => {
  let simuTprice = document.getElementById("Tprice-simu").value;

};

const calculations = () => {};

const attSimuResults = (quant, Bprice, Tprice, percent) => {};
