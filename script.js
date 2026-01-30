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
        saveToLocalStorage();
        input.value = "";
    }
});

// --- 3. FUNCTION TO CREATE TASK HTML ---
function createTaskElement(text, isCompleted) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');

    // If task is completed, show the 'X' button. If not, show 'Finish' button.
    li.innerHTML = `
        <span class="text-content">${text}</span>
        <div class="action-btns">
            ${isCompleted 
                ? '<button class="delete-btn">✖</button>' 
                : '<button class="finish-btn">Finish</button>'}
        </div>
    `;

    // Handle button clicks
    const actionContainer = li.querySelector('.action-btns');
    
    li.addEventListener('click', (e) => {
        // FINISH LOGIC
        if (e.target.classList.contains('finish-btn')) {
            li.classList.add('completed');
            // Swap Finish button for Delete (X) button
            actionContainer.innerHTML = '<button class="delete-btn">✖</button>';
            todoList.appendChild(li); // Move to bottom
            saveToLocalStorage();
        }
        
        // DELETE LOGIC
        if (e.target.classList.contains('delete-btn')) {
            li.remove();
            saveToLocalStorage();
        }
    });

    if (isCompleted) {
        todoList.appendChild(li);
    } else {
        todoList.prepend(li);
    }
}

// --- 4. FUNCTION TO SAVE ALL DATA ---
function saveToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.text-content').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTodoList', JSON.stringify(tasks));
}
