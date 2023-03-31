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
    if (hasInvalidInput(this._inputElements)) {
      saveButton.classList.add(this._options.inactiveButtonClass);
      saveButton.disabled = true;
      return;
    }
    saveButton.classList.remove(this._options.inactiveButtonClass);
    saveButton.disabled = false;
  }
  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      showInputError(this._form, this._inputElement, options);
      hideInputError(this._form, this._inputElement, options);
    }
  }
  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const saveButton = this._form.querySelector(this._submitButtonSelector);

    _toggleButtonState(this._inputElements, this._options);
    this._inputElements.forEach((inputElement) => {
      this._inputElement.addEventListener("input", () => {
        _checkInputValidity();
        _toggleButtonState();
      });
    });
  }

  enableValidation(options) {
    //const formElements = Array.from(document.querySelectorAll(".modal__form"));

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    _setEventListeners(formElement, options);
  }
}
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardEditModal = document.querySelector("#add-card-edit-modal");

const editFormValidator = new FormValidator(this._options, profileEditModal);
const addCardFormValidator = new FormValidator(this._options, addCardEditModal);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
