const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
const profileTitle = document.querySelector("#profile-title");
const profileSubheading = document.querySelector("#profile-subheading");
const profileTitleInput = document.querySelector("#profile-modal-title");
const profileSubheadingInput = document.querySelector("#modal-subheading");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const cardTemplateInput =
  document.querySelector("#card-template").content.firstElementChild;
const cardListTemplate = document.querySelector("#card-list");
const addCardEditModal = document.querySelector("#add-card-edit-modal");
const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
const addCardButton = document.querySelector("#profile-add-button");
const addCardTitleInput = document.querySelector("#add-card-modal-title");
const addCardLinkInput = document.querySelector("#add-card-link");
const addCardTitle = document.querySelector(".modal__title_card");
const addCardLink = document.querySelector("#add-card-link");
const addCardTitlePlaceholder = document.querySelector("#Title");
const addCardLinkPlaceholder = document.querySelector("#Image Link");
const addCardForm = addCardEditModal.querySelector("#add-card-modal-form");
const cardsWrap = document.querySelector("#card-list");
const imageModal = document.querySelector("#image-modal");
const imageButton = document.querySelector("#image-button");
const imageModalCard = imageModal.querySelector("#modal-image");
const imageModalCaption = imageModal.querySelector("#modal-caption");
const imageModalCloseBtn = document.querySelector("#modal-close-button");

function closeEditModalPopup() {
  closeModal(profileEditModal);
}
function closeAddCardModalPopup() {
  closeModal(addCardEditModal);
}
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}
function handleProfileEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubheading.textContent = profileSubheadingInput.value;
  closeModal(profileEditModal);
}
function handleAddCardForm(evt) {
  evt.preventDefault();
  const titleValue = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  renderCard(titleValue, cardsWrap);
  closeModal(addCardEditModal);
  addCardForm.reset();
}
function getCardElement(cardData) {
  const cardElement = cardTemplateInput.cloneNode(true);
  const cardTitleElement = cardElement.querySelector("#card-title");
  const cardImageElement = cardElement.querySelector("#card-image");
  const likeButton = cardElement.querySelector(".card__button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_active");
  });
  const deleteBtn = cardElement.querySelector("#card-delete-button");
  deleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    imageModalCaption.textContent = cardData.name;
    imageModalCard.src = cardData.link;
    imageModalCard.alt = imageModalCaption.textContent;
    console.log(imageModalCard.alt);
    openModal(imageModal);
  });

  cardImageElement.src = cardData.link;

  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

profileEditForm.addEventListener("submit", handleProfileEditForm);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubheadingInput.value = profileSubheading.textContent;
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
addCardButton.addEventListener("click", () => openModal(addCardEditModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardEditModal)
);
addCardForm.addEventListener("submit", handleAddCardForm);
profileModalCloseButton.addEventListener("click", closeEditModalPopup);
addCardModalCloseButton.addEventListener("click", closeAddCardModalPopup);
profileEditForm.addEventListener("submit", handleProfileEditForm);
imageModalCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
