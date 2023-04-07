export default class FormValidator {
  constructor(validationOptions, formElement) {
    this._formSelector = ".modal__form";
    this._inputSelector = ".modal__input";
    this._submitButtonSelector = ".modal__button";
    this._inactiveButtonClass = "modal__button_disabled";
    this._inputErrorClass = "modal__input_type_error";
    this._errorClass = "modal__error_visible";

    this._form = formElement;
    // this._options = validationOptions;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._inputElements = Array.from(
      formElement.querySelectorAll(".modal__input")
    );
    this._saveButton = this._form.querySelector(".modal__button");
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
  _toggleButtonState() {
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
    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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
