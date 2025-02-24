// Данные тренировок
const workouts = [
    { name: "Йога для начинающих", duration: 300 }, // 5 минут
    { name: "Кардио-тренировка", duration: 600 },   // 10 минут
    { name: "Силовая тренировка", duration: 900 }   // 15 минут
];

// Элементы интерфейса
const workoutList = document.getElementById("workout-list");
const timerContainer = document.getElementById("timer");
const currentExercise = document.getElementById("current-exercise");
const timeLeft = document.getElementById("time-left");
const stopButton = document.getElementById("stop-button");

let interval;

// Загрузка списка тренировок
function loadWorkouts() {
    workouts.forEach(workout => {
        const workoutItem = document.createElement("div");
        workoutItem.classList.add("workout-item");
        workoutItem.textContent = workout.name;
        workoutItem.addEventListener("click", () => startWorkout(workout));
        workoutList.appendChild(workoutItem);
    });
}

// Запуск тренировки
function startWorkout(workout) {
    workoutList.classList.add("hidden");
    timerContainer.classList.remove("hidden");

    let timeRemaining = workout.duration;
    currentExercise.textContent = workout.name;
    updateTimer(timeRemaining);

    interval = setInterval(() => {
        timeRemaining--;
        updateTimer(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(interval);
            alert("Тренировка завершена!");
            resetInterface();
        }
    }, 1000);
}

// Обновление таймера
function updateTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeLeft.textContent = `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Сброс интерфейса
function resetInterface() {
    clearInterval(interval);
    timerContainer.classList.add("hidden");
    workoutList.classList.remove("hidden");
}

// Остановка тренировки
stopButton.addEventListener("click", resetInterface);

// Интеграция с Telegram Web App
if (window.Telegram.WebApp) {
    const user = Telegram.WebApp.initDataUnsafe.user;
    console.log("Пользователь:", user);
}

// Загрузка при загрузке страницы
window.onload = loadWorkouts;
