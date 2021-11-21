const initialCards = [
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

const ClassSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_active'
};

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
const cardTemplate = document.querySelector('.gallery-template').content;

function createCard (cardData) {
  const oneNewCard = cardTemplate.querySelector('.gallery__grid-list-item').cloneNode(true);
  oneNewCard.querySelector('.gallery__grid-item-image').src = cardData.link;
  oneNewCard.querySelector('.gallery__grid-item-image').alt = cardData.name;
  oneNewCard.querySelector('.gallery__grid-item-text').textContent = cardData.name;
  setListeners (oneNewCard);
  return oneNewCard;
};

function renderCard (card) {
  const cardElement = createCard(card);
  galleryList.prepend(cardElement);
};

function setListeners(createdCard) {
createdCard.querySelector('.gallery__grid-item-like').addEventListener('click', toggleLikeStatus);
createdCard.querySelector('.gallery__grid-item-delete').addEventListener('click', deleteCard);
createdCard.querySelector('.gallery__grid-item-image').addEventListener('click', renderViewCardPopup);
};

function toggleLikeStatus (event) {
  event.target.classList.toggle('gallery__grid-item-like_liked');
};

function deleteCard (event) {
  event.target.closest('.gallery__grid-list-item').remove();
};

function renderViewCardPopup(event) {
  popupElementViewCard.querySelector('.popup__place-picture').src = event.target.src;
  popupElementViewCard.querySelector('.popup__place-picture').alt = event.target.alt;
  const displayedCard = event.target.closest('.gallery__grid-list-item');
  const displayedDescription = displayedCard.querySelector('.gallery__grid-item-text');
  popupElementViewCard.querySelector('.popup__place-name').textContent = displayedDescription.textContent;
  openPopup(popupElementViewCard);
};

//render initial cards
const initialCardsReversed = initialCards.reverse();
initialCardsReversed.forEach(function (card) {
renderCard(card);
});

//opens popup + sets listeners for popup close by esc and click
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popupType) {
  document.removeEventListener('keydown', closePopupByEsc);
  popupType.classList.remove('popup_opened');
};

//listeners for popups open
profileEditButton.addEventListener('click', function() {
  openPopup(popupElementProfile);
  nameInput.value = profileNameText.textContent;
  aboutMeInput.value = profileAboutMeText.textContent;
});

cardAddButton.addEventListener('click', function() {
  openPopup(popupElementAddCard);
  placeNameInput.value = '';
  pictureUrlInput.value = '';
  const closeButton = formElementAddcard.querySelector('.popup__form-button');
  closeButton.classList.add(ClassSettingsObject.inactiveButtonClass);
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
  renderCard (newCard);
  closePopup(popupElementAddCard);
};

//listeners for popups submit
formElementProfile.addEventListener('submit', formSubmitProfileHandler);
formElementAddcard.addEventListener('submit', formSubmitNewPlaceHandler);

// activates forms validation
validateForms(ClassSettingsObject);
