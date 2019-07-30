const router = require('express').Router();
const userController = require('../controllers/user');
const isAuth = require('../util/isAuth');
const {
    check
} = require('express-validator');

router.get('/', isAuth, userController.getUser)
router.delete('/', isAuth, userController.deleteUser)
router.patch('/', [
    check('name', 'Name field cannot be empty').not().isEmpty()
], isAuth, userController.editUser);


router.post('/addtocart/:productid', isAuth, userController.addToCart)
router.patch('/updateqty/:productid', isAuth, userController.updateQty)
router.patch('/removefromcart/:productid', isAuth, userController.removeFromCart)

//add-address
router.post('/addaddress', [
    check('roomno', 'RoomNo field cannot be empty').not().isEmpty(),
    check('hostel', 'Hostel field cannot be empty').not().isEmpty(),
    check('block', 'Block field cannot be empty').not().isEmpty(),
    check('name', 'Name field cannot be empty').not().isEmpty(),
    check('contact', 'Contact field cannot be empty').not().isEmpty()
], isAuth, userController.postAddAddress)
//edit-address
router.patch('/editaddress/:addressid', [
    check('roomno', 'RoomNo field cannot be empty').not().isEmpty(),
    check('hostel', 'Hostel field cannot be empty').not().isEmpty(),
    check('block', 'Block field cannot be empty').not().isEmpty(),
    check('name', 'Name field cannot be empty').not().isEmpty(),
    check('contact', 'Contact field cannot be empty').not().isEmpty()
], isAuth, userController.editAddress)
//remove-address
router.patch('/removeaddress/:addressid', isAuth, userController.removeAddress)
//contact-messege
router.post('/messege', [
    check('name', 'Name field cannot be empty').not().isEmpty(),
    check('phone', 'Phone field cannot be empty').not().isEmpty(),
    check('email', 'Email field cannot be empty').not().isEmpty(),
    check('messege', 'Messege field cannot be empty').not().isEmpty()
], userController.postMessage)



//checkout
//after intgrating paymentgateway
////get-all-orders
//cancelorders
module.exports = router;