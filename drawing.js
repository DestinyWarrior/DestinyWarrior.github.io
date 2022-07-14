/**
 * this file add fun=ctionality of drawing/removing walls on the canvas
 */

var nodeMovement = 0;
// make Walls
function drawWall() {
  //get id of current cell
  var currentCell = grid[getIndex(floor(mouseX / w), floor(mouseY / w))];

  //in drawing or editing mode
  if (mode <= 1) {
    // current location is a valid location
    if (currentCell) {
      //if current node is start or end or currently moving start of end node
      //so dont make wall rather move the node
      if (currentCell == start || currentCell == end || nodeMovement > 0) {
        if (currentCell == start) {
          nodeMovement = 1;
        } else if (currentCell == end) {
          nodeMovement = 2;
        }
        moveNode(nodeMovement);
      }
      //currently we are trying to make a wall
      else currentCell.status = mode;
    }
  }
}

// (inbuild EventListner) finish the movement of edge nodes
function mouseReleased() {
  nodeMovement = 0;
}

// (inbuild EventListner) make/remove walls while Drag clicking
function mousePressed() {
  drawWall();
}

// (inbuild EventListner) make/remove walls with single click
function mouseDragged() {
  drawWall();
}

// move current or end node
function moveNode(id) {
  // if call came from randomize button then randomize
  if (id == -1) {
    if (start != undefined) start.status = 0;
    if (end != undefined) end.status = 0;
    var randIndex = floor(random(0, grid.length));
    start = grid[randIndex];
    var randIndex = floor(random(0, grid.length));
    end = grid[randIndex];
    start.status = 5;
    end.status = 6;
  }
  // call came to move the node
  else {
    // get coordinate of current cell
    var currentCell = grid[getIndex(floor(mouseX / w), floor(mouseY / w))];
    // if its valid
    if (currentCell) {
      // make old cell as open cell
      start.status = 0;
      end.status = 0;
      // depending on the request change the node to new node
      if (id == 1) {
        start = currentCell;
      } else if (id == 2) {
        end = currentCell;
      }
      // assign new node
      start.status = 5;
      end.status = 6;
    }
  }
}
