const wall = document.getElementById("wall");
const COLORS = [
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
  "#FF9671",
  "#FFC75F",
  "#F9F871",
  "#007ED9",
  "#0082C1",
  "#9270D3",
  "#007F93",
  "#007660"
];

const BOX_HEIGHT = (wall.clientHeight * 20) / 100;

class Box {
  constructor(lineIdx, width, left, color, height) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.lineIdx = lineIdx;
    this.color = color
  }

  top() {
    return this.lineIdx * this.height;
  }

  createBox() {
    const box = document.createElement("div");
    box.classList.add("box");

    box.style.width = this.width + 'px';
    box.style.height = this.height + 'px';
    box.style.top = this.top() + 'px';
    box.style.left = this.left + 'px';
    box.style.border = "1px solid black";
    box.style.backgroundColor = this.color;

    return box;
  }
}

function fillWall(lines) {
  lines.forEach((line, lineIdx) => {
    line.items.forEach((item) => {
      const CBox = new Box(lineIdx, item.width, item.left, item.color, BOX_HEIGHT);
      wall.appendChild(CBox.createBox());
    });
  });
}

function getLines() {
  const lines = [];
  const linesQuentity = wall.clientHeight / BOX_HEIGHT;

  for (let i = 0; i < linesQuentity; i++) {
    lines.push({
      id: i + 1,
      items: setItems(getWidthes()),
    });
  }

  return lines;
}

function getColor() {
    const idx = Math.floor(Math.random() * COLORS.length)
    return COLORS[idx]
}

function setItems(array) {
  const result = array.map((v, i) => {
    let leftCoord;

    if (i === 0) {
      leftCoord = 0;
    } else {
      const previousWidthes = array.slice(0, i);
      leftCoord = previousWidthes.reduce((a, c) => {
        return a + c;
      }, 0);
    }

    return {
      left: leftCoord,
      width: v,
      color: getColor()
    };
  });

  return result;
}

function getWidthes() {
  let reminder = wall.clientWidth;

  const max = (wall.clientWidth * 25) / 100;
  const min = (wall.clientWidth * 10) / 100;

  const widthes = [];

  while (reminder > 0) {
    const randomWidth = Math.random() * (max - min) + min;

    if (reminder - randomWidth > 0) {
      widthes.push(randomWidth);
      reminder = reminder - randomWidth;
    } else {
      widthes.push(Math.floor(reminder));
      reminder = 0;
    }
  }

  return widthes;
}

window.addEventListener('resize', () => fillWall(getLines()))

fillWall(getLines());
