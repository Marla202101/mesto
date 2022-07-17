import './pages/index.css';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_edit');
const cardPopup = document.querySelector('.popup_add');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const formEdit = document.querySelector('.popup__container-edit');
const formAdd = document.querySelector('.popup__container-add');
const inputNameEdit = formEdit.querySelector('.popup__input_edit_name');
const inputJobEdit = formEdit.querySelector('.popup__input_edit_occupation');

const inputLocationAdd = formAdd.querySelector('.popup__input_add_name');
const inputLinkAdd = formAdd.querySelector('.popup__input_add_link');

const nameText = document.querySelector('.profile__info-name');
const jobText = document.querySelector('.profile__info-occupation');

const elementsContainer = document.querySelector('.elements__list');

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

  const initialConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active'
  }; 

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscPress); 
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscPress); 
};

function openEditForm() {
  inputNameEdit.value = nameText.textContent;
  inputJobEdit.value = jobText.textContent;
  profileEditValidator.resetValidation();
  openPopup(profilePopup);
};

function openAddForm() {
  formAdd.reset();
  cardAddValidator.resetValidation();
  openPopup(cardPopup);
};

function editSubmitHandler(evt) {
    evt.preventDefault(); 
    nameText.textContent = inputNameEdit.value;
    jobText.textContent = inputJobEdit.value;
    closePopup(profilePopup);
};

function createCard(name, link) {
  const card = new Card(name, link, '.li-element', openPopup);
  return card.generateCard();
}

function addSubmitHandler(evt) {
    evt.preventDefault(); 
    const card = createCard(inputLocationAdd.value, inputLinkAdd.value);
    elementsContainer.prepend(card); 
    closePopup(cardPopup);
};

function loadCards () {
  initialCards.forEach(function (cardInfo) {
        const card = createCard(cardInfo.name, cardInfo.link);
        elementsContainer.append(card); 
    });
};

function closePopupEscPress(evt){
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-icon')) {
          closePopup(popup)
        }
    });
});

formEdit.addEventListener('submit', editSubmitHandler); 
formAdd.addEventListener('submit', addSubmitHandler); 
cardAddButton.addEventListener('click', openAddForm);
profileEditButton.addEventListener('click', openEditForm);

loadCards ();

const profileEditValidator = new FormValidator(initialConfig, formEdit);
const cardAddValidator = new FormValidator(initialConfig, formAdd);

profileEditValidator.enableValidation();
cardAddValidator.enableValidation();

