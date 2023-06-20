export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
export const profileTitle = document.querySelector("#profile-title");
export const profileAbout = document.querySelector("#profile-about");
export const profileTitleInput = document.querySelector("#profile-modal-title");
export const profileAboutInput = document.querySelector("#modal-about");
export const profileEditForm = profileEditModal.querySelector(
  "#profile-modal-form"
);
export const cardTemplateInput =
  document.querySelector("#card-template").content.firstElementChild;
export const deleteBtn = document.querySelector(".card__delete_button");
export const addCardEditModal = document.querySelector("#add-card-edit-modal");
export const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
export const addCardButton = document.querySelector("#profile-add-button");
export const addCardTitleInput = document.querySelector(
  "#add-card-modal-title"
);
export const addCardLinkInput = document.querySelector("#add-card-link");

export const addCardForm = addCardEditModal.querySelector(
  "#add-card-modal-form"
);
export const cardsWrap = document.querySelector("#card-list");

export const imageModalCloseBtn = document.querySelector("#modal-close-button");
export const deleteBtnModal = document.querySelector("#modal-delete");
export const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
export const profileImageButton = document.querySelector(
  ".profile__image-button"
);

export const profileImageSaveButton = document.querySelector(
  ".modal__button_save"
);
export const profileImage = document.querySelector("#modal-profile-image");
