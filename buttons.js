// clear the current board
const clearButton = document.getElementById("clearBoard");
clearButton.addEventListener("click", () => {
  solveState = 0;
  radioSelected();
  setBoard(0, 1);
});

// generate maze ...very slow
const generateMazeButton = document.getElementById("GenerateButton");
generateMazeButton.addEventListener("click", () => {
  mode = 2;
});

// radio button
const modeSelectorRadio = document.querySelectorAll("input[name='mode']");
modeSelectorRadio.forEach((modeSelectorRadio) => {
  modeSelectorRadio.addEventListener("change", () => {
    radioSelected();
  });
});

const getNode = document.getElementById("getNode");
getNode.addEventListener("click", () => {
  moveNode(-1);
});

const life = document.getElementById("startGame");
life.addEventListener("click", () => {
  mode = 5;
});

function radioSelected() {
  var selected = document.querySelector("input[name='mode']:checked").value;
  mode = parseInt(selected);
}

const range = document.getElementById("cellWidth");
range.oninput = () => {
  w = parseInt(range.value);
  initialize();
};

const solveMethodElement = document.getElementById("solveMethod");
const solveCall = document.getElementById("solveButton");
solveCall.addEventListener("click", () => {
  mode = 4;
  solveMethod = parseInt(solveMethodElement.value);
});
