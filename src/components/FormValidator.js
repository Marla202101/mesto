export default class FormValidator {
  constructor (initialConfig, formElement) {
    this._initialConfig = initialConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._initialConfig.inputSelector));
    this._buttonInForm = this._formElement.querySelector(this._initialConfig.submitButtonSelector);
  }

_showInputError (inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(this._initialConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._initialConfig.errorClass);
  }
  
_hideInputError (inputElement) {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(this._initialConfig.inputErrorClass);
    errorElement.classList.remove(this._initialConfig.errorClass);
    errorElement.textContent = '';
  }

// Функция, которая проверяет валидность поля
_isValid (inputElement) {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
}

// Вызовем функцию isValid на каждый ввод символа
_setEventListeners () {
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

_hasInvalidInput () {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

_toggleButtonState () {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonInForm.classList.add(this._initialConfig.inactiveButtonClass);
      this._buttonInForm.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._buttonInForm.classList.remove(this._initialConfig.inactiveButtonClass);
      this._buttonInForm.disabled = false;
    }
}; 

resetValidation () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
}

enableValidation () {
  this._formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      this._setEventListeners();
  }
}
  