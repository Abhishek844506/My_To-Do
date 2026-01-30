const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// --- 1. LOAD DATA WHEN THE PAGE OPENS ---
window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('myTodoList');
    if (savedData) {
        const tasks = JSON.parse(savedData);
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
});

// --- 2. ADD BUTTON CLICK ---
addBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText, false);
        saveToLocalStorage(); // Save after adding
        input.value = "";
    }
});

// --- 3. FUNCTION TO CREATE TASK HTML ---
function createTaskElement(text, isCompleted) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');

    li.innerHTML = `
        <span class="text-content">${text}</span>
        ${!isCompleted ? '<button class="finish-btn">Finish</button>' : ''}
    `;

    // Add event listener for the Finish button (if it exists)
    const finishBtn = li.querySelector('.finish-btn');
    if (finishBtn) {
        finishBtn.addEventListener('click', function() {
            li.classList.add('completed');
            this.remove(); // Remove button
            todoList.appendChild(li); // Move to bottom
            saveToLocalStorage(); // Save change
        });
    }

    // Add to the list
    if (isCompleted) {
        todoList.appendChild(li);
    } else {
        todoList.prepend(li);
    }
}

// --- 4. FUNCTION TO SAVE ALL DATA ---
function saveToLocalStorage() {
    const tasks = [];
    // We look at every 'li' currently on the screen and save its state
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.text-content').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTodoList', JSON.stringify(tasks));
}
