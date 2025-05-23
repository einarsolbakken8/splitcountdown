const startDate = dayjs('2025-02-16T00:00:00');
const targetDate = dayjs('2025-08-04T06:00:00');

const countdownEl = document.getElementById('countdown');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const modeToggle = document.getElementById('modeToggle');
const body = document.getElementById('body');
const content = document.getElementById('content');
const contentBox = document.getElementById('contentBox');

function updateCountdown() {
  const now = dayjs();
  const totalDuration = targetDate.diff(startDate);
  const elapsed = now.diff(startDate);
  const remaining = targetDate.diff(now);

  if (remaining <= 0) {
    countdownEl.textContent = 'Det er dagen! 🎉';
    progressBar.style.width = '100%';
    progressPercent.textContent = '100% fullført!';
    return;
  }

  const days = targetDate.diff(now, 'day');
  const hours = targetDate.subtract(days, 'day').diff(now, 'hour');
  const minutes = targetDate.subtract(days, 'day').subtract(hours, 'hour').diff(now, 'minute');
  const seconds = targetDate.subtract(days, 'day').subtract(hours, 'hour').subtract(minutes, 'minute').diff(now, 'second');

  countdownEl.textContent = `${days}d ${hours}t ${minutes}m ${seconds}s`;

  const percent = Math.min((elapsed / totalDuration) * 100, 100);
  progressBar.style.width = `${percent.toFixed(2)}%`;
  progressPercent.textContent = `${percent.toFixed(2)}% `;
}

function toggleMode(isSplitMode) {
  if (isSplitMode) {
    const backgrounds = [
      'andreas.JPG',
      // 'lars.jpg',
      // 'jens.jpg',
      // 'adrian.jpg'
    ];

    const randomImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    // Test om bildet kan lastes
    const testImage = new Image();
    testImage.onload = () => {
      body.style.backgroundImage = `url('${randomImage}')`;
    };
    testImage.onerror = () => {
      console.warn(`Kunne ikke laste bilde: ${randomImage}, bruker fallback`);
      body.style.backgroundImage = "url('fallback.jpg')"; // legg til fallback hvis du vil
    };
    testImage.src = randomImage;
    console.log("Valgt bilde:", randomImage);

    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';

    content.classList.remove('items-center');
    content.classList.add('items-start', 'pl-16');
    contentBox.classList.add('bg-black/50', 'backdrop-blur-md', 'text-white', 'shadow-lg');
  } else {
    body.style.backgroundImage = '';
    body.style.backgroundColor = '#111827';

    content.classList.remove('items-start', 'pl-16');
    content.classList.add('items-center');
    contentBox.classList.remove('bg-black/50', 'backdrop-blur-md', 'text-white', 'shadow-lg');
  }
}


updateCountdown();
setInterval(updateCountdown, 1000);

modeToggle.addEventListener('change', () => {
  toggleMode(modeToggle.checked);
});
