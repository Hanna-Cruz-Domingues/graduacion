/**
 * ==============================================================
 * LOGICA DE INTERACCIÓN | GRADUACIÓN DE KÍNDER HANNA 🎓
 * ==============================================================
 */

// 1. CONFIGURACIÓN DEL EVENTO
// Calcula la fecha exacta: 12 de Diciembre a las 2:00 PM (14:00:00) a partir de la fecha actual
function getEventTargetDate() {
  const now = new Date();
  let year = now.getFullYear();
  // En JavaScript los meses son 0-indexados: 11 = Diciembre.
  // 12 de Diciembre a las 14:00:00 (2:00 PM)
  let target = new Date(year, 11, 12, 14, 0, 0);

  // Si la fecha actual ya superó el 12 de Diciembre a las 2:00 PM de este año, fijar para el siguiente año
  if (now.getTime() >= target.getTime()) {
    target = new Date(year + 1, 11, 12, 14, 0, 0);
  }
  return target;
}

const CONFIG = {
  // Fecha y hora del evento: 12 de Diciembre a las 2:00 PM
  eventDate: getEventTargetDate(),

  // Título y detalles para Google Calendar
  eventTitle: '¡Graduación de Kínder de Hanna! 🎓🎈',
  eventDetails: 'Acompáñanos a celebrar la graduación de preescolar de Hanna. Ceremonia de diplomas y fiesta con juegos infantiles.',
  eventLocation: 'Colegio Los Pequeños Sabios & Salón Jardín Aventuras Mágicas',

  // Número de WhatsApp para recibir las confirmaciones (con código de país, sin espacios ni '+')
  // Ej: México: 521XXXXXXXXXX | Colombia: 57XXXXXXXXXX | España: 34XXXXXXXXX
  whatsappNumber: '51965674736',

  // Nombre de la pequeña graduada
  celebrantName: 'Hanna'
};

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Iconos Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initIntroScreen();
  initMusicPlayer();
  initCountdown();
  initCalendarButton();
  initCopyButton();
  initRSVPForm();
});

/**
 * -------------------------------------------------------------
 * 1. PANTALLA DE APERTURA (INVITACIÓN INTERACTIVA)
 * -------------------------------------------------------------
 */
function initIntroScreen() {
  const introScreen = document.getElementById('intro-screen');
  const btnOpen = document.getElementById('btn-open-invite');
  const musicController = document.getElementById('music-controller');
  const audio = document.getElementById('bg-audio');
  const btnToggle = document.getElementById('btn-music-toggle');
  const icon = document.getElementById('music-icon');

  if (!btnOpen || !introScreen) return;

  btnOpen.addEventListener('click', () => {
    // Cerrar pantalla de bienvenida
    introScreen.classList.add('closed');
    if (musicController) {
      musicController.classList.remove('hidden');
    }

    // Iniciar audio alegre
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (btnToggle) btnToggle.classList.remove('paused');
          if (icon) icon.setAttribute('data-lucide', 'volume-2');
          if (window.lucide) window.lucide.createIcons();
        }).catch(err => {
          console.warn('El navegador solicitó permiso de reproducción:', err);
          if (btnToggle) btnToggle.classList.add('paused');
          if (icon) icon.setAttribute('data-lucide', 'volume-x');
          if (window.lucide) window.lucide.createIcons();
        });
      }
    }

    // Explosión de confeti multicolor
    triggerKinderConfetti();
  });
}

/**
 * -------------------------------------------------------------
 * 2. CONTROLADOR DE MÚSICA FLOTANTE
 * -------------------------------------------------------------
 */
function initMusicPlayer() {
  const btnToggle = document.getElementById('btn-music-toggle');
  const audio = document.getElementById('bg-audio');
  const icon = document.getElementById('music-icon');

  if (!btnToggle || !audio) return;

  btnToggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        btnToggle.classList.remove('paused');
        if (icon) icon.setAttribute('data-lucide', 'volume-2');
        if (window.lucide) window.lucide.createIcons();
      }).catch(err => {
        console.error('Error al reproducir audio:', err);
      });
    } else {
      audio.pause();
      btnToggle.classList.add('paused');
      if (icon) icon.setAttribute('data-lucide', 'volume-x');
      if (window.lucide) window.lucide.createIcons();
    }
  });
}

/**
 * -------------------------------------------------------------
 * 3. CUENTA REGRESIVA
 * -------------------------------------------------------------
 */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = CONFIG.eventDate.getTime() - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/**
 * -------------------------------------------------------------
 * 4. BOTÓN "AÑADIR A GOOGLE CALENDAR"
 * -------------------------------------------------------------
 */
function initCalendarButton() {
  const btnCalendar = document.getElementById('btn-add-calendar');
  if (!btnCalendar) return;

  const pad = (n) => String(n).padStart(2, '0');
  const formatCalendarDate = (date) =>
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;

  const startTime = formatCalendarDate(CONFIG.eventDate);
  // Duración estimada: 6 horas (de 2:00 PM a 8:00 PM)
  const endTime = formatCalendarDate(new Date(CONFIG.eventDate.getTime() + 6 * 60 * 60 * 1000));

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(CONFIG.eventTitle)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(CONFIG.eventDetails)}&location=${encodeURIComponent(CONFIG.eventLocation)}`;

  btnCalendar.href = calendarUrl;
}

/**
 * -------------------------------------------------------------
 * 5. COPIAR NÚMERO DE CUENTA / ALCANCÍA VIRTUAL
 * -------------------------------------------------------------
 */
function initCopyButton() {
  const btnCopy = document.getElementById('btn-copy-account');
  const bankNumberEl = document.getElementById('bank-number');
  const copyText = document.getElementById('copy-text');

  if (!btnCopy || !bankNumberEl) return;

  btnCopy.addEventListener('click', () => {
    const textToCopy = bankNumberEl.textContent.replace(/\s+/g, '').trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = copyText.textContent;
      copyText.textContent = '¡Copiado! ⭐';
      btnCopy.style.background = '#06D6A0';

      setTimeout(() => {
        copyText.textContent = originalText;
        btnCopy.style.background = '';
      }, 2500);
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  });
}

/**
 * -------------------------------------------------------------
 * 6. FORMULARIO RSVP CON DETALLE DE ADULTOS Y NIÑOS A WHATSAPP
 * -------------------------------------------------------------
 */
function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const attendingSelect = document.getElementById('guest-attending');
  const countsGroup = document.getElementById('group-counts');

  if (!form) return;

  // Ocultar o mostrar contadores de adultos y niños
  if (attendingSelect && countsGroup) {
    attendingSelect.addEventListener('change', (e) => {
      if (e.target.value === 'no') {
        countsGroup.style.display = 'none';
      } else {
        countsGroup.style.display = 'flex';
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const familyName = document.getElementById('family-name').value.trim();
    const attending = attendingSelect.value;
    const adults = document.getElementById('adult-count').value || '1';
    const kids = document.getElementById('kids-count').value || '0';
    const message = document.getElementById('guest-message').value.trim();

    const isAttending = attending === 'si';

    let waMessage = `🎓✨ *GRADUACIÓN DE KÍNDER DE HANNA* ✨🎈%0A%0A`;
    waMessage += `¡Hola! Somos *${familyName}*.%0A`;

    if (isAttending) {
      waMessage += `🎉 *¡Confirmamos con mucha alegría nuestra asistencia!*%0A`;
      waMessage += `👨‍👩‍👧 *Adultos:* ${adults}%0A`;
      waMessage += `👧👦 *Niños:* ${kids}%0A`;
    } else {
      waMessage += `💌 *Lamentablemente no podremos asistir*, pero le enviamos un abrazo enorme y una gran felicitación a Hanna en su graduación.%0A`;
    }

    if (message) {
      waMessage += `📝 *Mensaje:* "${message}"%0A`;
    }

    waMessage += `%0A¡Felicidades a la pequeña graduada! 🎒⭐`;

    // Confeti si asiste
    if (isAttending) {
      triggerKinderConfetti();
    }

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${waMessage}`;
    window.open(waUrl, '_blank');
  });
}

/**
 * -------------------------------------------------------------
 * 7. CONFETI MULTICOLOR INFANTIL
 * -------------------------------------------------------------
 */
function triggerKinderConfetti() {
  if (typeof confetti !== 'function') return;

  // Lluvia de confeti de colores vivos
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#FF6B6B', '#FFD166', '#06D6A0', '#4D96FF', '#9B5DE5', '#FF9F1C']
  });

  // Estrellitas secundarias
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFD166', '#FF6B6B', '#06D6A0']
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#4D96FF', '#9B5DE5', '#FFD166']
    });
  }, 250);
}
