import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._modalForm = this._modalElement.querySelectorAll(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputValues =
      this._modalForm.querySelectorAll(".modal__input").values;
    return inputValues;
  }
  setEventListeners() {
    //submit event
    this._modalElement.addEventListener("submit", () => {
      this.close();
    });
  }

  open() {
    super.open();
  }
  close() {
    //this._modalForm.reset();
    super.close();
  }
}
