const imageModal = document.querySelector("#image-modal");
//const imageButton = document.querySelector("#image-button");
const imageModalCard = imageModal.querySelector("#modal-image");
const imageModalCaption = imageModal.querySelector("#modal-caption");
//const imageModalCloseBtn = document.querySelector("#modal-close-button");
const ESC_KEYCODE = 27;
const cardTemplateInput =
  document.querySelector("#card-template").content.firstElementChild;
const cardElement = cardTemplateInput.cloneNode(true);
function closeEditModalPopup() {
  closeModal(profileEditModal);
}
function closeAddCardModalPopup() {
  closeModal(addCardEditModal);
}
export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardElement = cardElement;
  }
  _setEventListeners() {
    //".card__button"
    const likeButton = this._cardElement
      .querySelector(".card__button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //"#card-delete-button"
    const deleteBtn = this._cardElement
      .querySelector("#card-delete-button")
      .addEventListener("click", () => {
        this._handleDeleteBtn();
      });
    //image
    cardImageElement.addEventListener("click", () => this._handleImageModal());
    openModal(imageModal);
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button")
      .classList.toggle("card__button_active");
  }
  _handleDeleteBtn() {
    this._cardElement.remove;
  }
  _handleImageModal() {
    imageModalCaption.textContent = cardData.name;
    imageModalCard.src = cardData.link;
    imageModalCard.alt = imageModalCaption.textContent;
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
    console.log(this._cardElement);
    this._cardElement.querySelector(
      "#add-card-link"
    ).style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector("#add-card-modal-title").textContent =
      this._name;
    //set the event listeners
    this._setEventListeners();
    //return the card
  }
}
