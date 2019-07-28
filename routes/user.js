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

module.exports = router;