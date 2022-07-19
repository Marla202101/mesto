export default class Card {
    constructor(name, link, cardSelector, handleCardClick ) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }
     
    _getTemplate() {
        const cardElement = document
         .querySelector(this._cardSelector)
         .content
         .querySelector('.elements__list-item')
         .cloneNode(true);
        return cardElement;        
    }
  
    generateCard() {
        this._element = this._getTemplate();
        this._photo = this._element.querySelector('.elements__pic');
        this._likeButton = this._element.querySelector('.elements__button-like');
        this._trashButton = this._element.querySelector('.elements__button-trash');
        this._photo.src = this._link;
        this._photo.alt = this._name;
        this._setEventListeners();
        this._element.querySelector('.elements__name').textContent = this._name;
        return this._element;
      } 

    _handleClickLike(evt){
            evt.target.classList.toggle('elements__button-like_active');
      }

    _handleClickTrash(evt){
        evt.target.closest('.elements__list-item').remove();
      }


    _setEventListeners() {
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
        this._likeButton.addEventListener('click', (evt) => {
            this._handleClickLike(evt);
        });
        this._trashButton.addEventListener('click', (evt) => {
            this._handleClickTrash(evt);
        });
    }
};
  
    
  