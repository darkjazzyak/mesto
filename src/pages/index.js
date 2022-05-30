import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  classSettingsObject,
  profileElement,
  profileNameText,
  profileAboutMeText,
  popupElementProfile,
  popupElementSetAvatar,
  formElementSetAvatar,
  profileAvatar,
  profileAvatarButton,
  formElementProfile,
  nameInput,
  aboutMeInput,
  popupElementDeleteCard,
  popupElementAddCard,
  submitButtonElement,
  formElementAddcard,
  popupElementViewCard,
  profileEditButton,
  cardAddButton,
  galleryList,
  apiOptions,
} from '../utils/constants.js';

//instance for Api
const api = new Api(apiOptions);

//instance for Popup with card picture zoom
const imagePopup = new PopupWithImage(popupElementViewCard);

//instance for confirmation of Card deletion
const confirmationPopup = new PopupWithSubmit(popupElementDeleteCard);

// new card generating function
function generateNewCard(cardData, userData) {
  const card = new Card({
    item: cardData,
    user: userData,
    handleCardClick: () => {
      imagePopup.open(cardData);
    },
    handleDeleteClick: (id) => {
      confirmationPopup.open();
      confirmationPopup.setSubmitAction(() => {
        api.deleteCard(id)
          .then((res) => {
            console.log(res);
            card.deleteCard();
            confirmationPopup.close();
          })
          .catch ((error) => console.log(`Ошибка: ${error}`));
      });
    },
    handleLikeClick: (id) => {
      if (card.isLiked()) {
        api.removeLike(id)
          .then((res) => {
            card.setLikesQty(res);
          })
          .catch ((error) => console.log(`Ошибка: ${error}`));
      } else {
        api.setLike(id)
          .then((res) => {
            card.setLikesQty(res);
          })
          .catch ((error) => console.log(`Ошибка: ${error}`));
      }
    }

  }, '.gallery-template');
  const newCard = card.generateCard();
  return newCard;
}

//Initial data from API
api.getInitialData()
  .then((data) => {
    const [cardData, userData] = data;
    //initial Cards rendering
    const cardList = new Section({
      items: cardData.reverse(),
      renderer: (item) => {
        const oneNewCard = generateNewCard(item, userData);
        cardList.addItem(oneNewCard);
      }
    }, galleryList);
    cardList.renderItems();

    //sets User info from server to Prifile section
    profileData.setUserInfo(userData);

    //creates new Card from Form data sends it to server and renders it by Section instance method
    const addCardPopup = new PopupWithForm({
      handleFormSubmit: (formData) => {
        addCardPopup.showLoader();
        api.postCard(formData)
          .then((generatedCard) => {
            cardList.renderItem(generatedCard);
            addCardPopup.close();
          })
          .catch ((error) => console.log(`Ошибка: ${error}`))
          .finally (() => addCardPopup.hideLoader());
      }
    }, popupElementAddCard);

    //listener for user profile popup
    cardAddButton.addEventListener('click', () => {
      addCardPopup.open();
      addCardValidator.clearFormErrors();
      addCardValidator.disableSubmitButton();
    });

  })
  .catch ((error) => console.log(`Ошибка: ${error}`));

// instance for UserInfo
const profileData = new UserInfo({
  userNameElement: profileNameText,
  aboutMeElement: profileAboutMeText,
  avatarElement: profileAvatar
});

//listener for change avatar popup open button
profileAvatarButton.addEventListener('click', () => {
  profileAvatarPopup.open();
  setAvatarValidator.clearFormErrors();
  setAvatarValidator.disableSubmitButton();
});

//instance for set avatar Popup
const profileAvatarPopup = new PopupWithForm({
  handleFormSubmit: (formData) => {
    profileAvatarPopup.showLoader();
    api.setAvatar(formData)
      .then((userInfo) => {
        profileData.setUserInfo(userInfo);
        profileAvatarPopup.close();
      })
      .catch ((error) => console.log(`Ошибка: ${error}`))
      .finally (() => profileAvatarPopup.hideLoader());
  }
}, popupElementSetAvatar);

// Instance for Profile Popup
const profilePopup = new PopupWithForm({
  handleFormSubmit: (formData) => {
    profilePopup.showLoader();
    api.editUserData(formData)
      .then((userInfo) => {
        profileData.setUserInfo(userInfo);
        profilePopup.close();
      })
      .catch ((error) => console.log(`Ошибка: ${error}`))
      .finally (() => profilePopup.hideLoader());
  }
}, popupElementProfile);

// renders profile popup, fills input values, handels submit
profileEditButton.addEventListener('click', () => {
  profilePopup.open();
  profilePopup.setDefaultValues(profileData.getUserInfo());
  editProfileValidator.clearFormErrors();
  editProfileValidator.toggleSubmitButton();
});

// creates 3 FormValidator instances for 3 forms in the document and activate validation
const editProfileValidator = new FormValidator (formElementProfile, classSettingsObject);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator (formElementAddcard, classSettingsObject);
addCardValidator.enableValidation();
const setAvatarValidator = new FormValidator (formElementSetAvatar, classSettingsObject);
setAvatarValidator.enableValidation();
