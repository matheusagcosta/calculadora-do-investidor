export const blockChar = (evnt) => {
  let charCode = evnt.charCode;
  if (charCode != 0) {
    if (charCode < 44 || charCode > 57 || charCode == 45 || charCode==47) {
      evnt.preventDefault();
    };
  };
};

export const handleComma = (str) => {
  if (str.replace(/,/g, ".")) {
    str = str.replace(/,/g, ".");
  };

  return str;
};

export const attSimuResults = () => {
  let results = calculations();

  if (results[0][0] && results[0][1]) {
    document.getElementById("results-simu-starter").innerHTML = `R$ ${results[1]}`;
  } else { document.getElementById("results-simu-starter").innerHTML = "R$ 0,00"; };

  if (results[0][1] && results[0][2]) {
    document.getElementById("results-simu-percent").innerHTML = `R$ 0,00 (${results[3]}%)`;
    checkPercent(results[3]);
  } else {
    document.getElementById("results-simu-percent").innerHTML = "R$ 0,00 (0%)";
    setColor("results-simu-percent", "#DBDEF9");
  };

  if (results[0][0] && results[0][2]) {
    document.getElementById("results-simu-total").innerHTML = `R$ ${results[4]}`;
  } else { document.getElementById("results-simu-total").innerHTML = "R$ 0,00"; };

  if (results[0][0] && results[0][1] && results[0][2]) {
    document.getElementById("results-simu-percent").innerHTML = `R$ ${results[2]} (${results[3]}%)`;
    checkPercent(results[3]);
  };
};

const getQuant = () => {
  let simuQuant = document.getElementById("quantity-simu").value;

  if (simuQuant=="") { return simuQuant; };

  simuQuant = handleComma(simuQuant);
  simuQuant = parseInt(simuQuant); //retorna uma string 

  return parseInt(simuQuant);
};

const getBuyPrice = () => {
  let simuBprice = document.getElementById("Bprice-simu").value;

  if (simuBprice=="") { return simuBprice; };

  simuBprice = handleComma(simuBprice);
  simuBprice = parseFloat(simuBprice).toFixed(2); //retorna uma string

  return parseFloat(simuBprice);
};

const getTargetPrice = () => {
  let simuTprice = document.getElementById("Tprice-simu").value;

  if (simuTprice=="") { return simuTprice; };

  simuTprice = handleComma(simuTprice);
  simuTprice = parseFloat(simuTprice).toFixed(2); //retorna uma string

  return parseFloat(simuTprice);
};

const checkCondition = (quant, Bprice, Tprice) => {
  let condition = [true, true, true];

  if (quant=="") {
    condition[0] = false;
  };

  if (Bprice=="") {
    condition[1] = false;
  };

  if (Tprice=="") {
    condition[2] = false;
  };

  return condition;
};

const calculations = () => {
  let quant = getQuant();
  let Bprice = getBuyPrice();
  let Tprice = getTargetPrice();

  let condition = checkCondition(quant, Bprice, Tprice);

  let start = (quant * Bprice).toFixed(2);
  
  let valorization = (quant * (Tprice - Bprice)).toFixed(2);

  let percent = ((Tprice / Bprice) - 1)*100;
  percent = percent.toFixed(2);
  
  let total = (quant * Tprice).toFixed(2);

  return [condition, start, valorization, percent, total];
};

const setColor = (id, hex) => {
  document.getElementById(`${id}`).setAttribute("style", `color: ${hex};`)
};

const checkPercent = (percent) => {
  if (percent > 0) { setColor("results-simu-percent", "#89F5E2"); } 
  else if (percent < 0) { setColor("results-simu-percent", "#F5899D"); }
  else { setColor("results-simu-percent", "#DBDEF9"); };
};
