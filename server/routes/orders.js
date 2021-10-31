const express = require ('express');
let orderCTRL = require('../controllers/orderController');
const router = express.Router();

//ROUTES
router.post('',orderCTRL.create);
router.get('',orderCTRL.get);
router.get('/:id',orderCTRL.getById);
router.put('/:id',orderCTRL.update);
router.delete('/:id',orderCTRL.delete);
module.exports = router;