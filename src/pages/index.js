import { initialConfig,
  previewPopupSelector,
  profilePopupSelector,
  cardPopupSelector,
  profileEditButton,
  cardAddButton,
  formEdit,
  formAdd,
  elementsContainerSelector,
  initialCards,
  nameSelector,
  jobSelector,
  inputNameEdit,
  inputJobEdit
 } from '../utils/constants.js';
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

function createCard(name, link) {
  const card = new Card(name, link, '.li-element', (name, link) => {
    popupWithImage.open(name, link);
  });
  return card.generateCard();
};

const userInfo = new UserInfo({nameSelector, jobSelector}); 

const cardsSection = new Section(
  { items: initialCards, 
    renderer: (item) => {
      const card = createCard(item.name, item.link);
      cardsSection.addItem(card);
    }
  }, elementsContainerSelector);

cardsSection.render(); 

const popupWithImage = new PopupWithImage(previewPopupSelector);
const popupEditForm = new PopupWithForm(profilePopupSelector, (evt, data) => {
  evt.preventDefault(); 
  userInfo.setUserInfo(data);
  popupEditForm.close();
});
const popupAddForm = new PopupWithForm(cardPopupSelector, (evt, data) => {
  evt.preventDefault(); 
  const card = createCard(data.placename, data.link);
  cardsSection.addItem(card);
  popupAddForm.close();
});

popupWithImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();

cardAddButton.addEventListener('click', () => {
  cardAddValidator.resetValidation();
  popupAddForm.open();
});

profileEditButton.addEventListener('click', () => {
  profileEditValidator.resetValidation();
  const userInfoValues = userInfo.getUserInfo();
  inputNameEdit.value = userInfoValues.name
  inputJobEdit.value = userInfoValues.job
  popupEditForm.open();
});

const profileEditValidator = new FormValidator(initialConfig, formEdit);
const cardAddValidator = new FormValidator(initialConfig, formAdd);
profileEditValidator.enableValidation();
cardAddValidator.enableValidation();

