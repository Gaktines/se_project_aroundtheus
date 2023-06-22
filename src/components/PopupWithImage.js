import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }
  open(cardData) {
    console.log(cardData);
    const imageModalCard = this._modalElement.querySelector("#modal-image");
    const imageModalCaption =
      this._modalElement.querySelector("#modal-caption");

    /*In the open() method of the PopupWithImage class, 
    you need to add an image to the popup and the 
    corresponding image src attribute along with a 
    caption for the image.*/
    imageModalCaption.textContent = cardData.name;
    imageModalCard.src = cardData.link;
    imageModalCard.alt = cardData.name;
    super.open();
  }
}
