export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }
  open() {
    this._popupElement.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleEscClose = (event) => {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose = (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-icon')) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('click', this._handleClickClose);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('click', this._handleClickClose);
  }

}
