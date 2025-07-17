window.onload = function() { 
  document.body.style.opacity = "1"; 
};

document.addEventListener('DOMContentLoaded', () => {
  // Установить конечную дату
  const deadline = new Date('2025-09-20T15:29:59');
  
  // Найти элементы DOM
  const elDays = document.querySelector('.timer__days');
  const elHours = document.querySelector('.timer__hours');
  const elMinutes = document.querySelector('.timer__minutes');
  const elSeconds = document.querySelector('.timer__seconds');
  
  // Функция склонения числительных
  const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
  };

  // Функция обновления таймера
  const updateTimer = () => {
    const now = new Date();
    const diff = Math.max(0, deadline - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');

    elDays.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    elHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    elMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    elSeconds.dataset.title = declensionNum(seconds, ['секунд', 'секунд', 'секунд']);

    if (diff === 0) {
      clearInterval(timerId);
    }

  };

  // Запуск таймера
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
});

$(document).ready(function(){
    const slider = $("#slider").owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {

  let blocks = document.querySelectorAll('section');

  function checkBlocksVisibility() {

    let windowHeight = window.innerHeight;

    blocks.forEach(block => {

      let blockPosition = block.getBoundingClientRect().top;

      if (blockPosition < windowHeight - 100) {
        block.style.opacity = "1";
        block.style.transform = "translateY(0)";
      } else {
        block.style.opacity = "0";
        block.style.transform = "translateY(50px)";
      }

    });

  }

  checkBlocksVisibility();

  window.addEventListener('scroll', checkBlocksVisibility);
});

var el = document.getElementById('btn-play');
var playing = false;

var player = new Audio('./music/music.mp3');
player.preload = "auto";
player.addEventListener('ended', function(){
  el.innerHTML = "<img src='./img/iconplay.png'>";
  playing = false;
});
el.addEventListener('click', playPause);

function playPause() {
  if( playing) {
    player.pause();
    el.innerHTML = "<img src='./img/iconplay.png'>";
  } else {
    player.play();
    el.innerHTML = "<img src='./img/iconpause.png'>";
  }
  playing = !playing;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guest-form');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    const phoneInput = document.getElementById('phone');
    const drinksGroup = document.getElementById('drinks-group');

    const phoneMask = IMask(phoneInput, {
        mask: '+{7} (000) 000-00-00',
        lazy: false,
    });

    const TELEGRAM_BOT_TOKEN = '8058816520:AAHFtTWBF4XBdppjevzrM46QvpetE-s75SQ';
    const TELEGRAM_CHAT_ID = '881195057';

    const fieldsToValidate = ['first-name', 'last-name', 'phone', 'attendance', 'drinks-group'];

    const validationRules = {
        'first-name': {
            validate: (el) => el.value.trim() !== '',
            message: 'Пожалуйста, введите ваше имя.',
        },
        'last-name': {
            validate: (el) => el.value.trim() !== '',
            message: 'Пожалуйста, введите вашу фамилию.',
        },
        'phone': {
            validate: () => phoneMask.masked.isComplete,
            message: 'Пожалуйста, введите полный номер телефона.',
        },
        'attendance': {
            validate: () => form.querySelector('input[name="attendance"]:checked') !== null,
            message: 'Пожалуйста, подтвердите свое присутствие.',
            elementId: 'attendance-group'
        },
        'drinks-group': {
            validate: () => {
                const attending = form.querySelector('input[name="attendance"]:checked');
                // If not attending, this field is valid. If attending, at least one drink must be chosen.
                if (attending && attending.value === 'no') {
                    return true;
                }
                return form.querySelectorAll('input[name="drinks"]:checked').length > 0;
            },
            message: 'Пожалуйста, выберите хотя бы один напиток.',
            elementId: 'drinks-group',
            errorContainerId: 'drinks-error'
        },
    };

    const setValidity = (fieldId, isValid, message) => {
        const element = document.getElementById(fieldId);
        const formGroup = element.closest('.form-group, fieldset');
        const errorContainerId = validationRules[fieldId]?.errorContainerId || `${fieldId}-error`;
        let errorContainer = formGroup.querySelector('.error-message');
        if (validationRules[fieldId]?.errorContainerId) {
             errorContainer = document.getElementById(errorContainerId);
        }

        if (isValid) {
            formGroup.classList.remove('invalid');
            if (errorContainer) {
                errorContainer.textContent = '';
            }
        } else {
            formGroup.classList.add('invalid');
            if (errorContainer) {
                errorContainer.textContent = message;
            } else {
                // For fields without a dedicated error div, like text inputs
                const tempError = document.createElement('div');
                tempError.className = 'error-message';
                tempError.textContent = message;
                if (!formGroup.querySelector('.error-message')) {
                     formGroup.appendChild(tempError);
                }
            }
        }
    };
    
    const clearAllErrors = () => {
        document.querySelectorAll('.form-group.invalid, fieldset.invalid').forEach(group => {
            group.classList.remove('invalid');
        });
        document.querySelectorAll('.error-message').forEach(msg => {
            if(msg.id.includes('-error')) { // Keep dedicated error divs
                msg.textContent = '';
            } else {
                msg.remove();
            }
        });
    };

    const sendToTelegram = async (data) => {
        let message = `📩 <b>Вам новая анкета:</b>\n\n`;
        message += `<b>Имя:</b> ${data.firstName}\n`;
        message += `<b>Фамилия:</b> ${data.lastName}\n`;
        message += `<b>Телефон:</b> ${data.phone}\n`;
        message += `<b>Подтверждение присутствия:</b> ${data.attendance}\n`;
        
        if (data.attendance === 'Я прийду') {
            const drinksValue = Array.from(form.querySelectorAll('input[name="drinks"]:checked'))
                .map(cb => cb.nextElementSibling.textContent.trim())
                .join(', ');
            message += `<b>Напитки:</b> ${drinksValue}\n`;
        }

        if (data.wishes) {
            message += `<b>Примечание:</b> ${data.wishes}\n`;
        }

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const payload = {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (!result.ok) {
                console.error('Telegram API error:', result.description);
            }
        } catch (error) {
            console.error('Failed to send message to Telegram:', error);
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearAllErrors();
        let isFormValid = true;

        fieldsToValidate.forEach(id => {
            const rule = validationRules[id];
            // Skip drink validation if section is hidden
            if (id === 'drinks-group' && drinksGroup.classList.contains('hidden')) {
                setValidity(rule.elementId || id, true); // Mark as valid to clear old errors
                return;
            }
            const element = document.getElementById(rule.elementId || id);
            const isValid = rule.validate(element);
            if (!isValid) {
                isFormValid = false;
                setValidity(rule.elementId || id, false, rule.message);
            }
        });

        if (isFormValid) {
            const formData = {
                firstName: document.getElementById('first-name').value.trim(),
                lastName: document.getElementById('last-name').value.trim(),
                phone: phoneMask.value,
                attendance: form.querySelector('input[name="attendance"]:checked').nextElementSibling.textContent.trim(),
                wishes: document.getElementById('wishes').value.trim(),
            };
            sendToTelegram(formData);
            popup.classList.add('show');
        }
    });

    closePopupButton.addEventListener('click', () => {
        popup.classList.remove('show');
        form.reset();
        phoneMask.updateValue(); // Reset mask value
        clearAllErrors();
        drinksGroup.classList.remove('hidden');
    });

    // Handle visibility of drinks group based on attendance
    form.addEventListener('change', (event) => {
        if (event.target.name === 'attendance') {
            const isAttending = event.target.value === 'yes';
            drinksGroup.classList.toggle('hidden', !isAttending);

            if (!isAttending) {
                // Clear any validation errors on the drinks group when it's hidden
                setValidity('drinks-group', true);
            }
        }
    });

    // Real-time validation feedback
    fieldsToValidate.forEach(id => {
         const rule = validationRules[id];
         const element = document.getElementById(rule.elementId || id);
         
         const eventType = (element.tagName === 'FIELDSET') ? 'change' : 'input';

         element.addEventListener(eventType, () => {
             const isValid = rule.validate(element);
             setValidity(rule.elementId || id, isValid, rule.message);
         });
    });
});