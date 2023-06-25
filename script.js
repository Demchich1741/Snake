const canvas = document.getElementById("game");
const board_ctx = canvas.getContext("2d");

const grid = 16;

let count = 0;
let score = 0;

let snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  body: [],

  maxBody: 4,
};

let food = {
  x: 320,
  y: 320,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;

  board_ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.body.unshift({ x: snake.x, y: snake.y });

  if (snake.body.length > snake.maxBody) {
    snake.body.pop();
  }

  board_ctx.fillStyle = "red";
  board_ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

  board_ctx.fillStyle = "black";
  board_ctx.font = "10px Arial";
  board_ctx.fillText("Score: " + score, 10, 20);

  board_ctx.fillStyle = "green";

  snake.body.forEach(function (body, index) {
    board_ctx.fillRect(body.x, body.y, grid - 1, grid - 1);

    if (body.x === food.x && body.y === food.y) {
      snake.maxBody++;
      score++;
      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
    }

    for (let i = index + 1; i < snake.body.length; i++) {
      if (body.x === snake.body[i].x && body.y === snake.body[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.body = [];
        snake.maxBody = 4;
        snake.dx = grid;
        snake.dy = 0;
        food.x = getRandomInt(0, 25) * grid;
        food.y = getRandomInt(0, 25) * grid;
        score = 0;
      }
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);