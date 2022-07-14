function thinBoundaryMaze() {
  if (mode == 2) {
    stack = [];
    setBoard(1);
    cur = grid[0];
    stack.push(cur);
    mode = 3;
  } else if (stack.length > 0) {
    // console.log(current);
    cur.visited = true;
    if (cur) cur.highlightCurrentCell();
    var next = cur.getRandNeighboursThin();

    if (next != undefined) {
      //remove required wall
      removeWalls(cur, next);
      //push to stack
      stack.push(cur);
      //go to that cell
      cur = next;
    } else if (stack.length > 0) {
      //backtrack
      cur = stack.pop();
    }
  } else {
    mode = 1;
  }
}

function removeWalls(cur, next) {
  var dx = cur.x - next.x;
  var dy = cur.y - next.y;
  if (dx == 1) {
    cur.walls[3] = false;
    next.walls[1] = false;
  } else if (dx == -1) {
    cur.walls[1] = false;
    next.walls[3] = false;
  } else if (dy == 1) {
    cur.walls[0] = false;
    next.walls[2] = false;
  } else if (dy == -1) {
    cur.walls[2] = false;
    next.walls[0] = false;
  }
}
