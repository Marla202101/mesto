import Popup from '../components/Popup.js';
import { initialConfig } from '../utils/constants.js';

export default class PopupWithQuestion extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__delete-button');
   }
   setEventListeners() {
      super.setEventListeners();
      this._button.addEventListener('click', () => { this._actionCallback();}); 
    }

    setActionCallBack(actionCallback) {
      this._actionCallback = actionCallback;
    }

}