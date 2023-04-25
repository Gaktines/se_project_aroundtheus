export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this.items = items;
    this.renderer = renderer;
    this.cardSelector = cardSelector;
    this.container = document.querySelector(cardSelector);
  }
  renderItems() {
    this.items.forEach((cardData) => this.renderer(cardData));
  }
  addItem(card) {
    this.container.prepend(card.getCard());
  }
}
