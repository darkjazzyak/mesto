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
const PlaceNameInput = formElementAddcard.querySelector('.popup__form-input_type_place-name');
const PictureUrlInput = formElementAddcard.querySelector('.popup__form-input_type_pictute-url');

//popup elements view card
const popupElementViewCard = document.querySelector('.popup_type_view-card');

//popup open buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

//popup close buttons
const popupProfileCloseButton = popupElementProfile.querySelector('.popup__close-icon');
const popupAddCardCloseButton = popupElementAddCard.querySelector('.popup__close-icon');
const popupViewCardCloseButton = popupElementViewCard.querySelector('.popup__close-icon');

//template elements
const galleryList = document.querySelector('.gallery__grid-list');
const cardTemplate = document.querySelector('.gallery-template').content;

function renderCard (card) {
  const cardElement = cardTemplate.querySelector('.gallery__grid-list-item').cloneNode(true);
  cardElement.querySelector('.gallery__grid-item-image').src = card.link;
  cardElement.querySelector('.gallery__grid-item-text').textContent = card.name;
  galleryList.prepend(cardElement);
  setListeners (cardElement);
};

function setListeners(addedCard) {
addedCard.querySelector('.gallery__grid-item-like').addEventListener('click', toggleLikeStatus);
addedCard.querySelector('.gallery__grid-item-delete').addEventListener('click', deleteCard);
addedCard.querySelector('.gallery__grid-item-image').addEventListener('click', renderViewCardPopup);
};

function toggleLikeStatus (event) {
  event.target.classList.toggle('gallery__grid-item-like_liked');
};

function deleteCard (event) {
  event.target.closest('.gallery__grid-list-item').remove();
};

function renderViewCardPopup(event) {
  popupElementViewCard.querySelector('.popup__place-picture').src = event.target.src;
  const displayedCard = event.target.closest('.gallery__grid-list-item');
  const displayedDescription = displayedCard.querySelector('.gallery__grid-item-text');
  popupElementViewCard.querySelector('.popup__place-name').textContent = displayedDescription.textContent;
  popupElementViewCard.classList.add('popup_opened');
};

//render initial cards
for (let i=1; i <= initialCards.length; i++) {
 let k = initialCards.length - i;
 renderCard(initialCards[k]);
};

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
};

function closePopup(popupType) {
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
  PlaceNameInput.value = '';
  PictureUrlInput.value = '';
});

//listeners for popups close
popupProfileCloseButton.addEventListener('click', function() {
  closePopup(popupElementProfile);
});
popupAddCardCloseButton.addEventListener('click', function() {
  closePopup(popupElementAddCard);
});
popupViewCardCloseButton.addEventListener('click', function() {
  closePopup(popupElementViewCard);
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
  newCard.name = PlaceNameInput.value;
  newCard.link = PictureUrlInput.value;
  renderCard (newCard);
  closePopup(popupElementAddCard);
};

//listeners for popups submit
formElementProfile.addEventListener('submit', formSubmitProfileHandler);
formElementAddcard.addEventListener('submit', formSubmitNewPlaceHandler);
