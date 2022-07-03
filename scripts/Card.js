export class Card {
    constructor(name, link, cardSelector) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._previewPopup = document.querySelector('.popup_preview');
      this._previewImage = this._previewPopup.querySelector('.popup__image');
      this._previewName = this._previewPopup.querySelector('.popup__name');
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
        const photo = this._element.querySelector('.elements__pic');
        photo.src = this._link;
        photo.alt = this._name;
        this._setEventListeners(photo);
        this._element.querySelector('.elements__name').textContent = this._name;
        return this._element;
      } 

      _handleOpenPopup() { 
        this._previewImage.src = this._link;
        this._previewImage.alt = this._name;
        this._previewName.textContent = this._name;
        this._previewPopup.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            this._closePopupEscPress(evt);
        });
      }
      
      _handleClosePopup(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._closePopupEscPress(evt);
        }); 
      }

      _closePopupClick(evt) {
            if (evt.target.classList.contains('popup_opened')) {
                this._handleClosePopup(this._previewPopup)
            }
            if (evt.target.classList.contains('popup__close-icon')) {
                this._handleClosePopup(this._previewPopup)
            }
        }

      _closePopupEscPress(evt){
        if (evt.key === 'Escape') {
          this._handleClosePopup(this._previewPopup);
        };
      }

      _setEventListeners(photo) {
        photo.addEventListener('click', () => {
            this._handleOpenPopup();
        });

        this._previewPopup.addEventListener('mousedown', (evt) => {
            this._closePopupClick(evt);
        });

        const likeButton = this._element.querySelector('.elements__button-like');
        likeButton.addEventListener('click', (evt) => {
            evt.target.classList.toggle('elements__button-like_active');
        });
        const trashButton = this._element.querySelector('.elements__button-trash');
        trashButton.addEventListener('click', (evt) => {
            evt.target.closest('.elements__list-item').remove();
        });
    }
};
  
    
  