import { onAddClick, blockChar, reset } from "./code";

document.querySelector("#add").addEventListener("click", onAddClick);
document.querySelector('#reset').addEventListener("click", reset);
document.getElementsByName("quantity-mp__input")[0].addEventListener("keypress", blockChar);
document.getElementsByName("price-mp__input")[0].addEventListener("keypress", blockChar);

