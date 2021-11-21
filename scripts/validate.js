
//check given field of given form for validity
 const isValid = (formElement, inputElement, settingsObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(formElement, inputElement, settingsObject);
  };
 };

//add error style to given input of given element with error
const showInputError = (formElement, inputElement, errorMessage, settingsObject) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObject.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settingsObject.errorClass);
};

//hide error style from given input of given element with error
const hideInputError = (formElement, inputElement, settingsObject) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObject.inputErrorClass);
  formError.classList.remove(settingsObject.errorClass);
  formError.textContent = '';
};

//set event listeners to all input fields of one given form
const setEventListeners = (formElement, settingsObject) => {
  const inputElementsList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  const button = formElement.querySelector(settingsObject.submitButtonSelector);
  toggleButtonActivity (inputElementsList, button, settingsObject);
  inputElementsList.forEach(function(inputElement) {
    hideInputError(formElement, inputElement, settingsObject);
    inputElement.addEventListener('input', function() {
      isValid(formElement, inputElement, settingsObject);
      toggleButtonActivity (inputElementsList, button, settingsObject);
    });
  });
 };

//searches all forms in document and applies setEventListeners to all of them
 const validateForms = (settingsObject) => {
  const formElementsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formElementsList.forEach(function(formElement) {
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    });
    setEventListeners(formElement, settingsObject);
  });
 };

 const hasInvalidInput = (inputElementsList) => {
   return inputElementsList.some(function(inputElement) {
    return !inputElement.validity.valid;
   });
 };

 const toggleButtonActivity = (inputElementsList, buttonElement, settingsObject) => {
  if (hasInvalidInput(inputElementsList)) {
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
  };
 };
