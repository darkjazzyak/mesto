import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupElement) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__form-input');
    this._inputValuesObject = {};
    this._inputList.forEach((element) => {
      this._inputValuesObject[element.name] = element.value;
    });
    return this._inputValuesObject;

  }

  setEventListeners() {
    super.setEventListeners();
    this._handleSubmit = (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    };
    this._popupElement.addEventListener('submit', this._handleSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupElement.removeEventListener('submit', this._handleSubmit);
  }

  setDefaultValues(elementsObject) {
    this._inputList.forEach((element) => {
      element.value=elementsObject[element.name];
    });
  }

  open() {
    super.open();
    this._getInputValues();
  }

  close() {
    super.close();
    this._inputList.forEach((element) => {
      element.value='';
    });
  }
}
