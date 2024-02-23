function draw(event) {
    let canvas = document.getElementById(imgCanvas);
    let ctx = canvas.getContext("2d");
    let rect = canvas.getBoundingClientRect();

    let posX = event.ClientX;
    let posY = event.ClientY;

    ctx.fillStyle = "#00ff00"

    ctx.arc(posX, posY, 50, 0, 2 * Math.PI);

    
}