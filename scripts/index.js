const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_edit');
const cardPopup = document.querySelector('.popup_add');
const previewPopup = document.querySelector('.popup_preview');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const profileCloseButton = profilePopup.querySelector('.popup__edit-close-icon');
const cardCloseButton = cardPopup.querySelector('.popup__add-close-icon');
const photoCloseButton = previewPopup.querySelector('.popup__photo-close-icon');

const formEdit = document.querySelector('.popup__container-edit');
const formAdd = document.querySelector('.popup__container-add');
const inputNameEdit = formEdit.querySelector('.popup__input_edit_name');
const inputJobEdit = formEdit.querySelector('.popup__input_edit_occupation');
const inputLocationAdd = formAdd.querySelector('.popup__input_add_name');
const inputLinkAdd = formAdd.querySelector('.popup__input_add_link');

const nameText = document.querySelector('.profile__info-name');
const jobText = document.querySelector('.profile__info-occupation');

const elementTemplate = document.querySelector('.li-element').content;
const elementsContainer = document.querySelector('.elements__list');

const previewImage = previewPopup.querySelector('.popup__image');
const previewName = previewPopup.querySelector('.popup__name');


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
  
  const inputListProfilePopup = Array.from(profilePopup.querySelectorAll(initialConfig.inputSelector));
  const buttonInFormProfilePopup = profilePopup.querySelector(initialConfig.submitButtonSelector);
  
  const inputListCardPopup = Array.from(cardPopup.querySelectorAll(initialConfig.inputSelector));
  const buttonInFormCardPopup = cardPopup.querySelector(initialConfig.submitButtonSelector);


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
  toggleButtonState(inputListProfilePopup, buttonInFormProfilePopup, initialConfig);
  openPopup(profilePopup);
};

function openAddForm() {
  toggleButtonState(inputListCardPopup, buttonInFormCardPopup, initialConfig);
  openPopup(cardPopup);
};

function editSubmitHandler(evt) {
    evt.preventDefault(); 
    nameText.textContent = inputNameEdit.value;
    jobText.textContent = inputJobEdit.value;
    closePopup(profilePopup);
};

function addSubmitHandler(evt) {
    evt.preventDefault(); 
    const card = createCard(inputLocationAdd.value, inputLinkAdd.value);
    elementsContainer.prepend(card); 
    evt.currentTarget.reset();
    closePopup(cardPopup);
};

function loadCards () {
  initialCards.forEach(function (cardInfo) {
        const card = createCard(cardInfo.name, cardInfo.link);
        elementsContainer.append(card); 
    });
};

function createCard (name, link) {
    const listItem = elementTemplate.querySelector('.elements__list-item').cloneNode(true);
    const photo = listItem.querySelector('.elements__pic');
    photo.src = link;
    photo.alt = name;
    photo.addEventListener('click', function(evt){
      previewImage.src = link;
      previewImage.alt = name;
      previewName.textContent = name;
      openPopup(previewPopup);
    });
    listItem.querySelector('.elements__name').textContent = name;

    const likeButton = listItem.querySelector('.elements__button-like');
    likeButton.addEventListener('click', function(evt){
      evt.target.classList.toggle('elements__button-like_active');
    });

    const trashButton = listItem.querySelector('.elements__button-trash');
    trashButton.addEventListener('click', function(evt){
      evt.target.closest('.elements__list-item').remove();
    });

    return listItem;
};

function closePopupOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
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

enableValidation(initialConfig);