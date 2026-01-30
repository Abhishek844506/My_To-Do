const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    const taskText = input.value;

    if (taskText !== "") {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="text-content">${taskText}</span>
            <button class="finish-btn">Finish</button>
        `;

        // Logic for the Finish button
        li.querySelector('.finish-btn').addEventListener('click', function() {
            // Add the CSS class for the cross line
            li.classList.add('completed');

            // Remove the button so they can't "finish" it twice
            this.remove();

            // Move the item to the bottom of the list
            todoList.appendChild(li);
        });

        todoList.appendChild(li);
        input.value = "";
    }
});