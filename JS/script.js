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

    // Verificar si el usuario ha iniciado sesión al cargar la página de tareas
    if (window.location.pathname.includes('gestor_tareas.html')) {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            // Si no hay usuario en el localStorage, redirigir a login
            window.location.href = 'login.html';
        }
    }

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

    // Registro: Guardar credenciales en localStorage
    if (window.location.pathname.includes('register.html')) {
        const registerBtn = document.getElementById('registerBtn');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        registerBtn.addEventListener('click', () => {
            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username && password) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                // Redirigir a login después de registrarse
                window.location.href = 'login.html';
            } else {
                alert('Por favor, ingresa todos los campos.');
            }
        });
    }

    // Inicio de sesión: Verificar las credenciales
    if (window.location.pathname.includes('login.html')) {
        const loginBtn = document.getElementById('loginBtn');
        const loginUsername = document.getElementById('loginUsername');
        const loginPassword = document.getElementById('loginPassword');

        loginBtn.addEventListener('click', () => {
            const username = loginUsername.value;
            const password = loginPassword.value;
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (username === storedUsername && password === storedPassword) {
                // Al iniciar sesión, guardar el usuario actual en localStorage
                localStorage.setItem('currentUser', username);
                window.location.href = 'gestor_tareas.html';
            } else {
                alert('Credenciales incorrectas.');
            }
        });
    }
});
