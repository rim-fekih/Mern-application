const express = require ('express');
let offerCTRL = require('../controllers/offerController');
const router = express.Router();

//ROUTES
router.post('',offerCTRL.create);
router.get('',offerCTRL.get);
router.get('/published',offerCTRL.getPublished);
router.get('/:id',offerCTRL.getById);
router.put('/:id',offerCTRL.update);
router.delete('/:id',offerCTRL.delete);
module.exports = router;