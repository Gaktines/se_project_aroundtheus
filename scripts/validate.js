function showInputError(modalElment, inputElement, validationOptions) {
const errorMessageElement = document.querySelector(`#${inputElement.id}-error`);
inputElement.classList.add(validationOptions.inputErrorClass);
errorMessageElement.textContent = inputElement.validationMessage;
errorMessageElement.classList.add(validationOptions.errorClass);
}

function hideInputError(modalElment, inputElement, validationOptions) {
  const errorMessageElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationOptions.inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(validationOptions.errorClass);
  }

function checkInputValidity(modalElment, inputElement, validationOptions) {
if (!inputElement.validity.valid) {
  showInputError(modalElment, inputElement, validationOptions);
} else {
  hideInputError(modalElment, inputElement, validationOptions);
}
}

function toggleButtonState(inputElements, saveButton, validationOptions) {
let notValid = false;
inputElements.forEach(inputElement => {
if (!inputElement.validity.valid) {
  notValid = true;
}
});
if (notValid) {
  saveButton.classList.add(validationOptions.inactiveButtonClass);
  saveButton.disabled= true;
}else {
  saveButton.classList.remove(validationOption.inactiveButtonClass);
  saveButton.disabled= false;
}
}

function setEventListeners(modalElement, validationOptions) {
  const inputElements = Array.from(
    modalElement.querySelectorAll(validationOptions.inputSelector));
    const saveButton = modalElement.querySelector(".modal__button");
    inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
checkInputValidity(modalElment, inputElement, validationOptions);
toggleButtonState(inputElements, saveButton, validationOptions);
    });
  });

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


const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(validationOptions);

