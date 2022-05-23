import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import {classSettingsObject, initialCards} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  profileElement,
  profileNameText,
  profileAboutMeText,
  popupElementProfile,
  formElementProfile,
  nameInput,
  aboutMeInput,
  popupElementDeleteCard,
  popupElementAddCard,
  formElementAddcard,
  placeNameInput,
  pictureUrlInput,
  popupElementViewCard,
  profileEditButton,
  cardAddButton,
  galleryList,
  apiOptions,
} from '../utils/constants.js';

//instance for Api
const api = new Api(apiOptions);


const imagePopup = new PopupWithImage(popupElementViewCard);

const confirmationPopup = new PopupWithSubmit({
  handleSubmit: () => {
    console.log('CARD DELETED');
  }
},
popupElementDeleteCard);

// new card generating function
function generateNewCard(cardData) {
  const card = new Card({
    item: cardData,
    handleCardClick: () => {
      imagePopup.open(cardData);
    },
    handleDeleteClick: () => {
      confirmationPopup.open();
    }
  }, '.gallery-template');
  const newCard = card.generateCard();
  return newCard;
}

//Cards from server
api.getCards()
  .then((data) => {
    console.log('cards data =>', data);
    const cardList = new Section({
      items: data.reverse(),
      renderer: (item) => {
        const oneNewCard = generateNewCard(item);
        cardList.addItem(oneNewCard);
      }
    }, galleryList);
    cardList.renderItems();

    //creates new Card from Form data and renders it by Section instance method
    const addCardPopup = new PopupWithForm({
      handleFormSubmit: (formData) => {
        cardList.renderItem(formData);
        addCardPopup.close();
        api.postCard(formData);
      }
    }, popupElementAddCard);

    cardAddButton.addEventListener('click', () => {
      addCardPopup.open();
      addCardValidator.clearFormErrors();
      addCardValidator.disableSubmitButton();
    });

  });

// UsernInfo from server
api.getUserData()
  .then ((data) => {
    console.log('user data =>', data);
    profileData.setUserInfo(data);
  });

// instance for UserInfo
const profileData = new UserInfo({
  userNameElement: profileNameText,
  aboutMeElement: profileAboutMeText
});


// Instance for Profile Popup
const profilePopup = new PopupWithForm({
  handleFormSubmit: (formData) => {
    profileData.setUserInfo(formData);
    profilePopup.close();
    api.editUserData(formData);
  }
}, popupElementProfile);

// renders profile poup, fills input values, handels submit
profileEditButton.addEventListener('click', () => {
  profilePopup.open();
  profilePopup.setDefaultValues(profileData.getUserInfo());
  editProfileValidator.clearFormErrors();
  editProfileValidator.toggleSubmitButton();
});



// creates 2 FormValidator instances for 2 forms in the document and activate validation
const editProfileValidator = new FormValidator (formElementProfile, classSettingsObject);
editProfileValidator.validateForm();
const addCardValidator = new FormValidator (formElementAddcard, classSettingsObject);
addCardValidator.validateForm();
