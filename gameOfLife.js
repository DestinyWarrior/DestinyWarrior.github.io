/**
 * formed of John Conway in 1970.
 * 
 */
var gridCopy = [];
function gameOfLife() {
  for (var i = 0; i < grid.length; i++) {
    num = grid[i].countWalls();
    if (grid[i].status == 1) {
      if (num < 2) gridCopy[i] = 0;
      else if (num <= 3) gridCopy[i] = 1;
      else gridCopy[i] = 0;
    } else {
      if (num == 3) gridCopy[i] = 1;
      else gridCopy[i] = 0;
    }
  }
  for (var i = 0; i < grid.length; i++) {
    grid[i].status = gridCopy[i];
  }
}
