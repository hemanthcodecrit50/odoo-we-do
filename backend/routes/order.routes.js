const { Router } = require('express');
const { protect } = require('../middlewares/auth');
const { checkoutFromCart, myOrders } = require('../controllers/order.controller');
const router = Router();

router.use(protect);
router.post('/checkout', checkoutFromCart); // creates an order from cart
router.get('/me', myOrders);                // "Previous Purchase" screen

module.exports = router;
