const router = require('express').Router();
const bodyParser = require('body-parser')
const authController = require('../controller/auth.controller')

const authProtect = require('./protecter/auth.protect')

router.get('/signup',authProtect.notAuth,authController.getSignup)
router.post('/signup',authProtect.notAuth,bodyParser.urlencoded({extended:true}),authController.postSignup);

router.get('/login',authProtect.notAuth,authController.getLogin);
router.post('/login',authProtect.notAuth,bodyParser.urlencoded({extended:true}),authController.postLogin);

router.get('/updateuser',authProtect.isAuth,authController.getUpdate);
router.post('/updateuser',authProtect.isAuth,bodyParser.urlencoded({extended:true}),authController.editeUser)

router.all('/logout',authProtect.isAuth,authController.logout)
module.exports = router;