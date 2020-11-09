const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");
xPos = 10;
yPos = 10;
appleX = 5;
appleY = 5;
tailSize = 5;
trail = [];
gridSize = 20;
tileCount = 20;
velocityX = 0;
velocityY = 0;
numX = 0;
numY = 0;
flag = false;
const onKeyPress = (e) => {
  if (e.keyCode === 37 && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  if (e.keyCode === 38 && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  if (e.keyCode === 39 && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  if (e.keyCode === 40 && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
};
document.addEventListener("keydown", onKeyPress);

const reset = () => {
  xPos = 10;
  yPos = 10;
  appleX = 5;
  appleY = 5;
  tailSize = 5;
  trail = [];
  gridSize = 20;
  tileCount = 20;
  velocityX = 0;
  velocityY = 0;
  numX = 0;
  numY = 0;
  flag = false;
  
};
const drawRect = (xPos, yPos, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(xPos, yPos, w, h);
};

const drawText = (text, xPos, yPos, color) => {
  ctx.fillStyle = color;
  ctx.font = "20px sans-serif";
  ctx.fillText(text, xPos, yPos);
};

const update = () => {
  xPos += velocityX;
  yPos += velocityY;

  if (xPos < 0) {
    xPos = tileCount - 1;
  }

  if (yPos < 0) {
    yPos = tileCount - 1;
  }

  if (xPos > tileCount - 1) {
    xPos = 0;
  }

  if (yPos > tileCount - 1) {
    yPos = 0;
  }

  trail.forEach((element) => {
    if (xPos === element.xPos && yPos === element.yPos) {
      reset();
    }
  });
  trail.push({ xPos: xPos, yPos: yPos });

  while (trail.length > tailSize) {
    trail.shift();
  }

  if (appleX === xPos && appleY == yPos) {
    tailSize++;
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
  }
};

const render = () => {
  drawRect(0, 0, cvs.width, cvs.height, "black");

  drawText(tailSize - 5, 20, 40, "white");

  trail.forEach((element) => {
    drawRect(
      element.xPos * gridSize,
      element.yPos * gridSize,
      gridSize - 5,
      gridSize - 5,
      "green"
    );
  });

  drawRect(
    appleX * gridSize,
    appleY * gridSize,
    gridSize - 5,
    gridSize - 5,
    "red"
  );
};

const game = () => {
  update();
  render();
};

const fps = 15;
setInterval(game, 1000 / fps);
