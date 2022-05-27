export default class FormValidator {
  constructor(formElement, classSettingsObject) {
    this._formElement = formElement; // form selector from outside
    this._inputSelector =  classSettingsObject.inputSelector;
    this._submitButtonSelector = classSettingsObject.submitButtonSelector;
    this._inactiveButtonClass = classSettingsObject.inactiveButtonClass;
    this._inputErrorClass = classSettingsObject.inputErrorClass;
    this._errorClass = classSettingsObject.errorClass;
    this._inputList = formElement.querySelectorAll(classSettingsObject.inputSelector);
    this._submitButton = formElement.querySelector(classSettingsObject.submitButtonSelector);
  }

  validateForm() {
    this._inputElementList = Array.from(this._inputList);
    //this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputElementList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._setEventListener(inputElement);
    });
  }

  // sets 'input' eventListener to given input element
  _setEventListener(inputElement) {
    inputElement.addEventListener('input', () => {
      this._isValidInput(inputElement);
      this.toggleSubmitButton();
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

  // public method which cleans error messages of particular validator instance
  clearFormErrors() {
    const openFormInputs = Array.from(this._inputList);
    openFormInputs.forEach((element) => this._hideInputError(element));
  }

  // public method which activetes/disables submit button depending on form validity
  toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    };
  };

  // checks input validity to activete\disable submit button
  _hasInvalidInput() {
    return this._inputElementList.some((inputElement) => {
     return !inputElement.validity.valid;
    });
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
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
