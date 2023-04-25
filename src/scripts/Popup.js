export default class Popup {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }
  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
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
