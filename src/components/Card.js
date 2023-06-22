import Popup from "./Popup.js";
import Api from "./API.js";

export default class Card {
  constructor({
    cardData,
    cardSelector,
    _handleCardClick,
    handleDeleteClick,
    processLikeClick,
    userId,
  }) {
    this._cardId = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardTemplateInput =
      document.querySelector("#card-template").content.firstElementChild;

    this._handleCardClick = _handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    //this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._currentUserId = cardData.owner._id;
    this._processLikeClick = processLikeClick;

    this._modalDeleteButton = document.querySelector("#modal-delete-btn");
    this._likes = cardData.likes;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector("#card-image");
    this._cardName = this._cardElement.querySelector("#card-name");
  }

  _setEventListeners() {
    //".card__button"
    this._likeButton = this._cardElement.querySelector(".card__button");
    this._likeButton.addEventListener("click", () => {
      this.processLikeClick(this);
    });
    //"#card-delete-button"

    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId);
    });
    //image
    this._cardImage
      .addEventListener("click", () =>
        this._handleCardClick({ name: this._name, link: this._link })
      );
    //"#modal-delete-btn"
  }
  processLikeClick(card) {
    const isLiked = this.isLiked();
    const api = new Api({
      baseUrl: "https://around.nomoreparties.co/v1/group-12",
      headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
        "Content-Type": "application/json",
      },
    });
    if (isLiked) {
      api.removeCardLike(this._cardId).then((data) => {
        this.setLikesInfo(data.likes);
      });
    } else {
      api.addCardLike(this._cardId).then((data) => {
        this.setLikesInfo(data.likes);
      });
    }
  }
  setLikesInfo(likes) {
    this._likes = likes;
    this._updateLikesView();
  }
  _updateLikesView() {
    this._cardElement.querySelector(".card__number").textContent =
      this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__button_active");
    } else {
      this._likeButton.classList.remove("card__button_active");
    }
    //  that edits the .textContent of the span with the number
    //in it to match how many this._likes there are,
  }

  isLiked() {
    return this._likes.some(() => {
      return this._currenUserId === this._likes._id;
    });
  }
  handleModalDeleteButton() {
    this._cardElement.remove();
  }
  handleDeleteButton() {
    if (this._currentUserId !== this._userId) {
      this._deleteBtn.remove();
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getCard() {
    
    //get the card view
    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._deleteBtn = this._cardElement.querySelector("#card-delete-button");
    this.handleDeleteButton();
    //set the event listeners
    this._setEventListeners();
    this._updateLikesView();

    //return the card
    return this._cardElement;
  }
}
//_updateLikesView is called in getView (which returns the card
//HTML initially), and in setLikesInfo which updates the
//this._likes array based on the arguments passed into it
