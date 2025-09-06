const { Router } = require('express');
const { protect } = require('../middleware/auth');
const { me, updateMe } = require('../controllers/user.controller');
const router = Router();

router.get('/me', protect, me);
router.patch('/me', protect, updateMe);

module.exports = router;
