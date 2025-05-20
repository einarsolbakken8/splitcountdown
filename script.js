const targetDate = dayjs('2025-08-04T06:00:00');

function updateCountdown() {
  const now = dayjs();
  const diff = targetDate.diff(now);

  const countdownEl = document.getElementById('countdown');

  if (diff <= 0) {
    countdownEl.textContent = 'Det er dagen! 🎉';
    return;
  }

  const days = targetDate.diff(now, 'day');
  const hours = targetDate.subtract(days, 'day').diff(now, 'hour');
  const minutes = targetDate.subtract(days, 'day').subtract(hours, 'hour').diff(now, 'minute');
  const seconds = targetDate.subtract(days, 'day').subtract(hours, 'hour').subtract(minutes, 'minute').diff(now, 'second');

  countdownEl.textContent = `${days}d ${hours}t ${minutes}m ${seconds}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
