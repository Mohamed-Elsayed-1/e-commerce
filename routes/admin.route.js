const router = require('express').Router();
const check = require('express-validator').check;
const multer = require('multer')
const bodyParser = require("body-parser");

const adminController = require('../controller/admin.controller')
const adminProtect = require('./protecter/admin.protect')

router.get('/add',adminProtect,adminController.getAdd);
router.post('/add',adminProtect,multer({
    storage: multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'images')
        },
        filename: (req,file,cb)=>{
            cb(null,Date.now()+'-'+ file.originalname)
        }
    }),
}).single('image'),check('image').custom((value,{req})=>{
    if(req.file) return true;
    else 'image is required'
}),check('name').not().isEmpty().isString().withMessage('name is invalid')
,check('price').not().isEmpty().withMessage('price is invalid')
,check('discription').not().isEmpty().isString().withMessage('discription is invalid')
,check('category').not().isEmpty().withMessage('category is invalid')
,check('amount').not().isEmpty().withMessage('amount is invalid')
,adminController.postAdd);

router.get("/orders", adminProtect, adminController.getOrders);

router.post(
    "/orders",
    adminProtect,
    bodyParser.urlencoded({ extended: true }),
    adminController.postOrders
);

router.get("/users", adminProtect, adminController.getAllUsers);
router.post("/users", adminProtect, bodyParser.urlencoded({ extended: true }),adminController.postDeleteUser);

module.exports = router;    