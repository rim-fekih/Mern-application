const express = require ('express');
let notificationCTRL = require('../controllers/notificationController');
const router = express.Router();

//ROUTES
router.post('',notificationCTRL.create);
router.get('',notificationCTRL.get);
router.get('/:id',notificationCTRL.getById);
router.put('/:id',notificationCTRL.update);
router.delete('/:id',notificationCTRL.delete);
module.exports = router;