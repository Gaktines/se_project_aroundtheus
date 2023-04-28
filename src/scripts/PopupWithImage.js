import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }
  open(cardData) {
    this.name = cardData.name;
    this.link = cardData.link;
    /*In the open() method of the PopupWithImage class, 
    you need to add an image to the popup and the 
    corresponding image src attribute along with a 
    caption for the image.*/
    /*imageModalCaption.textContent = this.name;
    imageModalCard.src = this.link;
    imageModalCard.alt = this.name;*/
    super.open();
  }
}
