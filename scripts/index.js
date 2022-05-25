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
  
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function openEditForm() {
  inputNameEdit.value = nameText.textContent;
  inputJobEdit.value = jobText.textContent;
  openPopup(profilePopup);
};

function openAddForm() {
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
    inputLocationAdd.value = '';
    inputLinkAdd.value = '';
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

formEdit.addEventListener('submit', editSubmitHandler); 
formAdd.addEventListener('submit', addSubmitHandler); 

cardAddButton.addEventListener('click', openAddForm);
profileEditButton.addEventListener('click', openEditForm);
profileCloseButton.addEventListener('click', function(){closePopup(profilePopup);});
cardCloseButton.addEventListener('click', function(){closePopup(cardPopup);});
photoCloseButton.addEventListener('click', function(){closePopup(previewPopup);});


loadCards ();

