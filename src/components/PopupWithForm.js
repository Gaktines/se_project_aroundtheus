import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputValues = {};
    const inputs = this._modalForm.querySelectorAll(".modal__input");
    inputs.forEach((input) => {
      const name = input.name;
      const value = input.value;
      inputValues[name] = value;
    });
    return inputValues;
  }
  setLoading(isLoading) {
    const modalSubmitButton = this._modalElement.querySelector(".modal__button");
    if (isLoading) {
      modalSubmitButton.textContent = "Saving";
    } else {
      modalSubmitButton.textContent =
        modalSubmitButton.textContent;
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

  open() {
    super.open();
  }
  close() {
    this._modalForm.reset();
    super.close();
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
}
