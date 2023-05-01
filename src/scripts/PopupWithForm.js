import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    
  }
  _getInputValues() {
    const inputValues = {};
      const inputs = this._modalForm.querySelectorAll("modal__input");
    inputs.forEach((input) => {
      const name = input.name;
const value = input.value;
inputValues[name] = value;
    });
      return inputValues;
  }
 setEventListeners() {
  //submit event 
  super.setEventListeners();
  
  this._modalForm.addEventListener("submit", () => {
    this._handleFormSubmit(this._getInputValues);
  });
}
   
  
  open() {
    super.open();
  }
  close() {
    
    super.close();
    this._modalForm.setUserInfo();
    this._modalForm.reset();
  }
}
