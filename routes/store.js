const router = require('express').Router();
const storeController = require('../controllers/store');
const isAuth = require('../util/isAuth');
const isAdmin = require('../util/isAdmin');
const {
    check
} = require('express-validator');


router.post('/addproduct', [
    check('title', 'Title field cannot be empty').not().isEmpty(),
    check('image', 'image field cannot be empty').not().isEmpty(),
    check('description', 'description field cannot be empty').not().isEmpty(),
    check('price', 'price field cannot be empty').not().isEmpty().isNumeric().withMessage('Enter a vlid price'),
    check('image', 'Image field cannot be empty').not().isEmpty().isURL().withMessage('Enter a valid image url'),
    check('sizes', 'Sizes field cannot be empty').not().isEmpty(),
    check('details', 'Details field cannot be empty').not().isEmpty()
], isAdmin, storeController.postAddProduct)

router.patch('/editproduct/:productid', [
    check('title', 'Title field cannot be empty').not().isEmpty(),
    check('image', 'image field cannot be empty').not().isEmpty(),
    check('description', 'description field cannot be empty').not().isEmpty(),
    check('price', 'price field cannot be empty').not().isEmpty().isNumeric().withMessage('Enter a vlid price'),
    check('image', 'Image field cannot be empty').not().isEmpty().isURL().withMessage('Enter a valid image url'),
    check('sizes', 'Sizes field cannot be empty').not().isEmpty(),
    check('details', 'Details field cannot be empty').not().isEmpty()
], isAdmin, storeController.editProduct)


router.delete('/:productid', isAdmin, storeController.deleteProduct)
router.get('/', storeController.getProducts)
router.get('/:productid', storeController.getProduct)
module.exports = router;