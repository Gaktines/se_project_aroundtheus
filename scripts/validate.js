const saveButton = document.querySelector(".modal__button");
const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(modalElement, inputElement, validationOptions) {
  const errorMessageElement = document.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(validationOptions.inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(validationOptions.errorClass);
}

function hideInputError(modalElement, inputElement, validationOptions) {
  const errorMessageElement = document.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(validationOptions.inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(validationOptions.errorClass);
}

function checkInputValidity(modalElement, inputElement, validationOptions) {
  if (!inputElement.validity.valid) {
    showInputError(modalElement, inputElement, validationOptions);
  } else {
    hideInputError(modalElement, inputElement, validationOptions);
  }
}
function isNotValid(inputList) {
  return inputList.every((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputElements, saveButton, validationOptions) {
  if (isNotValid(inputElements)) {
    saveButton.classList.add(validationOptions.inactiveButtonClass);
    saveButton.disabled = true;
  } else {
    saveButton.classList.remove(validationOptions.inactiveButtonClass);
    saveButton.disabled = false;
  }
}
function setEventListeners(modalElement, validationOptions) {
  const inputElements = Array.from(
    modalElement.querySelectorAll(validationOptions.inputSelector)
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(modalElement, inputElement, validationOptions);
      toggleButtonState(inputElements, saveButton, validationOptions);
    });
  });
}
function enableValidation(validationOptions) {
  const modalElements = Array.from(
    document.querySelectorAll(validationOptions.formSelector)
  );
  modalElements.forEach((modalElement) => {
    modalElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(modalElement, validationOptions);
  });
}

enableValidation(validationOptions);
