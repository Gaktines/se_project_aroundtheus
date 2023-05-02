export default class Section {
  constructor({ items, renderer }, container) {
    this.items = items;
    this.renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this.items.forEach(this.renderer);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
