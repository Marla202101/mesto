const popup = document.querySelector('.popup');
const openEditButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-icon');

const formElement = document.querySelector('.popup__container');
const inputFirst = formElement.querySelector('.popup__input_type_name');
const inputSecond = formElement.querySelector('.popup__input_type_occupation');

const nameText = document.querySelector('.profile__info-name');
const jobText = document.querySelector('.profile__info-occupation');

const elementTemplate = document.querySelector('.li-element').content;
const elementsList = document.querySelector('.elements__list');

const openAddButton = document.querySelector('.profile__add-button');
const formAddTitle = document.querySelector('.popup__title');

const popupPhoto = document.querySelector('.popup-photo');
const closePhoto = document.querySelector('.popup-photo__close-icon');

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


function openAddForm() {
    formAddTitle.textContent = 'Новое место';
    inputFirst.value = '';
    inputSecond.value = '';
    inputFirst.placeholder = 'Название';
    inputSecond.placeholder = 'Ссылка на картинку';
    popup.classList.toggle('popup_opened');
    formElement.addEventListener('submit', addSubmitHandler); 
};

function openEditForm() {
    formAddTitle.textContent = 'Редактировать профиль';
    inputFirst.value = nameText.textContent;
    inputSecond.value = jobText.textContent;
    popup.classList.toggle('popup_opened');
    formElement.addEventListener('submit', editSubmitHandler); 
};

function closeForm() {
    popup.classList.toggle('popup_opened');
    formElement.removeEventListener('submit', addSubmitHandler);
    formElement.removeEventListener('submit', editSubmitHandler);
};

function closePopupPhoto() {
  popupPhoto.classList.toggle('popup_opened');
};

function addSubmitHandler(evt) {
    evt.preventDefault(); 
    const card = createCard(inputFirst.value, inputSecond.value);
    elementsList.prepend(card); 
    closeForm();
};

function editSubmitHandler(evt) {
    evt.preventDefault(); 
    nameText.textContent = inputFirst.value;
    jobText.textContent = inputSecond.value;
    closeForm();
};

function loadCards () {
  initialCards.forEach(function (cardInfo) {
        const card = createCard(cardInfo.name, cardInfo.link);
        elementsList.append(card); 
    });
};

function createCard (name, link) {
    const listItem = elementTemplate.querySelector('.elements__list-item').cloneNode(true);
    const photo = listItem.querySelector('.elements__pic');
    photo.src = link;
    photo.addEventListener('click', function(evt){
      popupPhoto.querySelector('.popup-photo__image').src = link;
      popupPhoto.querySelector('.popup-photo__name').textContent = name;
      popupPhoto.classList.toggle('popup_opened');
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

openAddButton.addEventListener('click', openAddForm);
openEditButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeForm);
closePhoto.addEventListener('click', closePopupPhoto);

loadCards ();

