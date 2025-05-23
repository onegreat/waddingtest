document.addEventListener('DOMContentLoaded', () => {
  // Установить конечную дату
  const deadline = new Date('2025-12-31T23:59:59');
  
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