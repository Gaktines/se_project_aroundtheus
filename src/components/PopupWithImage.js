import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }
  open(cardData) {
    this.imageModalCard = this._modalElement.querySelector("#modal-image");
    this.imageModalCaption = this._modalElement.querySelector("#modal-caption");

    /*In the open() method of the PopupWithImage class, 
    you need to add an image to the popup and the 
    corresponding image src attribute along with a 
    caption for the image.*/
    this.imageModalCaption.textContent = cardData.name;
    this.imageModalCard.src = cardData.link;
    this.imageModalCard.alt = cardData.name;
    super.open();
  }
 
}
