export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button")
      .classList.toggle("card__button_active");
  }
  _handleDeleteBtn() {
    this._cardElement.remove;
  }
  getCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .querySelector("#card")
      .cloneNode(true);
    //get the card view
    //set the event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
