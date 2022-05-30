export const classSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_active'
}

export const apiOptions = {
  userInfoUrl: 'https://nomoreparties.co/v1/cohort-41/users/me',
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-41/cards',
  headers: {
    authorization: 'ee202237-2b86-4fe3-8126-63be3fac6290',
    'Content-Type': 'application/json'
  }
}

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//profile elements
export const profileElement = document.querySelector('.profile');
export const profileNameText = profileElement.querySelector('.profile__name');
export const profileAboutMeText = profileElement.querySelector('.profile__about-me');
export const profileAvatar = profileElement.querySelector('.profile__avatar');
export const profileAvatarButton = profileElement.querySelector('.profile__avatar-wrapper');


//popup elements Edit Profile
export const popupElementProfile = document.querySelector('.popup_type_edit-profile');
export const formElementProfile = popupElementProfile.querySelector('.popup__form_type_edit-profile');
export const nameInput = formElementProfile.querySelector('.popup__form-input_type_name');
export const aboutMeInput = formElementProfile.querySelector('.popup__form-input_type_about-me');

//popup elements New Place
export const popupElementAddCard = document.querySelector('.popup_type_add-card');
export const formElementAddcard = popupElementAddCard.querySelector('.popup__form_type_new-place');
export const placeNameInput = formElementAddcard.querySelector('.popup__form-input_type_place-name');
export const pictureUrlInput = formElementAddcard.querySelector('.popup__form-input_type_pictute-url');

//popup elements view card
export const popupElementViewCard = document.querySelector('.popup_type_view-card');

//popup elements set avatar popup__form
export const popupElementSetAvatar = document.querySelector('.popup_type_set-avatar');
export const formElementSetAvatar = popupElementSetAvatar.querySelector('.popup__form_type_set-avatar');

//popup element delete card
export const popupElementDeleteCard = document.querySelector('.popup_type_delete-card');

//popup open buttons
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');

//popup submit buttons
export const submitButtonElement = document.querySelector('.popup__form-button');

//template elements
export const galleryList = document.querySelector('.gallery__grid-list');

