import Popup from "./Popup.js";
import {classSettingsObject} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupElement) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = popupElement.querySelectorAll('.popup__form-input');
    this._submitButton = popupElement.querySelector(classSettingsObject.submitButtonSelector);
  }

  _getInputValues() {
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

  close() {
    super.close();
    this._inputList.forEach((element) => {
      element.value='';
    });
  }

  showLoader() {
    this._currentButtonText = this._submitButton.textContent;
    this._submitButton.textContent = 'Сохранение...';
    this._submitButton.disabled = true;
  }

  hideLoader() {
    this._submitButton.textContent = this._currentButtonText;
    this._submitButton.disabled = false;
  }
}
