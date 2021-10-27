const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-icon');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileElement = document.querySelector('.profile');
const profileNameText = profileElement.querySelector('.profile__name');
const profileAboutMeText = profileElement.querySelector('.profile__about-me');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-input_type_name');
const aboutMeInput = formElement.querySelector('.popup__form-input_type_about-me');

function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileNameText.textContent;
    aboutMeInput.value = profileAboutMeText.textContent;
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileNameText.textContent = nameInput.value;
  profileAboutMeText.textContent = aboutMeInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
