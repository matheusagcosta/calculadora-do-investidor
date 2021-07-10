import { onAddClick, reset } from "./midprice";
import { blockChar, attSimuResults } from "./simulation";

document.querySelector("#add").addEventListener("click", onAddClick);
document.querySelector("#reset").addEventListener("click", reset);

document.querySelector("#quantity-simu").addEventListener("keypress", blockChar);
document.querySelector("#quantity-simu").addEventListener("input", attSimuResults);

document.querySelector("#Bprice-simu").addEventListener("keypress", blockChar);
document.querySelector("#Bprice-simu").addEventListener("input", attSimuResults);

document.querySelector("#Tprice-simu").addEventListener("keypress", blockChar);
document.querySelector("#Tprice-simu").addEventListener("input", attSimuResults);
