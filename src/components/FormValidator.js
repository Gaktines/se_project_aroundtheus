export default class FormValidator {
  constructor(validationOptions, formElement) {
    console.log(validationOptions);
    this._formSelector = validationOptions.formSelector;
    this._inputSelector = validationOptions.inputSelector;
    this._submitButtonSelector = validationOptions.submitButtonSelector;
    this._inactiveButtonClass = validationOptions.inactiveButtonClass;
    this._inputErrorClass = validationOptions.inputErrorClass;
    this._errorClass = validationOptions.errorClass;
    this._form = formElement;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._saveButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    this._errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessageElement.textContent = inputElement.validationMessage;
    this._errorMessageElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement) {
    console.log(`#${inputElement.id}-error`);
    this._errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessageElement.textContent = "";
    this._errorMessageElement.classList.remove(this._errorClass);
  }
  _hasInvalidInput() {
    return !this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );
  }
  toggleButtonState(saveButton, options) {
    if (this._hasInvalidInput()) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.disabled = true;
      return;
    }
    this._saveButton.classList.remove(this._inactiveButtonClass);
    this._saveButton.disabled = false;
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _setEventListeners() {
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
