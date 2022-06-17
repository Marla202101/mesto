// Функция, которая добавляет класс с ошибкой
   const showInputError = (formElement, inputElement, errorMessage, initialConfig) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(initialConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(initialConfig.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, initialConfig) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(initialConfig.inputErrorClass);
    errorElement.classList.remove(initialConfig.errorClass);
    errorElement.textContent = '';
  };

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, buttonInForm, initialConfig) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, initialConfig);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement, initialConfig);
    }
}; 

// Вызовем функцию isValid на каждый ввод символа
const setEventListeners = (formElement, initialConfig) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(initialConfig.inputSelector));
    const buttonInForm = formElement.querySelector(initialConfig.submitButtonSelector);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, buttonInForm, initialConfig);
        toggleButtonState(inputList, buttonInForm, initialConfig);
      });
    });
    toggleButtonState(inputList, buttonInForm, initialConfig);
  };

  // Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonInForm, initialConfig) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonInForm.classList.add(initialConfig.inactiveButtonClass);
      buttonInForm.disabled = true;
    } else {
      // иначе сделай кнопку активной
      buttonInForm.classList.remove(initialConfig.inactiveButtonClass);
      buttonInForm.disabled = false;
    }
}; 

  const enableValidation = (initialConfig) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(initialConfig.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, initialConfig);
    });
  };
  
  