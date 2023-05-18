export default class Card {
  constructor({ cardData, cardSelector, handleCardClick }) {
    console.log(cardData);
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardTemplateInput =
      document.querySelector("#card-template").content.firstElementChild;
    this._cardElement = this._cardTemplateInput.cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._modalDeleteButton = document.querySelector("#modal-delete-btn");
    this.likes = [];
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
  setLikesInfo() {
    this._likeButton.addEventListener("click", () => {
      this.likes = this.likes + 1;
      return this.likes;
    });
  }
  _updateLikesView() {
    this._cardElement.querySelector(".card__number").textContent = this.likes.length;
    
    //  that edits the .textContent of the span with the number
    //in it to match how many this._likes there are,
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__button_active");
    
  };
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
    this._cardElement.querySelector("#card-name").textContent = this._name;
    this._cardElement.querySelector("#card-image").alt = this._name;
    //set the event listeners
    this._setEventListeners();
    this._updateLikesView();
    this.setLikesInfo();
    //return the card
    return this._cardElement;
    
  }
  
}
//_updateLikesView is called in getView (which returns the card
//HTML initially), and in setLikesInfo which updates the
//this._likes array based on the arguments passed into it
