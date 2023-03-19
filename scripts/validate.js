const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const options = validationOptions;
const saveButton = document.querySelector(options.submitButtonSelector);

function showInputError(modalElement, inputElement, options) {
  const errorMessageElement = modalElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(options.inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(options.errorClass);
}

function hideInputError(modalElement, inputElement, options) {
  const errorMessageElement = modalElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(options.inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(options.errorClass);
}

function checkInputValidity(modalElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(modalElement, inputElement, options);
    saveButton.disabled = true;
  } else {
    hideInputError(modalElement, inputElement, options);
    saveButton.disabled = false;
  }
}
function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function toggleButtonState(inputElements, saveButton, options) {
  if (hasInvalidInput(inputElements)) {
    saveButton.classList.add(options.inactiveButtonClass);
    saveButton.disabled = true;
    return;
  }
  saveButton.classList.remove(options.inactiveButtonClass);
  saveButton.disabled = false;
}

function setEventListeners(modalElement, options) {
  const inputElements = Array.from(
    modalElement.querySelectorAll(options.inputSelector)
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(modalElement, inputElement, options);
      toggleButtonState(inputElements, saveButton, options);
    });
  });
}
function enableValidation(options) {
  const modalElements = Array.from(
    document.querySelectorAll(validationOptions.formSelector)
  );
  modalElements.forEach((modalElement) => {
    modalElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(modalElement, options);
  });
}

enableValidation(validationOptions);
