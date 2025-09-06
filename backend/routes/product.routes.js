const { Router } = require('express');
const { protect } = require('../middlewares/auth');
const { list, getOne, create, update, remove } = require('../controllers/product.controller');
const router = Router();

router.get('/', list);                // feed + search + category filter
router.get('/:id', getOne);           // product detail
router.post('/', protect, create);    // add new product
router.patch('/:id', protect, update); // edit product
router.delete('/:id', protect, remove); // delete product

module.exports = router;
