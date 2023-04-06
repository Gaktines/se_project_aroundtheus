import { openModal, closeModal } from "./utils.js";
const imageModal = document.querySelector("#image-modal");
//const imageButton = document.querySelector("#image-button");
const imageModalCard = imageModal.querySelector("#modal-image");
const imageModalCaption = imageModal.querySelector("#modal-caption");
//const imageModalCloseBtn = document.querySelector("#modal-close-button");

const cardTemplateInput =
  document.querySelector("#card-template").content.firstElementChild;
const cardElement = cardTemplateInput.cloneNode(true);
const addCardEditModal = document.querySelector("#add-card-edit-modal");
//const cardImageElement = cardElement.querySelector("#card-image");

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardElement = cardElement;
    this._modal = document.querySelector(".modal");
  }

  _closeEditModalPopup() {
    closeModal(profileEditModal);
  }
  _closeAddCardModalPopup() {
    closeModal(addCardEditModal);
  }

  _setEventListeners() {
    //".card__button"
    this._likeButton = this._cardElement
      .querySelector(".card__button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //"#card-delete-button"
    this._deleteBtn = this._cardElement
      .querySelector("#card-delete-button")
      .addEventListener("click", () => {
        this._handleDeleteBtn();
      });
    //image
    this._cardElement
      .querySelector("#card-image")
      .addEventListener("click", () => this._handleImageModal());
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button")
      .classList.toggle("card__button_active");
  }
  _handleDeleteBtn() {
    this._cardSelector.remove;
    //document.querySelector("#card-template").remove;
  }
  _handleImageModal() {
    imageModalCaption.textContent = this._name;
    imageModalCard.src = this._link;
    imageModalCard.alt = this._name;
    openModal(imageModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getCard() {
    this._cardElement = this._getTemplate();
    //get the card view

    this._cardElement.querySelector("#card-image").src = this._link;
    this._cardElement.querySelector("#card-title").textContent = this._name;
    this._cardElement.querySelector("#card-image").alt = this._name;
    //set the event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
