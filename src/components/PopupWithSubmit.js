import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  setSubmitAction(submitAction) {
    this._handleSubmit = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleSubmitAction = (event) => {
      event.preventDefault();
      this._handleSubmit();
    };
    this._popupElement.addEventListener('submit', this._handleSubmitAction);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupElement.removeEventListener('submit', this._handleSubmitAction);
  }

}
