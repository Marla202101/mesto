export const previewPopupSelector = '.popup_preview';
export const profilePopupSelector = '.popup_edit';
export const cardPopupSelector = '.popup_add';
export const questionPopupSelector = '.popup_delete';
export const avatarPopupSelector = '.popup_add-avatar';

export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__avatar');

export const formEdit = document.querySelector('.popup__container-edit');
export const formAdd = document.querySelector('.popup__container-add');
export const formAvatarEdit = document.querySelector('.popup__container-add-avatar');

export const userImageSelector = '.profile__avatar';
export const userImageChangerSelector = '.profile__edit-icon';
export const userNameSelector = '.profile__info-name';
export const userJobSelector = '.profile__info-occupation';

export const inputNameEdit = formEdit.querySelector('.popup__input_edit_name');
export const inputJobEdit = formEdit.querySelector('.popup__input_edit_occupation');


export const elementsContainerSelector = '.elements__list';

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

  export const initialConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active'
  }; 