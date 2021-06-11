import { onAddClick, attFooter, removeForm, reset } from "./code";

document.querySelector("#add").addEventListener("click", onAddClick);

//document.querySelector('#trash0').addEventListener('click', removeForm);
for (let c = 0; c < document.forms.length; c ++) {
  document.querySelector(`#trash${c}`).addEventListener("click", removeForm)
}

//document.querySelector('#reset').addEventListener('click', reset);
