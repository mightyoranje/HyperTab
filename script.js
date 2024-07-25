// Clock functionality
function updateTimer() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTimer, 1000);
updateTimer(); // Initial call to display time immediately

// Pomodoro functionality
let pomodoroInterval;
let pomodoroTime = 25 * 60; // 25 minutes in seconds

document.getElementById('startPomodoro').addEventListener('click', togglePomodoro);
document.getElementById('resetPomodoro').addEventListener('click', resetPomodoro);

function togglePomodoro() {
  const startButton = document.getElementById('startPomodoro');
  if (startButton.textContent === 'Start') {
    startPomodoro();
    startButton.textContent = 'Pause';
  } else {
    pausePomodoro();
    startButton.textContent = 'Start';
  }
}

function startPomodoro() {
  pomodoroInterval = setInterval(() => {
    pomodoroTime--;
    updatePomodoroDisplay();
    if (pomodoroTime <= 0) {
      clearInterval(pomodoroInterval);
      alert('Pomodoro session completed!');
      resetPomodoro();
    }
  }, 1000);
}

function pausePomodoro() {
  clearInterval(pomodoroInterval);
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60;
  updatePomodoroDisplay();
  document.getElementById('startPomodoro').textContent = 'Start';
}

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTime / 60);
  const seconds = pomodoroTime % 60;
  document.getElementById('pomodoroTimer').textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

updatePomodoroDisplay(); // Initial display

// Google Slides, Sheets, and Forms functionality
document.getElementById('loadDocumentBtn').addEventListener('click', loadGoogleDocument);

function loadGoogleDocument() {
  const documentUrl = document.getElementById('documentUrlInput').value;
  const documentType = document.getElementById('documentType').value;
  const documentContainer = document.getElementById('documentContainer');
  
  if (documentUrl) {
    // Extract the document ID from the URL
    const documentId = extractDocumentId(documentUrl);
    
    if (documentId) {
      let embedUrl;
      switch(documentType) {
        case 'slides':
          embedUrl = `https://docs.google.com/presentation/d/${documentId}/embed?start=false&loop=false&delayms=3000`;
          break;
        case 'sheets':
          embedUrl = `https://docs.google.com/spreadsheets/d/${documentId}/pubhtml?widget=true&headers=false`;
          break;
        case 'forms':
          embedUrl = `https://docs.google.com/forms/d/e/${documentId}/viewform?embedded=true`;
          break;
      }
      
      documentContainer.innerHTML = 
        `<iframe src="${embedUrl}" 
                frameborder="0" width="100%" height="100%" 
                allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true">
        </iframe>`;
    } else {
      documentContainer.innerHTML = '<p>Invalid Google Document URL. Please check and try again.</p>';
    }
  } else {
    documentContainer.innerHTML = '<p>Please enter a Google Document URL.</p>';
  }
}

function extractDocumentId(url) {
  // This regex matches Slides, Sheets, and Forms URL formats
  const regex = /\/(?:presentation|spreadsheets|forms)\/d\/(?:e\/)?([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  
  if (match) {
    return match[1];
  }
  return null;
}

// Todo list functionality
document.addEventListener('DOMContentLoaded', function() {
  const todoInput = document.getElementById('todoInput');
  const addTodoBtn = document.getElementById('addTodo');
  const todoList = document.getElementById('todoList');

  // Load todos from local storage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <span style="${todo.completed ? 'text-decoration: line-through;' : ''}">${todo.text}</span>
        <button>Delete</button>
      `;
      
      // Toggle completed state
      li.querySelector('input').addEventListener('change', () => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
      });

      // Delete todo
      li.querySelector('button').addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      todoList.appendChild(li);
    });
  }

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addTodoBtn.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
      todos.push({ text: todoText, completed: false });
      todoInput.value = '';
      saveTodos();
      renderTodos();
    }
  });

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodoBtn.click();
    }
  });

  renderTodos();
});


document.addEventListener('DOMContentLoaded', function() {
  const todoInput = document.getElementById('todoInput');
  const addTodoBtn = document.getElementById('addTodo');
  const todoList = document.getElementById('todoList');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <span style="${todo.completed ? 'text-decoration: line-through;' : ''}">${todo.text}</span>
        <button>Delete</button>
      `;
      
      li.querySelector('input').addEventListener('change', () => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
      });

      li.querySelector('button').addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      todoList.appendChild(li);
    });
  }

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addTodoBtn.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
      todos.push({ text: todoText, completed: false });
      todoInput.value = '';
      saveTodos();
      renderTodos();
    }
  });

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodoBtn.click();
    }
  });

  renderTodos();
});

document.addEventListener('DOMContentLoaded', function() {
  const announcementWidget = document.querySelector('.announcement-widget');
  const announcementText = document.getElementById('announcementText');
  const closeAnnouncementBtn = document.getElementById('closeAnnouncement');

  const API_KEY = ''; //YOUR API KEY
  const SHEET_ID = ''; //YOUR SHEET ID
  const RANGE = 'A2:B2'; 
  function fetchAnnouncement() {
    console.log('Fetching announcement...');
    announcementText.textContent = 'Loading announcement...';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        if (data.values && data.values.length > 0) {
          const [announcement, timestamp] = data.values[0];
          console.log('Announcement:', announcement, 'Timestamp:', timestamp);
          if (announcement && announcement.trim() !== '') {
            announcementText.textContent = announcement;
            announcementWidget.classList.add('show');
          } else {
            console.log('No announcement text found');
            announcementWidget.classList.remove('show');
          }
        } else {
          console.log('No data values found');
          announcementWidget.classList.remove('show');
        }
      })
      .catch(error => {
        console.error('Error fetching announcement:', error);
        announcementText.textContent = 'Failed to load announcement. Please try again later.';
        announcementWidget.classList.add('show');
      });
  }

  closeAnnouncementBtn.addEventListener('click', () => {
    announcementWidget.classList.remove('show');
  });

  fetchAnnouncement();
  setInterval(fetchAnnouncement, 300000);
});

document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  const currentMode = localStorage.getItem('mode') || 'light';
  body.classList.toggle('dark-mode', currentMode === 'dark');
  updateButtonText();

  darkModeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
      updateButtonText();
  });

  function updateButtonText() {
      const isDarkMode = body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
  }
});
