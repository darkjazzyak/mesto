import './pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import {classSettingsObject, initialCards} from './constants.js';
import UserInfo from './UserInfo.js';
import {
  profileElement,
  profileNameText,
  profileAboutMeText,
  popupElementProfile,
  formElementProfile,
  nameInput,
  aboutMeInput,
  popupElementAddCard,
  formElementAddcard,
  placeNameInput,
  pictureUrlInput,
  popupElementViewCard,
  profileEditButton,
  cardAddButton,
  galleryList
} from './constants.js';

// new card generating function
function generateNewCard(cardData) {
  const card = new Card({
    item: cardData,
    handleCardClick: (event) => {
    const imagePopup = new PopupWithImage(popupElementViewCard);
    imagePopup.open(event);
    }
  }, '.gallery-template');
  const newCard = card.generateCard();
  return newCard;
}

function renderCards(cards) {
  const cardList = new Section({
    items: cards,
    renderer: (item) => {
      const oneNewCard = generateNewCard(item);
      cardList.addItem(oneNewCard);
    }
  }, galleryList);
  return cardList;
}

const initialCardList = renderCards(initialCards.reverse());
initialCardList.renderItems();

// renders profile poup, fills input values, handels submit
profileEditButton.addEventListener('click', () => {
  const profilePopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
      profileData.setUserInfo(formData);
      profilePopup.close();
    }
  }, popupElementProfile);
  profilePopup.open();
  const profileData = new UserInfo({
    userNameElement: profileNameText,
    aboutMeElement: profileAboutMeText
  });
  profilePopup.setDefaultValues(profileData.getUserInfo());
  editProfileValidator.clearFormErrors();
  editProfileValidator.toggleSubmitButton();
});

//NEW - render add card form + submit handler
cardAddButton.addEventListener('click', () => {
  const addCardPopup = new PopupWithForm({
    handleFormSubmit: (formData) => {
     const oneNewCard = renderCards(formData);
     oneNewCard.renderItem();
     addCardPopup.close();
    }
  }, popupElementAddCard);
  addCardPopup.open();
  addCardValidator.clearFormErrors();
  addCardValidator.disableSubmitButton();
});

// create 2 FormValidator instances for 2 forms in the document and activate validation
const editProfileValidator = new FormValidator (formElementProfile, classSettingsObject);
editProfileValidator.validateForm();
const addCardValidator = new FormValidator (formElementAddcard, classSettingsObject);
addCardValidator.validateForm();
