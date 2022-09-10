import Popup from "../components/Popup.js";
import { initialConfig } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(initialConfig.formSelector);
    this._inputList = this._form.querySelectorAll(initialConfig.inputSelector);
    this._button = this._popup.querySelector(
      initialConfig.submitButtonSelector
    );
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._submitCallback(evt, this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  setLoading(isLoading, isEdit) {
    if (isEdit) {
      if (isLoading) {
        this._button.textContent = "Сохранение...";
      } else {
        this._button.textContent = "Сохранить";
      }
    }
    else {
      if (isLoading) {
        this._button.textContent = "Создание...";
      } else {
        this._button.textContent = "Создать";
      }
    }
  }
}
