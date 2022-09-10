import { initialConfig,
  previewPopupSelector,
  profilePopupSelector,
  cardPopupSelector,
  questionPopupSelector,
  avatarPopupSelector,
  profileEditButton,
  cardAddButton,
  avatarEditButton,
  formEdit,
  formAdd,
  formAvatarEdit,
  elementsContainerSelector,
  userImageSelector,
  userImageChangerSelector,
  userNameSelector,
  userJobSelector,
  inputNameEdit,
  inputJobEdit
 } from '../utils/constants.js';
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithQuestion from '../components/PopupWithQuestion.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
	authorization: '2c6f5583-0cd8-46f5-acd2-5e39324f0044',
	'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsSection.render(cards); 
  })
  .catch(handleError);

function handleError(err) {
  console.log(err);
}

function createCard(data) {
  const card = new Card(data, userId, '.li-element', 
  (name, link) => {
    popupWithImage.open(name, link);
  }, 
  (card) => {
    questionPopup.open();
    questionPopup.setActionCallBack(() => {
      api.deleteCard(card._cardId)
      .then(() => {
          questionPopup.close();
          card.delete();})
      .catch(handleError);
    }) 
  },
  (card) => {
    api.addLike(card._cardId)
    .then((data) => {
      card.updateLikes(data.likes);
    })
    .catch(handleError);
    
  },
  (card) => {
    api.deleteLike(card._cardId)
    .then((data) => {
      card.updateLikes(data.likes);
    })
    .catch(handleError);
  });
  return card.generateCard();
};

const userInfo = new UserInfo(userNameSelector, userJobSelector, userImageSelector, userImageChangerSelector); 

const cardsSection = new Section(
  (item) => {
      const card = createCard(item);
      cardsSection.addItem(card);
    }
    , elementsContainerSelector);

const questionPopup = new PopupWithQuestion(questionPopupSelector);
const popupWithImage = new PopupWithImage(previewPopupSelector);
const popupEditForm = new PopupWithForm(profilePopupSelector, (evt, formData) => {
  evt.preventDefault(); 
  popupEditForm.setLoading(true, true);
  api.setUserInfo(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditForm.close();
  })
  .catch(handleError).finally(() => {
    popupEditForm.setLoading(false, true);
 });
});
const popupAddForm = new PopupWithForm(cardPopupSelector, (evt, formData) => {
  evt.preventDefault(); 
  popupAddForm.setLoading(true, false);
  api.createCard(formData)
    .then((data) => {
      const card = createCard(data);
      cardsSection.addItem(card);
      popupAddForm.close();
    })
    .catch(handleError)
    .finally(() => {
      popupAddForm.setLoading(false, false);
   });
   
});

const popupWithAvatar = new PopupWithForm(avatarPopupSelector, (evt, formData) => {
  evt.preventDefault(); 
  popupWithAvatar.setLoading(true, true);
  api.setUserAvatar(formData)
  .then((data) => {
    userInfo.setAvatar(data.avatar);
    popupWithAvatar.close()
  })
  .catch(handleError)
  .finally(() => {
    popupWithAvatar.setLoading(false, true);
 }); 
});

popupWithImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
questionPopup.setEventListeners();
popupWithAvatar.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  avatarEditValidator.resetValidation();
  popupWithAvatar.open();
});

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

const cardAddValidator = new FormValidator(initialConfig, formAdd);
const profileEditValidator = new FormValidator(initialConfig, formEdit);
const avatarEditValidator = new FormValidator(initialConfig, formAvatarEdit);
profileEditValidator.enableValidation();
cardAddValidator.enableValidation();
avatarEditValidator.enableValidation();
