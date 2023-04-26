export default class Popup {
  constructor({ popupSelector }) {
    this._modalElement = document.querySelector(popupSelector);
    this.modalCloseButton = this._modalElement.querySelector(
      "#modal-close-button"
    );
  }
  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    const ESC_KEYCODE = 27;
    if (evt.which === ESC_KEYCODE) {
      this.close();
    }
  }
  
  setEventListeners() {
    modalCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
  closeModalOnRemoteClick(evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("modal__close")
    ) {
      this.close(evt.target);
    }
  }
}
