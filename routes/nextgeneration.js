var express = require('express');
var router = express.Router();

/* GET nextgen listing. */
router.get('/', function(req, res) {

  var cells = {};
  var columns = parseInt(req.query.M, 10);
  var rows = parseInt(req.query.N, 10);
  var liveCells = req.query.liveCells;

  for(var i = 0; i < liveCells.length; i++ ){
    var cell = [parseInt(liveCells[i][0]), parseInt(liveCells[i][1])];

    // Get all the neighbors for the live cell and process them.
    var neighbors = getNeighbors(cell, rows, columns);
    for(var j = 0; j < neighbors.length; j++){
      var neighborCell = [neighbors[j][0],neighbors[j][1]];
      processCell(neighborCell, cells, false, 1);
    }
    // After processing the neighbors, process the live cell as well.
    processCell(cell, cells, true, 0);
  }

  res.header('Content-type','application/json');
  res.header('Charset','utf8');
  res.send(req.query.callback + '(' + JSON.stringify(getNextGeneration(cells)) + ');');
});


function processCell(cell, cells, alive, count) {
  if(cell in cells){
    if(alive){
      cells[cell].alive = true;
    }
    cells[cell].neighbors += count;
  }else{
    cells[cell] = { alive: alive,
                    neighbors: count}
  }
}

function getNeighbors(cell, columns, rows) {
  var col = cell[0];
  var row = cell[1];
  var maxCol = columns - 1;
  var maxRow = rows - 1;
  var neighbors = [];

  if(col > maxCol || row > maxRow){
    return neighbors;
  }
  // Left neighbor column
  if(col > 0){
    neighbors.push([col-1, row]);
    if(row > 0){
      neighbors.push([col-1, row-1]);
    }
    if(row < maxRow){
      neighbors.push([col-1, row+1]);
    }
  }
  // Right neighbor column
  if(col < maxCol){
    neighbors.push([col+1,row]);
    if(row > 0){
      neighbors.push([col+1, row-1]);
    }
    if(row < maxRow){
      neighbors.push([col+1, row+1]);
    }
  }
  // Top neighbor
  if(row > 0){
    neighbors.push([col, row-1]);
  }
  // Bottom neighbor
  if(row < maxRow){
    neighbors.push([col, row+1]);
  }

  return neighbors;
}

function getNextGeneration(cells) {
  var liveCells = [];
  for(var prop in cells){
    var cell = cells[prop];
    if(cell.neighbors == 3 || (cell.alive && cell.neighbors == 2)) {
      var location = prop.split(',');
      liveCells.push([Number(location[0]), Number(location[1])]);
    }
  }
  return liveCells.sort();
}

module.exports = router;
