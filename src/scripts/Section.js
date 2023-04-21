export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this.items = items;
    this.renderer = renderer;
    this.cardSelector = cardSelector;
    this.container = document.querySelector(".cards__list");
  }
  renderItems() {
    this.items.forEach((cardData) => renderCard(cardData));
  }
  renderer() {
    const card = new Card(cardData, "#card-template");
  }
  addItem() {
    this.container.prepend(card.getCard());
  }
}
