const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-icon');
const profileEditButton = document.querySelector('.profile__edit-button');


function openPopup() {
    popupElement.classList.add('popup_opened');
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__form-input_type_name');
const aboutMeInput = formElement.querySelector('.popup__form-input_type_about-me');

function formSubmitHandler (evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__about-me').textContent = aboutMeInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
