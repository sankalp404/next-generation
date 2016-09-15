var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Next Generation API',
        subtitle: 'This is a simple game of life API, that returns an array of live cells for the next generation.',
        heading1: 'The rules for calculating generation G + 1 given generation G are as follows:',
        heading2: 'Count the number of \'on\' cells surrounding each cell on the board.',
        rule1: 'If the number of \'on\' cells is less than two, that cell is \'off\' for the next generation.',
        rule2: 'If the number of \'on\' cells is two, that cell stays the same.',
        rule3: 'If the number of \'on\' cells is three, the cell becomes \'on\'.',
        rule4: 'If the number of cells is greater than three, the cell becomes \'off\'.',
        liveCells: 'Current Live Cells',
        getNextGeneration: 'Get Next Generation',
        columns: 'Enter number of columns',
        rows: 'Enter number of rows'
    });
});

module.exports = router;
