import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/API.js";
import {
  profileEditButton,
  profileImage,
  profileImageSaveButton,
  profileImageButton,
  validationOptions,
  deleteBtnModal,
  imageModalCloseBtn,
  cardsWrap,
  addCardForm,
  addCardLinkInput,
  addCardTitleInput,
  addCardButton,
  addCardModalCloseButton,
  addCardEditModal,
  deleteBtn,
  cardTemplateInput,
  profileEditForm,
  profileAboutInput,
  profileTitleInput,
  profileAbout,
  profileTitle,
  profileEditModal,
  profileModalCloseButton,
} from "../utils/constants.js";


profileImageButton.addEventListener("click", () => {
  profileImageModal.open();
});
const editFormValidator = new FormValidator(
  validationOptions,
  profileEditModal
);
const addCardFormValidator = new FormValidator(
  validationOptions,
  addCardEditModal
);
const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__about",
});

const editModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleEditModalFormSubmit,
});
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-edit-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
const imageModal = new PopupWithImage({
  popupSelector: "#image-modal",
});
const cardDeleteModal = new PopupWithForm({
  popupSelector: "#modal-delete",
  handleFormSubmit: () => {},
});
const profileImageModal = new PopupWithForm({
  popupSelector: "#modal-profile-image",
  handleFormSubmit: handleProfileImageForm,
});
const profileImageValidator = new FormValidator(
  validationOptions,
  profileImage
);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
profileImageValidator.enableValidation();
editModal.setEventListeners();

addCardModal.setEventListeners();

imageModal.setEventListeners();

cardDeleteModal.setEventListeners();

profileImageModal.setEventListeners();



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
      cardDeleteModal.open();
      // set a submit action
      cardDeleteModal.setSubmitAction(() => {
        cardDeleteModal.renderLoading(true);  
        api
          .deleteCard(cardId)
          .then((res) => {
            card.handleModalDeleteButton();
            cardDeleteModal.close();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(()=>{
            cardDeleteModal.renderLoading(false);
          }); 
      });
      card.processLikeClick();
    },
   

    userId,
  });

  section.addItem(card.getCard());
}
function handleEditModalFormSubmit(inputValues) {
  editModal.renderLoading(true);
  api.updateUserInfo(inputValues.name, inputValues.about).then((data) => {
    userInfo.setUserInfo(data);
    editModal.close();
  }).catch((err) => {
    console.error(err)})
    .finally(()=>{
      editModal.renderLoading(false);
    }); 
}
function handleAddCardFormSubmit(cardData) {
  addCardModal.renderLoading(true);
  api
    .addCard(cardData)
    .then((cardData) => {
      renderCard(cardData);
      addCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    }).finally(()=>{
      addCardModal.renderLoading(false);
    });
}

function handleProfileImageForm(inputValues) {
  //evt.preventDefault();
  profileImageModal.renderLoading(true);
  const profileImage = document.querySelector(".profile__image");
 api.updateProfileImage(inputValues).then((res) => {
  profileImage.src = inputValues.link;
    profileImageModal.close();
  }).catch((err) => {
    console.error(err)})
    .finally(()=>{
      profileImageModal.renderLoading(false);
    });
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
profileImageButton.addEventListener("click", () => {
  profileImageValidator.toggleButtonState();
  profileImageModal.open();
})

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
  .then(([cards, userData]) => {
    userId = userData._id;
    section = new Section(
      { items: cards, renderer: renderCard },
      ".cards__list"
    );
    section.renderItems();
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.error(err);
  });

openProfileImageModal();

function openProfileImageModal() {
  profileImageButton.addEventListener("click", () => {
    profileImageModal.open();
  });
}
