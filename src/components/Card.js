export default class Card {
  constructor({ cardData, cardSelector, handleCardClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardTemplateInput =
      document.querySelector("#card-template").content.firstElementChild;
    this._cardElement = this._cardTemplateInput.cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._modalDeleteButton = document.querySelector("#modal-delete-btn");
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
      .addEventListener("click", () =>
        this._handleCardClick({ name: this._name, link: this._link })
      );
    //"#modal-delete-btn"
    this._modalDeleteButton.addEventListener("click", () => {
      handleModalDeleteButton();
    });
  }
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__button_active");
  }
  _handleDeleteBtn() {
    const deleteBtnModal = document.querySelector("#modal-delete");
    deleteBtnModal.classList.add(".modal_opened");
  }
  handleModalDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
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
