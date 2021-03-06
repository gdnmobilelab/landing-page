// Set vars
var stars = [],
    numOfStars = 30,
    canvas,
    loop,
    image = new Image();

function  drawScreen () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < numOfStars; i++) {
        var star = stars[i];
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(star.angle * Math.PI/180);
        context.translate(image.width / -2, image.height / -2);
        star.x += star.speed * Math.cos(Math.PI/180);
        star.y += star.speed *  Math.sin(Math.PI/180);
        context.drawImage(image, star.x, star.y);
        context.restore();

        if (star.x > canvas.width + image.width || star.y > canvas.height + image.height) {
            newStar(i);
        }
    }
}

function generateX() {
    var x = Math.random() * canvas.width;
    if (x > canvas.width / 2) {
        x += canvas.width;
    } else if (x < canvas.width / 2) {
        x -= canvas.width;
    }
    return x;
}

function generateY() {
    var y = Math.random() * canvas.height;
    if (y > canvas.height / 2) {
        y -= canvas.height;
    } else if (y < canvas.height / 2) {
        y += canvas.height;
    }
    return y;
}

function newStar(i) {
    var star = new Object();
    star.x = generateX();
    star.y = generateY();
    star.speed = .2 + Math.random();
    star.angle = Math.random() * 360;
    stars[i] = star;
}

function initStars() {
    numOfStars = Math.floor(canvas.width / 45);

    for (var i = 0; i < numOfStars; i++) {
        newStar(i);
        stars[i].x = Math.random() * canvas.height;
        stars[i].y = Math.random() * canvas.width;
    }
}

function setLoop() {
    loop = window.setTimeout(setLoop, 20);
    drawScreen();
}

function clearLoop() {
    window.clearTimeout(loop);
}

function init() {
    canvas = document.getElementsByClassName("canvas")[0];
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context = canvas.getContext("2d");
    image.src = "assets/images/star.png";

    initStars();
    setLoop();
}

init();

window.addEventListener('resize', function(){
    clearLoop();
    init();
}, true);
