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
const modalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubheading = document.querySelector("#profile-subheading");
const profileTitleInput = document.querySelector("#modal-title");
const profileSubheadingInput = document.querySelector("#modal-subheading");
const profileEditForm = profileEditModal.querySelector("#modal-form");
const cardTemplateInput =
  document.querySelector("#card-template").content.firstElementChild;
const cardListTemplate = document.querySelector("#card-list");

function closePopup() {
  profileEditModal.classList.remove("modal__opened");
}

function handleProfileEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubheading.textContent = profileSubheadingInput.value;
  closePopup();
}

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplateInput.cloneNode(true);

  // access the card title and image and store them in variables
  const cardTitleElement = cardElement.querySelector("#card-title");
  const cardImageElement = cardElement.querySelector("#card-image");
  // set the path to the image to the link field of the object
  cardImageElement.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageElement.alt = cardData.name;

  // set the card title to the name field of the object, too
  cardTitleElement.textContent = cardData.name;

  // return the ready HTML element with the filled-in data
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubheadingInput.value = profileSubheading.textContent;
  profileEditModal.classList.add("modal__opened");
});

modalCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditForm);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListTemplate.append(cardElement);
});
