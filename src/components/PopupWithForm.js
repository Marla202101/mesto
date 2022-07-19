import Popup from '../components/Popup.js';
import { initialConfig } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(initialConfig.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(initialConfig.inputSelector));
  }

  _getInputValues() {
    return this._inputList.map((input) => {return input.value;})
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => { this._submitCallback(evt, this._getInputValues());}); 
  }

  openWithValues(value1, value2) {
    this._inputList[0].value = value1;
    this._inputList[1].value = value2;
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}