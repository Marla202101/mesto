import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._previewImage = this._popup.querySelector('.popup__image');
        this._previewName = this._popup.querySelector('.popup__name');
     }

     open(name, link) {
        this._previewImage.src = link;
        this._previewImage.alt = name;
        this._previewName.textContent = name;
        super.open();
     }
}
