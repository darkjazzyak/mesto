import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  open(cardData) {
    this._popupElement.querySelector('.popup__place-picture').src = cardData.link;
    this._popupElement.querySelector('.popup__place-picture').alt = cardData.name;
    this._popupElement.querySelector('.popup__place-name').textContent = cardData.name;
    super.open();
  }
}
