import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  open(event) {
    console.log(event.target);
    this._popupElement.querySelector('.popup__place-picture').src = event.target.src;
    this._popupElement.querySelector('.popup__place-picture').alt = event.target.alt;
    const displayedCard = event.target.closest('.gallery__grid-list-item');
    const displayedDescription = displayedCard.querySelector('.gallery__grid-item-text');
    this._popupElement.querySelector('.popup__place-name').textContent = displayedDescription.textContent;
    super.open();
  }
}
