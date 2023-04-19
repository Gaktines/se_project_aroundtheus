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
  constructor({ cardData, cardSelector }, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardElement = cardElement;
    this._modal = document.querySelector(".modal");
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    //".card__button"
    this._likeButton = this._cardElement.querySelector(".card__button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    //"#card-delete-button"
    this._deleteBtn = this._cardElement.querySelector("#card-delete-button");
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteBtn();
    });
    //image
    this._cardElement
      .querySelector("#card-image")
      .addEventListener("click", () => this._handleImageModal());
  }
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__button_active");
  }
  _handleDeleteBtn() {
    this._cardElement.remove();
  }
  _handleImageModal() {
    imageModalCaption.textContent = this._name;
    imageModalCard.src = this._link;
    imageModalCard.alt = this._name;
    open(imageModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  /*getCard() {
    
  }*/
}