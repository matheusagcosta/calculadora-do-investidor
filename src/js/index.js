import { onAddClick, attFooter, removeForm, reset } from "./code";

document.querySelector("#add").addEventListener("click", () => {
  onAddClick()
  getTrashID()
});

//document.querySelector('#trash0').addEventListener('click', removeForm);
//document.querySelector('#reset').addEventListener('click', reset);

const getTrashID = () => {
  for (let trashID = 0; trashID < document.forms.length-1; trashID ++) {
    console.log('entrei o loop');
    document.getElementById(`trash${trashID}`).addEventListener("click", () => {
      removeForm(trashID)
    });
    console.log('terminei o loop');
  };
};
