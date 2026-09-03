const form = document.getElementById('todo-form');

const input = document.getElementById('todo-input');

const ulNow = document.getElementById('list-now');
const ulLater = document.getElementById('list-later');


let tasks = [];


//Обработчик событий по соданию li
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const newValue = cleaning(input.value);

  // Проверка на пустой ввод
  if (!newValue) return;

  //создание элемента для массива tasks
  addTask(newValue);

  //Сохранение в localStorage
  savedTask();

  //Отрисовка списка
  renderTask();

  //Очистка input
  input.value = '';
});



//Очистка пробелов input и заглавная буква
function cleaning(str) {
 
  let cleaned = str.trim().replace(/\s+/g, ' ');

  cleaned = cleaned[0].toUpperCase() + cleaned.slice(1);
  
  return cleaned;
}



//созадние элемента для массива tasks
function addTask(value) {
  const newTask = {
    id: createId(),
    text: value,
    favorite: false,
    ul: "now",
    complete: false,
  };
  tasks.push(newTask);  

  return newTask 
  
  
}

// генератор через Date.now()
function createId() {
  return Date.now();
}


//Изменение объекта 
function updateTask(id, li) {
  for (const task of tasks) {
    if (task.id === id) {
      if (li.classList.contains('favorite')) {
        task.favorite = true;
      } else {
         task.favorite = false;
      }

      if (li.classList.contains('complete')) {
        task.complete = true;
      } else {
         task.complete = false;
      }
  
      if (ulLater.contains(li)) {
        task.ul = "later";
      } else {
        task.ul = "now"
      }
      break;
    }
  }
}

//Функция удаления из Tasks 
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== Number(id))
}


//Помещаем в localStorage
function savedTask() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Достаем из localstorage 
function loadTask() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

//отрисовка списков 
function renderTask() {
  ulNow.innerHTML = '';
  ulLater.innerHTML = '';

  for (const task of tasks) {
    const id = task.id;
    const li = document.createElement('li');

    li.dataset.id = task.id;

    
    const text = document.createElement('div')
    text.textContent = task.text;

    if (task.favorite === true) {
      li.classList.add('favorite');
      
    } 

    if (task.complete === true) {
      li.classList.add('complete')
    }

    //создание кнопки добавить в избранное
    const favBtn = document.createElement('button');
    favBtn.textContent = "";
    favBtn.classList.add('buttonFav');
    favBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      li.classList.toggle('favorite');
      updateTask(id, li)
      savedTask()
      if (task.ul === "now") {

        if (task.favorite === true){
         ulNow.prepend(li);
        } else {
         ulNow.append(li);
        }
    
      } else {

        if (task.favorite === true){
          ulLater.prepend(li);
        } else {
          ulLater.append(li);
        }
    
      }
      
      
    })

    li.addEventListener('click', (event) => {
      event.stopPropagation();
      li.classList.toggle('complete');
      updateTask(id, li)
      savedTask()

    })

   //создане кнопки удаления
    const delBtn = document.createElement('button');
    delBtn.textContent = "";
    delBtn.classList.add('buttonDel');
    delBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      delBtn.disabled = true;
      deleteTask(id);
      savedTask();
      renderTask()
  
    })

    li.append(favBtn, text, delBtn);



    if (task.ul === "now") {

      if (task.favorite === true){
        ulNow.prepend(li);
      } else {
        ulNow.append(li);
      }
    
    } else {

      if (task.favorite === true){
        ulLater.prepend(li);
      } else {
        ulLater.append(li);
      }
    
    }
  
    li.addEventListener('dblclick', (event) => {
      event.stopPropagation()
      if (ulNow.contains(li)) {
        ulLater.append(li);
      } else {
        ulNow.append(li);
      }
      updateTask(id, li)
      savedTask()
    })
  }
  

}


//Для отрисовки после перезапуска
function init()  {
  loadTask();
  renderTask();
}

init();


console.log(tasks)