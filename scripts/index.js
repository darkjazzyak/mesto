import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {classSettingsObject, initialCards} from './constants.js';

//profile elements
const profileElement = document.querySelector('.profile');
const profileNameText = profileElement.querySelector('.profile__name');
const profileAboutMeText = profileElement.querySelector('.profile__about-me');

//popup elements Edit Profile
const popupElementProfile = document.querySelector('.popup_type_edit-profile');
const formElementProfile = popupElementProfile.querySelector('.popup__form_type_edit-profile');
const nameInput = formElementProfile.querySelector('.popup__form-input_type_name');
const aboutMeInput = formElementProfile.querySelector('.popup__form-input_type_about-me');

//popup elements New Place
const popupElementAddCard = document.querySelector('.popup_type_add-card');
const formElementAddcard = popupElementAddCard.querySelector('.popup__form_type_new-place');
const placeNameInput = formElementAddcard.querySelector('.popup__form-input_type_place-name');
const pictureUrlInput = formElementAddcard.querySelector('.popup__form-input_type_pictute-url');

//popup elements view card
const popupElementViewCard = document.querySelector('.popup_type_view-card');

//popup open buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

//template elements
const galleryList = document.querySelector('.gallery__grid-list');

// new card generating function
function generateNewCard(cardData) {
  const card = new Card(cardData, '.gallery-template');
  const newCard = card.generateCard();
  return newCard;
}

//rendering of initial cards
initialCards.forEach((element) => {
  const oneNewCard = generateNewCard(element);
  galleryList.append(oneNewCard);
});

// renders popup with picture preview (also used in FormValidator)
export function renderViewCardPopup(event) {
  popupElementViewCard.querySelector('.popup__place-picture').src = event.target.src;
  popupElementViewCard.querySelector('.popup__place-picture').alt = event.target.alt;
  const displayedCard = event.target.closest('.gallery__grid-list-item');
  const displayedDescription = displayedCard.querySelector('.gallery__grid-item-text');
  popupElementViewCard.querySelector('.popup__place-name').textContent = displayedDescription.textContent;
  openPopup(popupElementViewCard);
};

//opens popup + sets listeners for popup close by esc and click
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

//closes popup and clears input error messages
function closePopup(popupType) {
  document.removeEventListener('keydown', closePopupByEsc);
  popupType.classList.remove('popup_opened');
  clearFormErrors(popupType);
};

//clears input error messages if popup was closed with active error message
function clearFormErrors(popupType) {
  if (popupType === popupElementProfile || popupType === popupElementAddCard) {
    const openFormInputs = Array.from(popupType.querySelectorAll(classSettingsObject.inputSelector));
    openFormInputs.forEach((element) => element.classList.remove(classSettingsObject.inputErrorClass));
    const openFormErrors = Array.from(popupType.querySelectorAll(classSettingsObject.errorSpanSelector));
    openFormErrors.forEach((element) => element.classList.remove(classSettingsObject.errorClass));
  }
}

//listener for 'edit profile' button
profileEditButton.addEventListener('click', function() {
  openPopup(popupElementProfile);
  nameInput.value = profileNameText.textContent;
  aboutMeInput.value = profileAboutMeText.textContent;
});

//listener for 'add new card' button
cardAddButton.addEventListener('click', function() {
  openPopup(popupElementAddCard);
  placeNameInput.value = '';
  pictureUrlInput.value = '';
  const closeButton = formElementAddcard.querySelector('.popup__form-button');
  closeButton.classList.add(classSettingsObject.inactiveButtonClass);
  closeButton.disabled = true;
});

//callback for popup close by esc
function closePopupByEsc (event) {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

//set listener for popups close by click on overlay
const popups = document.querySelectorAll('.popup');
popups.forEach(function (popupElement) {
  popupElement.addEventListener('click', (event) =>{
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-icon')) {
      closePopup(popupElement);
    }
  });
});

// form submit Profile
function formSubmitProfileHandler (evt) {
  evt.preventDefault();
  profileNameText.textContent = nameInput.value;
  profileAboutMeText.textContent = aboutMeInput.value;
  closePopup(popupElementProfile);
};

// form submit New Place
function formSubmitNewPlaceHandler (evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeNameInput.value;
  newCard.link = pictureUrlInput.value;
  const newGeneratedCard = generateNewCard(newCard)
  galleryList.prepend(newGeneratedCard);
  closePopup(popupElementAddCard);
};

//listeners for popups submit
formElementProfile.addEventListener('submit', formSubmitProfileHandler);
formElementAddcard.addEventListener('submit', formSubmitNewPlaceHandler);

//check all forms in document for validity by creating FormValidator instances
const formElementsList = Array.from(document.querySelectorAll(classSettingsObject.formSelector));
formElementsList.forEach((formElement) => {
  const checkedForm = new FormValidator (formElement, classSettingsObject);
  checkedForm.validateForm();
});
