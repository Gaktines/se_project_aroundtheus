import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import "../pages/index.css";
import Section from "../scripts/Section.js";
import Popup from "../scripts/Popup.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

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
//const modalCloseButton = document.querySelectorAll(".modal__close");
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
//const cardList = document.querySelector("#card-list");
const addCardEditModal = document.querySelector("#add-card-edit-modal");
const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
const addCardButton = document.querySelector("#profile-add-button");
const addCardTitleInput = document.querySelector("#add-card-modal-title");
const addCardLinkInput = document.querySelector("#add-card-link");
//const addCardTitle = document.querySelector(".modal__title_card");

const addCardForm = addCardEditModal.querySelector("#add-card-modal-form");
const cardsWrap = document.querySelector("#card-list");

const imageModalCloseBtn = document.querySelector("#modal-close-button");

//const cardFormSubmitButton = document.querySelector(".modal__button_add_card");
//const modal = document.querySelectorAll(".modal");
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

/*const profileEditFormElement = profileEditModal.querySelector(
  "#profile-modal-form"
);
const addCardEditFormElement = addCardEditModal.querySelector(
  "#add-card-modal-form"
);*/
const userInfo = new UserInfo({
  title: ".profile__title",
  job: ".profile__subheading",
});

const editModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleEditModalFormSubmit,
});
editModal.setEventListeners();
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-edit-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardModal.setEventListeners();
const imageModal = new PopupWithImage({
  popupSelector: "#image-modal",
});
imageModal.setEventListeners();
const section = new Section({ items: initialCards, renderer: renderCard }, ".cards__list");
section.renderItems();
function renderCard(cardData) {
  const card = new Card({
    cardData,
    cardSelector: "#card-template",
    handleCardClick: ({ name, link }) => {
      //here is where we want to open our popupWithImage instance.
      imageModal.open({ name, link });
    },
  });
  //cardsWrap.prepend(card.getCard());
 section.addItem(card.getCard());
}
function handleEditModalFormSubmit(inputValues) {
  editModal.close();
}
function handleAddCardFormSubmit (inputValues)  {
  addCardModal.close();
    
    }

function handleProfileEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubheading.textContent = profileSubheadingInput.value;
  //closeModal(profileEditModal);
}

function handleAddCardForm(evt) {
  evt.preventDefault();
  const titleValue = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  renderCard(titleValue, cardsWrap);
  //closeModal(addCardEditModal);
  addCardForm.reset();
  //this._toggleButtonState
  //addCardFormValidator.toggleButtonState();
}




const cardElement = cardTemplateInput.cloneNode(true);

const cardImageElement = cardElement.querySelector("#card-image");

//profileEditForm.addEventListener("submit", handleProfileEditForm);
profileEditButton.addEventListener("click", () => {
  const profileData = userInfo.getUserInfo();
  profileTitleInput.value = profileData.title;
  profileSubheadingInput.value = profileData.job;
  editModal.open();
});

addCardButton.addEventListener("click", () => addCardModal.open());

addCardForm.addEventListener("submit", handleAddCardForm);

profileEditForm.addEventListener("submit", handleProfileEditForm);
/*imageModalCloseBtn.addEventListener("click", () => {
  imageModal.close();
});*/


