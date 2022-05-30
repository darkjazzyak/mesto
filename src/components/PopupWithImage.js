import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._cardPicture = this._popupElement.querySelector('.popup__place-picture');
    this._cardName = this._popupElement.querySelector('.popup__place-name')
  }
  open(cardData) {
    this._cardPicture.src = cardData.link;
    this._cardPicture.alt = cardData.name;
    this._cardName.textContent = cardData.name;
    super.open();
  }
}
