function Cell(x, y, status) {
  this.x = x;
  this.y = y;
  /**
   * 0=clear
   * 1=walls
   * 3=unexplored
   * 4=current
   * 5=start
   * 6=end
   * 7=revereTree
   */
  this.status = status;

  this.show = () => {
    var x = this.x * w;
    var y = this.y * w;
    this.visited = false;
    this.walls = [true, true, true, true];
    stroke(100);
    if (this.status == 0) noFill(); //clear
    else if (this.status == 1) fill(0, 0, 0, 255); //walls
    else if (this.status == 3) fill(50, 50, 50, 100); //unexplored
    else if (this.status == 4) fill(40, 255, 60, 100); //current
    else if (this.status == 5) fill(0, 255, 0, 255); //start
    else if (this.status == 6) fill(0, 100, 0, 255); //end
    else if (this.status == 7) fill(0, 0, 255, 200); //reverseTree
    rect(x, y, w, w);
  };

  this.showThin = () => {
    var x = this.x * w;
    var y = this.y * w;
    stroke(0);
    if (this.walls[0]) line(x, y, x + w, y); //top
    if (this.walls[1]) line(x + w, y, x + w, y + w); //right
    if (this.walls[2]) line(x, y + w, x + w, y + w); //bottom
    if (this.walls[3]) line(x, y, x, y + w); //left
    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  };
  this.highlightCurrentCell = () => {
    var x = this.x * w;
    var y = this.y * w;
    noStroke();
    fill(0, 0, 200);
    rect(x, y, w, w);
  };
  this.getRandNeighboursThin = () => {
    var neighbours = [];
    var top = grid[getIndex(this.x, this.y - 1)];
    var right = grid[getIndex(this.x + 1, this.y)];
    var bottom = grid[getIndex(this.x, this.y + 1)];
    var left = grid[getIndex(this.x - 1, this.y)];

    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);
    console.log(neighbours);
    if (neighbours.length > 0) {
      var choosenIndex = floor(random(0, neighbours.length));

      return neighbours[choosenIndex];
    } else return undefined;
  };
  this.getNeighbourWalls = () => {
    var neighbours = [];
    var top = grid[getIndex(this.x, this.y - 1)];
    var right = grid[getIndex(this.x + 1, this.y)];
    var bottom = grid[getIndex(this.x, this.y + 1)];
    var left = grid[getIndex(this.x - 1, this.y)];

    if (top && top.status == 1) neighbours.push(top);
    if (right && right.status == 1) neighbours.push(right);
    if (bottom && bottom.status == 1) neighbours.push(bottom);
    if (left && left.status == 1) neighbours.push(left);
    return neighbours;
  };
  this.getRemovableNeighbourWalls = () => {
    var neighbours = [];
    var top = grid[getIndex(this.x, this.y - 1)];
    var right = grid[getIndex(this.x + 1, this.y)];
    var bottom = grid[getIndex(this.x, this.y + 1)];
    var left = grid[getIndex(this.x - 1, this.y)];

    if (top && top.status == 1 && top.isRemovable()) neighbours.push(top);
    if (right && right.status == 1 && right.isRemovable())
      neighbours.push(right);
    if (bottom && bottom.status == 1 && bottom.isRemovable())
      neighbours.push(bottom);
    if (left && left.status == 1 && left.isRemovable()) neighbours.push(left);
    return neighbours;
  };
  this.isRemovable = () => {
    var top = grid[getIndex(this.x, this.y - 1)];
    var right = grid[getIndex(this.x + 1, this.y)];
    var bottom = grid[getIndex(this.x, this.y + 1)];
    var left = grid[getIndex(this.x - 1, this.y)];

    var numOpenCells = 0;
    if (top && top.status == 0) numOpenCells += 1;
    if (right && right.status == 0) numOpenCells += 1;
    if (bottom && bottom.status == 0) numOpenCells += 1;
    if (left && left.status == 0) numOpenCells += 1;
    return numOpenCells <= 1;
  };
  this.countWalls = () => {
    var num = 0;
    for (var j = -1; j <= 1; j++) {
      for (var i = -1; i <= 1; i++) {
        if (i != 0 || j != 0) {
          var cell = grid[getIndex(this.x + i, this.y + j)];
          if (cell && cell.status == 1) {
            num += 1;
          }
        }
      }
    }
    return num;
  };
  this.getUnexploredNeighbour = () => {
    var neighbours = [];
    var top = grid[getIndex(this.x, this.y - 1)];
    var right = grid[getIndex(this.x + 1, this.y)];
    var bottom = grid[getIndex(this.x, this.y + 1)];
    var left = grid[getIndex(this.x - 1, this.y)];

    if (top && (top.status == 3 || top.status == 6)) neighbours.push(top);
    if (right && (right.status == 3 || right.status == 6))
      neighbours.push(right);
    if (bottom && (bottom.status == 3 || bottom.status == 6))
      neighbours.push(bottom);
    if (left && (left.status == 3 || left.status == 6)) neighbours.push(left);
    return neighbours;
  };
}

// get 1D index with 2D index
function getIndex(x, y) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
  return x + y * cols;
}
