export default class FormValidator {
  constructor(validationOptions, formElement) {
    this._formSelector = ".modal__form";
    this._inputSelector = ".modal__input";
    this._submitButtonSelector = ".modal__button";
    this._inactiveButtonClass = "modal__button_disabled";
    this._inputErrorClass = "modal__input_type_error";
    this._errorClass = "modal__error_visible";

    this._form = formElement;
    this._options = validationOptions;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._modalElements = Array.from(
      document.querySelectorAll(this._formSelector)
    );
    this._inputElements = Array.from(
      this._modalElement.querySelectorAll(".modal__input")
    );
  }

  _showInputError(inputElement, errorMessageElement) {
    this._errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorMessageElement.textContent =
      this._inputElement.validationMessage;
    this._errorMessageElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement, errorMessageElement) {
    this._errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorMessageElement.textContent = "";
    this._errorMessageElement.classList.remove(this._errorClass);
  }
  _hasInvalidInput() {
    return !this._inputList.every(
      (inputElement) => this._inputElement.validity.valid
    );
  }
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this._saveButton.classList.add(this._options.inactiveButtonClass);
      this._saveButton.disabled = true;
      return;
    }
    this._saveButton.classList.remove(this._options.inactiveButtonClass);
    this._saveButton.disabled = false;
  }
  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      this.showInputError(this._form, this._inputElement, options);
      this.hideInputError(this._form, this._inputElement, options);
    }
  }
  _setEventListeners() {
    const saveButton = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState(this._inputElements, this._options);
    this._inputElements.forEach((inputElement) => {
      this._inputElement.addEventListener("input", () => {
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  enableValidation(formElements, options) {
    this._formElements = Array.from(document.querySelectorAll(".modal__form"));

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form, this._options);
  }
}
