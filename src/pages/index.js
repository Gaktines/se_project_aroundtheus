import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/API.js";


const cardData = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
};

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

const addCardEditModal = document.querySelector("#add-card-edit-modal");
const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
const addCardButton = document.querySelector("#profile-add-button");
const addCardTitleInput = document.querySelector("#add-card-modal-title");
const addCardLinkInput = document.querySelector("#add-card-link");

const addCardForm = addCardEditModal.querySelector("#add-card-modal-form");
const cardsWrap = document.querySelector("#card-list");

const imageModalCloseBtn = document.querySelector("#modal-close-button");

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

const userInfo = new UserInfo({
  name: ".profile__title",
  subheading: ".profile__subheading",
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

function renderCard(cardData) {
  const card = new Card({
    cardData,
    cardSelector: "#card-template",
    _handleCardClick: ({ name, link }) => {
      //here is where we want to open our popupWithImage instance.
      imageModal.open({ name, link });
    },
    handleDeleteClick,
    _handleLikeClick: () => {
      //tell API to add like
      return fetch(`https://around.nomoreparties.co/v1/group-12/cards/likes/${id}`, {
    method: "PUT",  
    headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
      }
    })
      //get response from API
    .then(res => res.json())
    
    }
    
  });

  section.addItem(card.getCard());
}
function handleEditModalFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  editModal.close();
}
function handleAddCardFormSubmit(inputValues) {
  renderCard(inputValues);
  addCardModal.close();
}

function handleProfileEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubheading.textContent = profileSubheadingInput.value;
}


const cardElement = cardTemplateInput.cloneNode(true);

const cardImageElement = cardElement.querySelector("#card-image");

profileEditButton.addEventListener("click", () => {
  const profileData = userInfo.getUserInfo();
  profileTitleInput.value = profileData.name;
  profileSubheadingInput.value = profileData.subheading;
  editModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardModal.open()
}); 


  const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
      "Content-Type": "application/json"
    }
  }); 
let section;
let userId;

api.getAppInfo().then(([cards, userInfo]) => {
  section = new Section(
    { items: cards, renderer: renderCard },
    ".cards__list"
  );
  section.renderItems();
  cards.setLikesInfo();
  userId = userInfo._id;
});

function handleDeleteClick(card) {
  // open the modal
 
  const deleteBtnModal = document.querySelector("#modal-delete");
    deleteBtnModal.classList.add("modal_opened");
  // set a submit action
  //super._setEventListeners();
  api.deleteCard(this._userId) 
  .then((res) => {
   
    this._cardElement.remove();
    this._cardElement = null;

  });
}


