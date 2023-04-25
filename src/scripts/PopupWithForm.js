class PopupWithForm extends Popup {
  constructor({ cardSelector, handleFormSubmit }) {
    super({ cardSelector });
    this._modalForm = this.modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputValues =
      this._modalForm.querySelectorAll(".modal__input").values;
    return inputValues;
  }
  open() {
    super.open();
    this._getInputValues();
  }
  close() {
    this._modalForm.reset();
    super.close();
  }
}
this.open();
this.close();
