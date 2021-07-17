import { handleComma } from "./simulation";

export const attLeftPercentResults = (location) => {
  if (location=="left") {
    const resultL = calculationsLeft();
    if (resultL[0]) {
      document.getElementById("results-percent-left").innerHTML = `${resultL[1].toFixed(2)}`;
    } else {
      document.getElementById("results-percent-left").innerHTML = "0";
    };
  };

  if (location=="middle") {
    const resultM = calculationsMiddle();
    if (resultM[0]) {
      document.getElementById("results-percent-middle").innerHTML = `${resultM[1].toFixed(2)}`;
      console.log(resultM)
    } else {
      document.getElementById("results-percent-middle").innerHTML = "0";
    };
  };

  if (location=="right") {
    const resultR = calculationsRight();
    if (resultR[0]) {
      document.getElementById("results-percent-right").innerHTML = `${resultR[1].toFixed(2)}%`;
      console.log(resultR)
    } else {
      document.getElementById("results-percent-right").innerHTML = "0%";
    };
  };
};

const getLeftPercent = () => {
  let leftPercent = document.getElementById("percentage-percentLeft").value;

  if (leftPercent == "") { return leftPercent; };

  leftPercent = handleComma(leftPercent);
  leftPercent = parseFloat(leftPercent); //retorna uma string

  return parseFloat(leftPercent);
};

const getLeftAmount = () => {
  let leftAmount = document.getElementById("amount-percentLeft").value;

  if (leftAmount == "") { return leftAmount; };

  leftAmount = handleComma(leftAmount);
  leftAmount = parseFloat(leftAmount); //retorna uma string

  return parseFloat(leftAmount);
};

const calculationsLeft = () => {
  let leftPercent = getLeftPercent();
  let leftAmount = getLeftAmount();

  if (leftPercent == "" || leftAmount == "") { return [false]; };

  let leftResult = leftAmount*(leftPercent/100);

  return [true, leftResult];
};

const getMiddlePortion = () => {
  let middlePortion = document.getElementById("portion-percentMiddle").value;

  if (middlePortion == "") { return middlePortion; };

  middlePortion = handleComma(middlePortion);
  middlePortion = parseFloat(middlePortion); //retorna uma string

  return parseFloat(middlePortion);
};

const getMiddlePercent = () => {
  let middlePercent = document.getElementById("percentage-percentMiddle").value;

  if (middlePercent == "") { return middlePercent; };

  middlePercent = handleComma(middlePercent);
  middlePercent = parseFloat(middlePercent); //retorna uma string

  return parseFloat(middlePercent);
};

const calculationsMiddle = () => {
  let middlePortion = getMiddlePortion();
  let middlePercent = getMiddlePercent();

  if (middlePortion == "" || middlePercent == "" || middlePercent == 0) { return [false]; };

  let middleResult = middlePortion/(middlePercent/100);

  return [true, middleResult];
};

const getRightPortion = () => {
  let rightPortion = document.getElementById("portion-percentRight").value;

  if (rightPortion == "") { return rightPortion; };

  rightPortion = handleComma(rightPortion);
  rightPortion = parseFloat(rightPortion); //retorna uma string

  return parseFloat(rightPortion);
};

const getRightTotal = () => {
  let rightTotal = document.getElementById("total-percentRight").value;

  if (rightTotal == "") { return rightTotal; };

  rightTotal = handleComma(rightTotal);
  rightTotal = parseFloat(rightTotal); //retorna uma string

  return parseFloat(rightTotal);
};

const calculationsRight = () => {
  let rightPortion = getRightPortion();
  let rightTotal = getRightTotal();

  if (rightPortion == "" || rightTotal == "" || rightTotal == 0) { return [false]; };

  let rightResult = (rightPortion/rightTotal)*100;

  return [true, rightResult];
};
