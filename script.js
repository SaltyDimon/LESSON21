function draw(event) {
    let canvas = document.getElementById(imgCanvas);
    let ctx = canvas.getContext("2d");
    let rect = canvas.getBoundingClientRect();

    let posX = event.ClientX - rect.left;
    let posY = event.ClientY - rect.top;

    ctx.fillStyle = "#00ff00"

    ctx.beginPath();

    ctx.arc(posX, posY, 50, 0, 2 * Math.PI);

    ctx.fill()


}