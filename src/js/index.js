import { onAddClick, reset } from "./midprice";
import { blockChar, attSimuResults } from "./simulation";
import { attLeftPercentResults } from "./percentage";

document.querySelector("#add").addEventListener("click", onAddClick);
document.querySelector("#reset").addEventListener("click", reset);

document.querySelector("#quantity-simu").addEventListener("keypress", blockChar);
document.querySelector("#quantity-simu").addEventListener("input", attSimuResults);

document.querySelector("#Bprice-simu").addEventListener("keypress", blockChar);
document.querySelector("#Bprice-simu").addEventListener("input", attSimuResults);

document.querySelector("#Tprice-simu").addEventListener("keypress", blockChar);
document.querySelector("#Tprice-simu").addEventListener("input", attSimuResults);

document.querySelector("#percentage-percentLeft").addEventListener("keypress", blockChar);
document.querySelector("#percentage-percentLeft").addEventListener("input", function() {
  attLeftPercentResults("left");
});
document.querySelector("#amount-percentLeft").addEventListener("keypress", blockChar);
document.querySelector("#amount-percentLeft").addEventListener("input", function() {
  attLeftPercentResults("left");
});

document.querySelector("#portion-percentMiddle").addEventListener("keypress", blockChar);
document.querySelector("#portion-percentMiddle").addEventListener("input", function() {
  attLeftPercentResults("middle");
});
document.querySelector("#percentage-percentMiddle").addEventListener("keypress", blockChar);
document.querySelector("#percentage-percentMiddle").addEventListener("input", function() {
  attLeftPercentResults("middle");
});

document.querySelector("#portion-percentRight").addEventListener("keypress", blockChar);
document.querySelector("#portion-percentRight").addEventListener("input", function() {
  attLeftPercentResults("right");
});
document.querySelector("#total-percentRight").addEventListener("keypress", blockChar);
document.querySelector("#total-percentRight").addEventListener("input", function() {
  attLeftPercentResults("right");
});
