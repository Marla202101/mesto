let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-icon');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_occupation');

let nameText = document.querySelector('.profile__info-name');
let jobText = document.querySelector('.profile__info-occupation');

function togglePopup() {
    nameInput.value = nameText.textContent;
    jobInput.value = jobText.textContent;
    popup.classList.toggle('popup_opened');
};

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameText.textContent = nameInput.value ;
    jobText.textContent = jobInput.value;
    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 
