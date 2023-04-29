export default class Section {
  constructor({ items, renderer }) {
    this.items = items;
    this.renderer = renderer;
  
  }
  
  renderItems() {
    this.items.forEach(this.renderer);
  }
  renderer(cardData) {
    const card = new Card({
      cardData,
      cardSelector: "#card-template",
      handleCardClick: ({ name, link }) => {
        //here is where we want to open our popupWithImage instance.
        imageModal.open({ name, link });
      },
    });
    cardsWrap.prepend(card.getCard());
  }
  addItem(item) {
    this.renderer(item);
  }
}
