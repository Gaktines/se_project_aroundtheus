import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/API.js";

import {profileEditButton} from "../utils/constants.js";
import {profileEditModal} from "../utils/constants.js";
import {profileModalCloseButton} from "../utils/constants.js";
import {profileTitle} from "../utils/constants.js";
import {profileAbout} from "../utils/constants.js";
import {profileTitleInput} from "../utils/constants.js";
import {profileAboutInput} from "../utils/constants.js";
import {profileEditForm} from "../utils/constants.js";
import {cardTemplateInput} from "../utils/constants.js";
import {deleteBtn} from "../utils/constants.js";
import {addCardEditModal} from "../utils/constants.js";
import {addCardModalCloseButton} from "../utils/constants.js";
import {addCardButton} from "../utils/constants.js";
import {addCardTitleInput} from "../utils/constants.js";
import {addCardLinkInput} from "../utils/constants.js";
import {addCardForm} from "../utils/constants.js";
import {cardsWrap} from "../utils/constants.js";
import {imageModalCloseBtn} from "../utils/constants.js";
import {deleteBtnModal} from "../utils/constants.js";
import {validationOptions} from "../utils/constants.js";
import {profileImageButton} from "../utils/constants.js";
import {profileImageSaveButton} from "../utils/constants.js";
import {profileImage} from "../utils/constants.js";
import {editFormValidator} from "../utils/constants.js";
import {addCardFormValidator} from "../utils/constants.js";
import {userInfo} from "../utils/constants.js";
import {editModal} from "../utils/constants.js";
import {addCardModal} from "../utils/constants.js";
import {imageModal} from "../utils/constants.js";
import {cardDeleteModal} from "../utils/constants.js";
import {profileImageValidator} from "../utils/constants.js";

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
profileImageValidator.enableValidation();
    profileImageButton.addEventListener("click", () => {
      profileImageModal.open();
    });


editModal.setEventListeners();

addCardModal.setEventListeners();

imageModal.setEventListeners();

cardDeleteModal.setEventListeners();

profileImageModal.setEventListeners();


function processLikeClick(card) {
  const isLiked = card.isLiked();
  if (isLiked) {
    api.removeCardLike(card._cardId).then((data) => {
      card.setLikesInfo(data.likes);
    });
  } else {
    api.addCardLike(card._cardId).then((data) => {
      card.setLikesInfo(data.likes);
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
      cardDeleteModal.open();
      // set a submit action
      cardDeleteModal.setSubmitAction(() => {
        api
          .deleteCard(cardId)
          .then((res) => {
            cardDeleteModal.setLoading(true);
            card.handleModalDeleteButton();
            cardDeleteModal.setLoading(false);
            cardDeleteModal.close();
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
  });
  editModal.setLoading(false);
}
function handleAddCardFormSubmit(cardData) {
  addCardModal.setLoading(true);
  api
    .addCard(cardData)
    .then((cardData) => {
      addCardModal.setLoading(false);
      renderCard(cardData);
      addCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleProfileImageForm(inputValues) {
  //evt.preventDefault();
  console.log(inputValues);
  profileImageModal.setLoading(true);
  const profileImage = document.querySelector(".profile__image");
  const profileImageInput = document.querySelector("#profile-image-link");
  profileImage.src = profileImageInput.value;
  profileImageModal.setLoading(false);
  api.updateProfileImage(inputValues).then((res) => {
    console.log(res);
    profileImageModal.close();
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
    userInfo.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar });
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



