const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check

const authProtect = require('./protecter/auth.protect')
const cartController = require('../controller/cart.controller');

router.get('/',authProtect.isAuth,cartController.getCart);

router.post('/',authProtect.isAuth,bodyParser.urlencoded({extended:true}),
check('amount').not().isEmpty().withMessage('amount is required')
.isInt({min: 1}).withMessage('amount must be gratet than 0'),cartController.postCart)


router.post('/save',authProtect.isAuth,bodyParser.urlencoded({extended:true}),
check('amount').not().isEmpty().withMessage('amount is required')
.isInt({min: 1}).withMessage('amount must be gratet than 0'),cartController.postSave);


router.post('/delete',authProtect.isAuth,bodyParser.urlencoded({extended:true}),cartController.postDelete)

module.exports = router;