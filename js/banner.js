//TIME AND DATE
function timedate() {
  const now = new Date();

  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const optionsDate = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  };

  document.getElementById('time').textContent = now.toLocaleString('ru-RU', optionsTime);
  document.getElementById('date').textContent = now.toLocaleString('ru-RU', optionsDate);
};