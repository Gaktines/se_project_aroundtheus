import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ cardSelector, handleFormSubmit }) {
    super({ cardSelector });
    this._modalForm = this.modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputValues = document.querySelectorAll(".modal__input").values;
    return inputValues;
    console.log(inputValues);
  }
  close() {
    this._modalForm.reset();
    super.close();
  }
}
