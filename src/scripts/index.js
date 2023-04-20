import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import "../pages/index.css";
import Section from "./Section.js";
import Popup from "./Popup.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];
const cardData = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
};
const modalCloseButton = document.querySelectorAll(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
const profileTitle = document.querySelector("#profile-title");
const profileSubheading = document.querySelector("#profile-subheading");
const profileTitleInput = document.querySelector("#profile-modal-title");
const profileSubheadingInput = document.querySelector("#modal-subheading");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const cardTemplateInput =
  document.querySelector("#card-template").content.firstElementChild;
const cardListTemplate = document.querySelector("#card-list");
const addCardEditModal = document.querySelector("#add-card-edit-modal");
const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
const addCardButton = document.querySelector("#profile-add-button");
const addCardTitleInput = document.querySelector("#add-card-modal-title");
const addCardLinkInput = document.querySelector("#add-card-link");
const addCardTitle = document.querySelector(".modal__title_card");
const addCardLink = document.querySelector("#add-card-link");
const addCardTitlePlaceholder = document.querySelector("#Title");
const addCardLinkPlaceholder = document.querySelector("#Image Link");
const addCardForm = addCardEditModal.querySelector("#add-card-modal-form");
const cardsWrap = document.querySelector("#card-list");
const imageModal = document.querySelector("#image-modal");

const imageModalCloseBtn = document.querySelector("#modal-close-button");

const cardFormSubmitButton = document.querySelector(".modal__button_add_card");
const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationOptions,
  profileEditModal
);
const addCardFormValidator = new FormValidator(
  validationOptions,
  addCardEditModal
);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const profileEditFormElement = profileEditModal.querySelector(
  "#profile-modal-form"
);
const addCardEditFormElement = addCardEditModal.querySelector(
  "#add-card-modal-form"
);

function closeEditModalPopup() {
  closeModal(profileEditModal);
}
function closeAddCardModalPopup() {
  closeModal(addCardEditModal);
}
//function renderCard(cardData) {

//}
function handleProfileEditForm(evt) {}
function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
}
function handleAddCardForm(evt) {
  evt.preventDefault();
  const titleValue = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  renderCard(titleValue, cardsWrap);
  closeModal(addCardEditModal);
  addCardForm.reset();
  //this._toggleButtonState
  addCardFormValidator.toggleButtonState();
}

const cardElement = cardTemplateInput.cloneNode(true);

const cardImageElement = cardElement.querySelector("#card-image");

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);

addCardEditModal.addEventListener("mousedown", closeModalOnRemoteClick);

imageModal.addEventListener("mousedown", closeModalOnRemoteClick);

profileEditForm.addEventListener("submit", handleProfileEditForm);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubheadingInput.value = profileSubheading.textContent;
  openModal(profileEditModal);
});

addCardButton.addEventListener("click", () => openModal(addCardEditModal));

addCardForm.addEventListener("submit", handleAddCardForm);
profileModalCloseButton.addEventListener("click", closeEditModalPopup);
addCardModalCloseButton.addEventListener("click", closeAddCardModalPopup);
profileEditForm.addEventListener("submit", handleProfileEditForm);
imageModalCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});

const section = new Section({ items, renderer: () => {} }, ".cards__list");

section.renderItems();

class UserInfo {
  constructor({ name, job }) {}
  getUserInfo(evt) {
    evt.preventDefault();
    this.name.textContent = profileTitleInput.value;
    this.job.textContent = profileSubheadingInput.value;
    closeModal(profileEditModal);
  }
  setUserInfo() {
    this._cardElement = this._getTemplate();
    //get the card view

    this._cardElement.querySelector("#card-image").src = this._link;
    this._cardElement.querySelector().textContent = this._name;
    this._cardElement.querySelector("#card-image").alt = this._name;
    //set the event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}

const newModal = new PopupWithForm("#profile-edit-modal", () => {});
newCardPopup.open();

newCardPopup.close();
