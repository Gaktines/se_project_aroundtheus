import Card from "./Card.js";

export default class Popup {
  constructor({ cardSelector }) {
    this._modalElement = document.querySelector(cardSelector);
  }
  open() {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);
  }
  close() {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);
  }
  _handleEscClose() {
    const ESC_KEYCODE = 27;
    this._handleEscClose = (evt) => {
      if (evt.which === ESC_KEYCODE) {
        const activeModal = document.querySelector(".modal_opened");
        close(activeModal);
      }
    };
  }
  setEventListeners() {
    modalCloseButton.addEventListener("click", () => {
      close(activeModal);
    });
  }
  closeModalOnRemoteClick(evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("modal__close")
    ) {
      closeModal(evt.target);
    }
  }
}
