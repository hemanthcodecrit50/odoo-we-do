const { Router } = require('express');
const { protect } = require('../middleware/auth');
const { getCart, addToCart, updateQty, removeFromCart, clearCart } = require('../controllers/cart.controller');
const router = Router();

router.use(protect);
router.get('/', getCart);
router.post('/add', addToCart);
router.patch('/qty', updateQty);
router.delete('/item/:productId', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;
