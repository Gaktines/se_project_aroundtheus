import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ cardSelector, handleFormSubmit }) {
    super({ cardSelector });
    this._modalForm = this.modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  close() {
    this._modalForm.reset();
    super.close();
  }
}
