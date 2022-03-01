class Card {
  constructor ({item, handleCardClick}, cardTemplate) {
    this._item = item;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
  }

  //takes the template from the DOM
  _getTemplate() {
    const templateElement = document.querySelector(this._cardTemplate).content
    const cardElement = templateElement.querySelector('.gallery__grid-list-item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.gallery__grid-item-like').addEventListener('click', () => {
      this._toggleLikeStatus();
      });
    this._element.querySelector('.gallery__grid-item-delete').addEventListener('click', () => {
      this._deleteCard();
      });
    this._element.querySelector('.gallery__grid-item-image').addEventListener('click', (event) => {
      this._handleCardClick(event);
      });
  }

  _toggleLikeStatus() {
    this._element.querySelector('.gallery__grid-item-like').classList.toggle('gallery__grid-item-like_liked');
  }
  _deleteCard() {
    this._element.remove();
    this._element = '';
  }

//public method returns comlete card filled with data + listeners
  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.gallery__grid-item-image').src = this._item.link;
    this._element.querySelector('.gallery__grid-item-image').alt = this._item.name;
    this._element.querySelector('.gallery__grid-item-text').textContent = this._item.name;
    this._setEventListeners();
  return this._element;
  };
}

export default Card;
