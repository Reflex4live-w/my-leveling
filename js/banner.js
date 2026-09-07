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
const dotaImage = document.getElementById('image-rang');
const rangContainer = document.getElementById('rang');
const GROUP_SIZE = 153;

let previousGroup = 0;
let currentGroup = 0;

// ===== ‘”Õ ÷»ﬂ ¬—œ€ÿ » =====
function flashEffect(color) {
  // ”·Ë‡ÂÏ ‡ÌËÏ‡ˆË˛
  rangContainer.style.animation = 'none';
  void rangContainer.offsetWidth;
  
  // —Ú‡‚ËÏ ‚ÒÔ˚¯ÍÛ
  rangContainer.style.setProperty('--flash-color', color);
  rangContainer.style.animation = `flash-${color} 0.6s ease-out forwards`;
  
  // ?? ¬Œ«¬–¿Ÿ¿≈Ã œ”À‹—¿÷»ﬁ œŒ—À≈ ¬—œ€ÿ »
  setTimeout(() => {
    rangContainer.style.animation = 'glow-pulse 5s ease-in-out infinite';
  }, 650); // ˜ÛÚ¸ ·ÓÎ¸¯Â ‰ÎËÚÂÎ¸ÌÓÒÚË ‚ÒÔ˚¯ÍË
}

// ===== Œ¡ÕŒ¬À≈Õ»≈  ¿–“»Õ » — ›‘‘≈ “ŒÃ =====
function updateImageWithEffect(group) {
  if (previousGroup !== 0) {
    if (group > previousGroup) {
      flashEffect('green');
    } else if (group < previousGroup) {
      flashEffect('red');
    }
  }
  
  dotaImage.src = `img/dotarang/${group}.jpg`;
  previousGroup = group;
}

// ===== Œ¡ÕŒ¬À≈Õ»≈  ¿–“»Õ » ¡≈« ›‘‘≈ “¿ =====
function updateImageSilent(group) {
  dotaImage.src = `img/dotarang/${group}.jpg`;
  previousGroup = group;
}

// ===== ¬Œ——“¿ÕŒ¬À≈Õ»≈ =====
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('myInputValue');
  if (saved !== null) {
    dotaInput.value = saved;
    const val = parseInt(saved);
    if (!isNaN(val) && val > 0) {
      const group = Math.ceil(val / GROUP_SIZE);
      previousGroup = group;
      currentGroup = group;
      dotaImage.src = `img/dotarang/${group}.jpg`;
    }
  }
});

// ===== ¬¬Œƒ (·ÂÁ ˝ÙÙÂÍÚ‡) =====
dotaInput.addEventListener('input', function() {
  const val = parseInt(this.value);
  
  if (!isNaN(val) && val > 0) {
    const group = Math.ceil(val / GROUP_SIZE);
    currentGroup = group;
    dotaImage.src = `img/dotarang/${group}.jpg`;
  }
  
  localStorage.setItem('myInputValue', this.value);
});

// ===== ENTER ó ‘» —»–”≈Ã –¿Õ√ — ¬—œ€ÿ Œ… =====
dotaInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    
    if (currentGroup !== previousGroup) {
      updateImageWithEffect(currentGroup);
      localStorage.setItem('myInputValue', this.value);
    }
    
    this.blur();
  }
});