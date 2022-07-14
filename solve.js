var solveState = 0;
var reverseTree = [];
var boundary = [];
var curReverse;

var solveMethod = 0;
function Solve() {
  if (solveMethod == 0) bfsSolve();
  else if (solveMethod == 1) bestfsSolve();
}

function bfsSolve() {
  // initialize
  if (solveState == 0) {
    curReverse = end;
    reverseTree = [];
    boundary = [];
    for (var i = 0; i < grid.length; i++) {
      reverseTree.push(undefined);
      if (grid[i].status == 0) grid[i].status = 3;
    }
    reverseTree[start] = start;
    boundary.push(start);
    solveState = 1;
  } else if (solveState == 1) {
    // next state boundary
    var newbounbary = [];
    // for all the cells on current boundary
    for (var i = 0; i < boundary.length; i++) {
      // get unexplored neighbours of current cell
      var neighbours = boundary[i].getUnexploredNeighbour();
      // mark current cell as visited
      boundary[i].status = 0;
      // for unexplored cells of current cell
      for (var n = 0; n < neighbours.length; n++) {
        // make the reverse tree
        if (neighbours[n] == end) {
          console.log("hua");
          solveState = 2;
        }
        var curIndex = getIndex(neighbours[n].x, neighbours[n].y);
        if (reverseTree[curIndex] == undefined)
          reverseTree[curIndex] = boundary[i];
        newbounbary.push(neighbours[n]);
        neighbours[n].status = 4;
      }
    }
    boundary = newbounbary;
    if (boundary.length == 0) solveState = 2;
  } else {
    curIndex = getIndex(curReverse.x, curReverse.y);
    if (curReverse == start) {
      mode = 1;
      console.log("solve ended");
      solveState = 0;
      return;
    } else if (curReverse == end) {
      if (reverseTree[curIndex] == undefined) curReverse = start;
      else curReverse = reverseTree[curIndex];
      return;
    }
    //make path from end to start
    curReverse.status = 7;
    curReverse = reverseTree[curIndex];
  }
  //set boundary color
}

var pq = [];
//keep boundary in sorted according to distance
function bestfsSolve() {
  function endDistance(node) {
    //eucledial distance
    return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
  }
  function keepSorted() {
    pq.sort(function (a, b) {
      return endDistance(b) - endDistance(a);
    });
  }
  if (solveState == 0) {
    curReverse = end;
    pq = [];
    pq.push(start);
    start.status = 4;
    reverseTree = [];
    for (var i = 0; i < grid.length; i++) {
      reverseTree.push(undefined);
      if (grid[i].status == 0) grid[i].status = 3;
    }
    reverseTree[start] = start;
    solveState = 1;
  } else if (solveState == 1) {
    var curDist = grid.length;
    do {
      var curNode = pq.pop();
      curDist = endDistance(curNode);
      curNode.status = 0;
      if (curNode == end) {
        solveState = 2;
      }
      var neighbours = curNode.getUnexploredNeighbour();
      for (var i = 0; i < neighbours.length; i++) {
        var curIndex = getIndex(neighbours[i].x, neighbours[i].y);
        if (reverseTree[curIndex] == undefined) reverseTree[curIndex] = curNode;
        // else if()
        pq.push(neighbours[i]);
        neighbours[i].status = 4;
      }
      keepSorted();
    } while (endDistance(pq[pq.length - 1]) == curDist);
  } else if (solveState == 2) {
    curIndex = getIndex(curReverse.x, curReverse.y);
    if (curReverse == start) {
      mode = 1;
      console.log("solve ended");
      solveState = 0;
      return;
    } else if (curReverse == end) {
      if (reverseTree[curIndex] == undefined) curReverse = start;
      else curReverse = reverseTree[curIndex];
      return;
    }
    //make path from end to start
    curReverse.status = 7;
    curReverse = reverseTree[curIndex];
  }
}
