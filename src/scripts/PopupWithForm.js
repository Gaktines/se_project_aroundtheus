import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleAddCardFormSubmit, handleEditModalFormSubmit }) {
    super({ popupSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleAddCardFormSubmit = handleAddCardFormSubmit;
    this._handleEditModalFormSubmit = handleEditModalFormSubmit;
  }
  _getInputValues() {
    const inputValues = {};
      const inputs = this._modalForm.querySelectorAll("input");
    inputs.forEach((input) => {
      const name = input.name;
const value = input.value;
inputValues[name] = value;
    });
      return inputValues;
  }
 setEventListeners() {
  //submit event 

  this._modalForm.addEventListener("submit", () => { 
this._handleAddCardFormSubmit(this._getInputValues);
   

   }); 
   this._modalForm.addEventListener("submit", () => {
    this._handleEditModalFormSubmit(this._getInputValues);
   });

   } 
  open() {
    super.open();
  }
  close() {
    super.close();
    this._modalForm.reset();
  }
}
