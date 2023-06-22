import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = this._modalForm.querySelector(".modal__button");
    this._submitBtnText = this._submitBtn.textContent;
    this._inputValues= {};
    this._inputs = this._modalForm.querySelectorAll(".modal__input");
  }
  _getInputValues() {
    this._inputs.forEach((input) => {
      const name = input.name;
      const value = input.value;
      this._inputValues[name] = value;
    });
    return this._inputValues;
  }
  renderLoading(isLoading, loadingText='Saving...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
  setEventListeners() {
    //submit event
    super.setEventListeners();

    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
}
