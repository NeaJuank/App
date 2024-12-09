document.addEventListener('DOMContentLoaded', () => {
    const taskDescription = document.getElementById('taskDescription');
    const taskCategory = document.getElementById('taskCategory');
    const taskRepetition = document.getElementById('taskRepetition');
    const taskDate = document.getElementById('taskDate');
    const taskTime = document.getElementById('taskTime');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const editTaskBtn = document.getElementById('editTaskBtn');
    const deleteTaskBtn = document.getElementById('deleteTaskBtn');
    const completeTaskBtn = document.getElementById('completeTaskBtn');
    const toggleModeBtn = document.getElementById('toggleModeBtn');

    let tasks = [];
    let editingTaskIndex = null;
    let isDarkMode = false;

    // Alternar modo claro/oscuro
    toggleModeBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('bg-dark', isDarkMode);
        document.body.classList.toggle('text-white', isDarkMode);
        toggleModeBtn.classList.toggle('btn-light', !isDarkMode); // Cambiar el color del botón
        toggleModeBtn.classList.toggle('btn-dark', isDarkMode);  // Cambiar el color del botón
    });

    // Agregar tarea
    addTaskBtn.addEventListener('click', () => {
        const description = taskDescription.value;
        const category = taskCategory.value;
        const repetition = taskRepetition.value || 'No se repite';
        const date = taskDate.value;
        const time = taskTime.value;

        if (description && date && time) {
            const task = {
                description,
                category,
                repetition,
                date,
                time,
                completed: false
            };
            tasks.push(task);
            updateTaskList();
            clearInputs();
        } else {
            alert('Por favor, complete todos los campos requeridos.');
        }
    });

    // Editar tarea
    editTaskBtn.addEventListener('click', () => {
        const task = tasks[editingTaskIndex];
        taskDescription.value = task.description;
        taskCategory.value = task.category;
        taskRepetition.value = task.repetition;
        taskDate.value = task.date;
        taskTime.value = task.time;

        tasks.splice(editingTaskIndex, 1);
        updateTaskList();
    });

    // Eliminar tarea
    deleteTaskBtn.addEventListener('click', () => {
        tasks.splice(editingTaskIndex, 1);
        updateTaskList();
        clearInputs();
    });

    // Completar tarea
    completeTaskBtn.addEventListener('click', () => {
        const task = tasks[editingTaskIndex];
        task.completed = true;
        updateTaskList();
    });

    // Actualizar lista de tareas
    function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `
                <strong>[${task.category}] ${task.description}</strong><br>
                Fecha: ${task.date} - Hora: ${task.time} - Repetición: ${task.repetition}<br>
                ${task.completed ? '<span class="text-success">Completada</span>' : ''}
            `;
            li.addEventListener('click', () => selectTask(index));
            taskList.appendChild(li);
        });
    }

    // Seleccionar tarea
    function selectTask(index) {
        editingTaskIndex = index;
        const task = tasks[index];
        taskDescription.value = task.description;
        taskCategory.value = task.category;
        taskRepetition.value = task.repetition;
        taskDate.value = task.date;
        taskTime.value = task.time;

        editTaskBtn.disabled = false;
        deleteTaskBtn.disabled = false;
        completeTaskBtn.disabled = false;
    }

    // Limpiar entradas
    function clearInputs() {
        taskDescription.value = '';
        taskCategory.value = 'General';
        taskRepetition.value = '';
        taskDate.value = '';
        taskTime.value = '';
    }
});
document.getElementById('backToLogin').addEventListener('click', () => {
    window.location.href = 'index.html';
});


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const validUsername = "admin"; // Usuario válido
    const validPassword = "12345"; // Contraseña válida

    // Interceptar el submit del formulario
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar que se envíe el formulario

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Validar credenciales
        if (username === validUsername && password === validPassword) {
            // Redirigir si las credenciales son correctas
            window.location.href = 'App/gestor_tareas.html';
        } else {
            // Si las credenciales son incorrectas, muestra un mensaje de error
            alert('Usuario o contraseña incorrectos.');
        }
    });
});
