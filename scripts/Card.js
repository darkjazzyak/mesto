import {renderViewCardPopup as _renderPopup} from './index.js';

class Card {
  constructor (item, cardTemplate) {
    this._name = item.name;
    this._link = item.link;
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
      _renderPopup(event); //imported from index.js
      });
  }

  _toggleLikeStatus() {
    this._element.querySelector('.gallery__grid-item-like').classList.toggle('gallery__grid-item-like_liked');
  }
  _deleteCard() {
    this._element.remove();
  }

//public method returns comlete card filled with data + listeners
  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.gallery__grid-item-image').src = this._link;
    this._element.querySelector('.gallery__grid-item-image').alt = this._name;
    this._element.querySelector('.gallery__grid-item-text').textContent = this._name;
    this._setEventListeners();
  return this._element;
  };
}

export default Card;
