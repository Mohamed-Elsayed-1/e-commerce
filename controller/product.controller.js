const productsModel = require('../models/product.model');

exports.getProduct=(req,res,next)=>{
    productsModel.getFirstProduct().then(product=>{
        res.render('product',{
            product: product,
            isUser: req.session.userId,
            validationErrors: req.flash('validationErrors')[0],
            isAdmin: req.session.isAdmin
        })
    })
}

exports.getProductById= (req,res,next)=>{
    let id = req.params.id;
    productsModel.getProductById(id).then(product =>{
        res.render('product',{
            product: product,
            isUser: req.session.userId,
            validationErrors: req.flash('validationErrors')[0],
            isAdmin: req.session.isAdmin
        })
    })
}