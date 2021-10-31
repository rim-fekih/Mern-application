const express = require ('express');
let productCTRL = require('../controllers/productController');
const router = express.Router();

router.post('',productCTRL.create);
router.get('',productCTRL.get);
router.get('/:id',productCTRL.getById);
router.put('/:id',productCTRL.update);
router.delete('/:id',productCTRL.delete);
module.exports = router;