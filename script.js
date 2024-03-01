let figures = []; // Массив для хранения фигур
const figureSpeed = 0.05; // Скорость движения фигур

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
    }

    // Закрашиваем фон светло-бежевым цветом
    ctx.fillStyle = "#f5f5dc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем все сохраненные фигуры с полупрозрачностью
    for (let i = 0; i < figures.length; i++) {
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.beginPath();
        drawHexagon(ctx, figures[i].x, figures[i].y, 50);
        ctx.fill();
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

    // Добавляем случайное направление для фигуры
    let xDirection = 1;
    let yDirection = 1;

    // Добавляем новую фигуру в массив
    figures.push({
        x: posX,
        y: posY,
        xDirection: xDirection,
        yDirection: yDirection
    });
}

// Добавляем обработчик кликов для добавления фигур
let canvas = document.getElementById("imgCanvas");
canvas.addEventListener("click", addFigure);
canvas.addEventListener("mousemove", addFigure);
// Запускаем анимацию
requestAnimationFrame(draw);