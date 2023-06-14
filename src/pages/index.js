import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/API.js";

/*const cardData = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
};*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
const profileTitle = document.querySelector("#profile-title");
const profileAbout = document.querySelector("#profile-about");
const profileTitleInput = document.querySelector("#profile-modal-title");
const profileAboutInput = document.querySelector("#modal-about");
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
const deleteBtnModal = document.querySelector("#modal-delete");
const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const profileImageButton = document.querySelector(".profile__image-button");

const profileImageSaveButton = document.querySelector(".modal__button_save");
const profileImage = document.querySelector("#modal-profile-image");
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
  about: ".profile__about",
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
const cardDeleteModal = new PopupWithForm({
  popupSelector: "#modal-delete",
  handleFormSubmit: () => {},
});
cardDeleteModal.setEventListeners();
const profileImageModal = new PopupWithForm({
  popupSelector: "#modal-profile-image",
  handleFormSubmit: handleProfileImageForm,
});
profileImageModal.setEventListeners();
const profileImageValidator = new FormValidator(
  validationOptions,
  profileImage
);
profileImageValidator.enableValidation();
profileImageButton.addEventListener("click", () => {
  profileImageModal.open();
});

profileImageSaveButton.addEventListener("click", () => {
  handleProfileImageForm();
});

function processLikeClick(card) {
  const isLiked = card.isLiked();
  console.log(isLiked);
  this._likeButton.classList.toggle("card__button_active");
  if (isLiked) {
    api
      .removeCardLike(card._cardId)
      .then((data) => {
        card.setLikesInfo(data.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addCardLike(card._cardId)
      .then((data) => {
        card.setLikesInfo(data.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
function renderCard(cardData) {
  const card = new Card({
    cardData,
    cardSelector: "#card-template",
    _handleCardClick: ({ name, link }) => {
      //here is where we want to open our popupWithImage instance.
      imageModal.open({ name, link });
    },
    handleDeleteClick: (cardId) => {
      // open the modal
      openDeleteModal();
      // set a submit action
      cardDeleteModal.setSubmitAction(() => {
        api
          .deleteCard(cardId)
          .then((res) => {
            cardDeleteModal.setLoading(true);
            card.handleModalDeleteButton();
            cardDeleteModal.setLoading(false);
            closeDeleteModal();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    processLikeClick,

    userId,
  });

  section.addItem(card.getCard());
}
function handleEditModalFormSubmit(inputValues) {
  editModal.setLoading(true);
  api.updateUserInfo(inputValues.name, inputValues.about).then((data) => {
    userInfo.setUserInfo(data);
    editModal.close();
  }).catch((err) => {
    console.error(err);
  editModal.setLoading(false);  
});
}
function handleAddCardFormSubmit(cardData) {
  addCardModal.setLoading(true);
  api.addCard(cardData).then((cardData) => {
    addCardModal.setLoading(false);
    renderCard(cardData);
    addCardModal.close();
  }).catch((err) => {
    console.error(err);
});
}

function handleProfileImageForm() {
  //evt.preventDefault();
  profileImageModal.setLoading(true);
  const profileImage = document.querySelector(".profile__image");
  const profileImageInput = document.querySelector("#profile-image-link");
  profileImage.src = profileImageInput.value;
  profileImageModal.setLoading(false);
  api.updateProfileImage();
  profileImageModal.close();
}

profileEditButton.addEventListener("click", () => {
  const profileData = userInfo.getUserInfo();
  profileTitleInput.value = profileData.name;
  profileAboutInput.value = profileData.about;
  editModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardModal.open();
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
    "Content-Type": "application/json",
  },
}); // log the error to the console

let section;
let userId;

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    userId = userInfo._id;
    section = new Section(
      { items: cards, renderer: renderCard },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

openProfileImageModal();

api.getUserInfo();

function openProfileImageModal() {
  profileImageButton.addEventListener("click", () => {
    profileImageModal.open();
  });
}

function openDeleteModal() {
  deleteBtnModal.classList.add("modal_opened");
}

function closeDeleteModal() {
  deleteBtnModal.classList.remove("modal_opened");
}
