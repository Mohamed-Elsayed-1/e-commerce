const validationResult = require('express-validator').validationResult
const productModel = require('../models/product.model')
const ordersModel = require('../models/order.model')
const authModel = require('../models/auth.model')

exports.getAdd = (req,res,next) =>{
    res.render('add-product',{
        isUser: true,
        validationErrors: req.flash('validationErrors'),
        isAdmin: req.session.isAdmin
    })
}

exports.postAdd = (req,res,next)=>{
    // console.log(req.body,req.file.filename);
    if(validationResult(req).isEmpty()){
        productModel.addProduct(req.body.name,req.body.price,req.body.discription,req.body.amount,req.body.category,req.file.filename)
        .then(()=>{
            res.redirect('/')
        }).catch((err)=> console.log(err))
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/admin/add')
    }
}

exports.getOrders = (req, res, next) => {
    ordersModel.getAllOrders().then(items => {
            res.render('manage-orders', {
                isUser: true,
                isAdmin: true,
                items: items
            });
        }).catch(err => console.log(err));
};

exports.postOrders = (req, res, next) => {
    ordersModel.editOrder(req.body.orderId, req.body.status).then(() => res.redirect("/admin/orders"))
        .catch(err => {
            console.log(err)
        });
};


exports.getAllUsers = (req,res,next)=>{
    authModel.getAllUsers(req.session.userId).then((users)=>{
        res.render('users',{
            isUser: req.session.userId,
            isAdmin: true,
            users: users,
        })
    }).catch(err =>  console.log(err))
}

exports.postDeleteUser = (req,res,next)=>{
    authModel.deletUser(req.body.userId).then(() =>res.redirect('/admin/users'))
    .catch((err) => console.log(err))
}