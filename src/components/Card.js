import PopupWithQuestion from "./PopupWithQuestion";

export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleCardDelete,
    handelLikeAdd,
    handelLikeRemove
  ) {
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._cardId = data._id;
    this._owner = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handelLikeAdd = handelLikeAdd;
    this._handelLikeRemove = handelLikeRemove;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__list-item")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector(".elements__pic");
    this._likeButton = this._element.querySelector(".elements__button-like");
    this._likeCounter = this._element.querySelector(".elements__like-counter");
    this._trashButton = this._element.querySelector(".elements__button-trash");
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this.updateLikes(this._likes);
    if(this._owner !== this._userId)
      this._trashButton.style.visibility = "hidden";
    this._setEventListeners();
    this._element.querySelector(".elements__name").textContent = this._name;
    return this._element;
  }

  delete() {
    this._element.remove();
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likeCounter.textContent = this._likes.length;
    if (this._likes.length > 0)
      this._likeButton.classList.add("elements__button-like_active");
    else this._likeButton.classList.remove("elements__button-like_active");
  }

  _isLiked() {
    return this._likes.some((user) => {
      return this._userId === user._id;
    });
  }

  _handleClickLike() {
    if (this._isLiked()) this._handelLikeRemove(this);
    else this._handelLikeAdd(this);
  }

  _handleClickTrash() {
    this._handleCardDelete(this);
  }

  _setEventListeners() {
    this._photo.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeButton.addEventListener("click", () => {
      this._handleClickLike();
    });
    this._trashButton.addEventListener("click", () => {
      this._handleClickTrash();
    });
  }
}
