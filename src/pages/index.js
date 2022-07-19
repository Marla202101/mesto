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
  jobSelector
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
const popupEditForm = new PopupWithForm(profilePopupSelector, (evt, values) => {
  evt.preventDefault(); 
  userInfo.setUserInfo(values[0], values[1]);
  popupEditForm.close();
});
const popupAddForm = new PopupWithForm(cardPopupSelector, (evt, values) => {
  evt.preventDefault(); 
  const card = createCard(values[0], values[1]);
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
  popupEditForm.openWithValues(userInfoValues.name, userInfoValues.job);
});

const profileEditValidator = new FormValidator(initialConfig, formEdit);
const cardAddValidator = new FormValidator(initialConfig, formAdd);
profileEditValidator.enableValidation();
cardAddValidator.enableValidation();

