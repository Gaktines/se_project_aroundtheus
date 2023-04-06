export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", processEscDown);
}
export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", processEscDown);
}
const ESC_KEYCODE = 27;
const processEscDown = (evt) => {
  if (evt.which === ESC_KEYCODE) {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
};
