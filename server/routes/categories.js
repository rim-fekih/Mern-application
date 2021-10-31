const express = require ('express');
let categoryCTRL = require('../controllers/categoryController');
const router = express.Router();

//ROUTES
router.post('',categoryCTRL.create);
router.get('',categoryCTRL.get);
router.get('/:id',categoryCTRL.getById);
router.put('/:id',categoryCTRL.update);
router.delete('/:id',categoryCTRL.delete);
module.exports = router;