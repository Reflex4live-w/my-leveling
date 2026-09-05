//TIME AND DATE
function timedate() {
  const now = new Date();

  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const optionsDate = {
    // weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  document.getElementById('time').textContent = now.toLocaleString('ru-RU', optionsTime);
  document.getElementById('date').textContent = now.toLocaleString('ru-RU', optionsDate);
};

timedate();
setInterval(timedate, 1000);



//dota 2 rang
const dotaInput = document.getElementById('dota-input');

document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('myInputValue');
  if (saved !== null) {
    dotaInput.value = saved;
  }
});

dotaInput.addEventListener('input', function() {
  localStorage.setItem('myInputValue', this.value);
});



