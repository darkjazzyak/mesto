import {classSettingsObject} from './constants.js';

class FormValidator {
  constructor(formElement, classSettingsObject) {
    this._formElement = formElement; // form selector from outside
    this._formSelector = classSettingsObject.formSelector; // seems to be deleted
    this._inputSelector =  classSettingsObject.inputSelector;
    this._submitButtonSelector = classSettingsObject.submitButtonSelector;
    this._inactiveButtonClass = classSettingsObject.inactiveButtonClass;
    this._inputErrorClass = classSettingsObject.inputErrorClass;
    this._errorClass = classSettingsObject.errorClass;
  }

  validateForm() {
    this._inputElementList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputElementList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._setEventListener(inputElement);
    });
  }

  //sets 'input' eventListener to given input element
  _setEventListener(inputElement) {
    inputElement.addEventListener('input', () => {
      this._isValidInput(inputElement);
      this._toggleSubmitButton();
    });
  }

  _isValidInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
   };

   //shows input error from validationMessage and sets 'popup__form-input-error_active' to error span
   _showInputError(inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    formError.textContent = inputElement.validationMessage;
    formError.classList.add(this._errorClass);
   }

   _hideInputError(inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
   }

  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    };
  };

  // checks input validity to activete\disable submit button
  _hasInvalidInput() {
    return this._inputElementList.some((inputElement) => {
     return !inputElement.validity.valid;
    });
  }

  }

  export default FormValidator;
