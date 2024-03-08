let figures = []; // Массив для хранения фигур
const figureSpeed = 0.1; // Скорость движения фигур
let isMousePressed = false; // Флаг, указывающий, удерживается ли клавиша мыши

function draw() {
    let canvas = document.getElementById("imgCanvas");
    let ctx = canvas.getContext("2d");

    // Обновляем координаты фигур с учетом их направления
    for (let i = 0; i < figures.length; i++) {
        figures[i].x += figures[i].xDirection * figureSpeed;
        figures[i].y += figures[i].yDirection * figureSpeed;

        // Проверка столкновения с границами холста
        if (figures[i].x < 0 || figures[i].x > canvas.width) {
            figures[i].xDirection *= -1; // Изменяем направление при столкновении с горизонтальной границей
        }

        if (figures[i].y < 0 || figures[i].y > canvas.height) {
            figures[i].yDirection *= -1; // Изменяем направление при столкновении с вертикальной границей
        }

        // Ограничиваем скорость фигур
        let currentSpeed = Math.sqrt(figures[i].xDirection ** 2 + figures[i].yDirection ** 2);
        if (currentSpeed > figureSpeed) {
            // Нормализуем вектор направления и умножаем на максимальную скорость
            figures[i].xDirection = (figures[i].xDirection / currentSpeed) * figureSpeed;
            figures[i].yDirection = (figures[i].yDirection / currentSpeed) * figureSpeed;
        }
    }

    // Закрашиваем фон светло-бежевым цветом
    ctx.fillStyle = "#f5f5dc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем все сохраненные фигуры с учетом цвета и размера из объекта
    for (let i = 0; i < figures.length; i++) {
        ctx.fillStyle = figures[i].color; // Устанавливаем цвет из объекта фигуры
        ctx.beginPath();
        drawHexagon(ctx, figures[i].x, figures[i].y, figures[i].size); // Используем размер из объекта фигуры
        ctx.fill();
        ctx.strokeStyle = "black"; // Цвет контура
        ctx.stroke(); // Рисуем контур
    }

    // Запускаем следующий кадр анимации
    requestAnimationFrame(draw);
}

function drawHexagon(ctx, x, y, size) {
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (let i = 1; i <= 6; i++) {
        ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 6), y + size * Math.sin(i * 2 * Math.PI / 6));
    }

    ctx.closePath();
}

// Добавляем фигуру при каждом клике
function addFigure(event) {
    let canvas = document.getElementById("imgCanvas");
    let rect = canvas.getBoundingClientRect();

    let posX = event.clientX - rect.left;
    let posY = event.clientY - rect.top;

    // Генерируем рандомный цвет
    let randomColor = getRandomColor();
    
    // Генерируем рандомный размер
    let randomSize = Math.random() * 50 + 20; // Размер от 20 до 70

    // Добавляем случайное направление для фигуры
    let xDirection = 1;
    let yDirection = 1;

    // Добавляем новую фигуру в массив
    figures.push({
        x: posX,
        y: posY,
        xDirection: xDirection,
        yDirection: yDirection,
        color: randomColor,
        size: randomSize
    });
}

// Функция для генерации рандомного цвета в формате rgba
function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let alpha = Math.random(); // Используем случайное значение для прозрачности

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Изменяем обработчик клика для установки/сброса флага удержания клавиши мыши
let canvas = document.getElementById("imgCanvas");
canvas.addEventListener("mousedown", function () {
    isMousePressed = true;
    addFigure(event); // Добавляем фигуру при нажатии клавиши мыши
});

canvas.addEventListener("mouseup", function () {
    isMousePressed = false;
});

// Изменяем обработчик движения мыши, чтобы добавлять фигуру только при удержании клавиши мыши
canvas.addEventListener("mousemove", function (event) {
    if (isMousePressed) {
        addFigure(event);
    }
});

// Запускаем анимацию
requestAnimationFrame(draw);
