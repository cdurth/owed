var express = require('express');

var controllers 		= {};
controllers.sheets 		= require('./sheets.controller');
controllers.expenses 	= require('./expenses.controller');
controllers.friends 	= require('./friends.controller');
controllers.stats 		= require('./stats.controller');

var router = express.Router();

//Routing URLs
router.post('/sheets', controllers.sheets.create);
router.get('/sheets',controllers.sheets.all);
router.get('/sheets/:id', controllers.sheets.read);
router.put('/sheets', controllers.sheets.update);

//sheet_id must always be present
router.post('/friends', controllers.friends.create);
router.get('/friends/:sheet_id', controllers.friends.readAllFromSheet);
router.get('/friends/:sheet_id/:id', controllers.friends.read);
router.put('/friends', controllers.friends.update);
router.delete('/friends/:sheet_id/:id', controllers.friends.delete);

router.post('/expenses', controllers.expenses.create);
router.get('/expenses/:sheet_id', controllers.expenses.readAllFromSheet);
router.get('/expenses/:sheet_id/:id', controllers.expenses.read);
router.put('/expenses', controllers.expenses.update); //todo to finish
router.delete('/expenses/:sheet_id/:id', controllers.expenses.delete);

router.get('/stats', controllers.stats.read);

module.exports = router;
