import { onAddClick, reset } from "./midprice";
import { blockChar } from "./simulation";

document.querySelector("#add").addEventListener("click", onAddClick);
document.querySelector("#reset").addEventListener("click", reset);
document.querySelector("#quantity-simu").addEventListener("keypress", blockChar);
document.querySelector("#Bprice-simu").addEventListener("keypress", blockChar);
document.querySelector("#Tprice-simu").addEventListener("keypress", blockChar);
