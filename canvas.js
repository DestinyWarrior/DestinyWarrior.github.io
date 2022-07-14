//div in which the canvas exists
const area = document.getElementById("main");
// extract height and width of the area

//size of single cell
var w = 30;
//number of rows and columns in a grid
var rows, cols;
var start, end;
/**
 * 0=erase
 * 1=draw
 * 2=generate
 * 3=generating in progress
 * 4=solve
 * 5=game of life
 */
var mode = 1;
var generatorMethod = 1;
// array to store all grid Cell objects
var grid = [];

function setBoard(status, id) {
  /**
   * id=1->norestriction
   * id=0->dont change start and end
   */
  console.log("board set to ", status, id);
  for (var i = 0; i < grid.length; i++) {
    if (id == 0 && (grid[i] == start || grid[i] == end)) {
      continue;
    }
    grid[i].status = status;
  }
  if (id == 1) {
    start = undefined;
    end = undefined;
  }
}

// make new grid on window resize
function windowResized() {
  initialize(1);
}

// (inbuild) initialize parameters
function initialize(setupdone) {
  var areaHeight = area.offsetHeight;
  var areaWidth = area.offsetWidth;
  cols = floor((areaWidth - 20) / w);
  rows = floor((areaHeight - 30) / w);

  if (setupdone == 0) {
    createCanvas(cols * w, rows * w);
    setupdone = 1;
  } else {
    resizeCanvas(cols * w, rows * w);
  }

  grid = [];
  gridCopy = [];
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      grid.push(new Cell(x, y, 0));
    }
  }
  for (var i = 0; i < grid.length; i++) {
    gridCopy.push(1);
  }
  start = grid[0];
  end = grid[grid.length - 1];
  start.status = 5;
  end.status = 6;
  radioSelected();
}

function setup() {
  frameRate(24);
  initialize(0);
}

//for prims maze generation algo
var walls;
var cur;

// refresh and draw new frames
function draw() {
  background(255);
  if ((mode == 2 || mode == 3) && generatorMethod == 2) {
    for (var i = 0; i < grid.length; i++) {
      grid[i].showThin();
    }
  } else
    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }
  if (mode == 2 || mode == 3) {
    if (generatorMethod == 0) primGeneration();
    else if (generatorMethod == 1) dfsGeneration();
    else if (generatorMethod == 2) thinBoundaryMaze();
  } else if (mode == 5) gameOfLife();
  else if (mode == 4) Solve();
}

function primGeneration() {
  //generate maze
  //initialze
  if (mode == 2) {
    setBoard(1);
    cur = start;
    cur.status = 0;
    walls = start.getNeighbourWalls();
    mode = 3;
  } else if (walls.length > 0) {
    var choosenIndex = floor(random(0, walls.length));
    if (walls[choosenIndex].isRemovable()) {
      walls[choosenIndex].status = 0;
      var recivedWalls = walls[choosenIndex].getNeighbourWalls();
      for (var i = 0; i < recivedWalls.length; i++) {
        walls.push(recivedWalls[i]);
      }
    }
    walls.splice(choosenIndex, 1);
  } else {
    mode = 1;
  }
}

var stack = [];
function dfsGeneration() {
  if (mode == 2) {
    stack = [];
    setBoard(1, 0);
    cur = start;
    console.log(cur);
    stack.push(cur);
    mode = 3;
  } else if (stack.length > 0) {
    console.log(cur);

    cur.status = 0;
    var recivedWalls = cur.getRemovableNeighbourWalls();
    if (recivedWalls.length == 0) {
      cur = stack.pop();
    } else {
      var choosenIndex = floor(random(0, recivedWalls.length));
      recivedWalls[choosenIndex].status = 0;
      cur = recivedWalls[choosenIndex];
      stack.push(cur);
    }
    cur.status = 4;
  } else {
    cur.status = 0;
    start.status = 5;
    mode = radioSelected();
  }
}
