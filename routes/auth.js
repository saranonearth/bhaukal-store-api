const router = require('express').Router();
const authController = require('../controllers/auth');
const {
    check
} = require('express-validator');

router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email field cannot be empty').not().isEmpty().isEmail().withMessage('Enter a valid email'),
    check('password').not().isEmpty().withMessage('Password field cannot be empty')
    .isLength({
        min: 6
    }).withMessage('Must be at lest 6 characters long')
], authController.postSignup)

router.post('/signin', [
    check('email', 'Enter a valid email address').not().isEmpty(),
    check('password').not().isEmpty().withMessage('Password field cannot be empty')

], authController.postSignin)


module.exports = router;