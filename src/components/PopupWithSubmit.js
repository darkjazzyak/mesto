import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({handleSubmit}, popupElement) {
    super(popupElement);
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleSubmitAction = (event) => {
      event.preventDefault();
      this._handleSubmit();
    };
    this._popupElement.addEventListener('submit', this._handleSubmitAction);
  }

}
