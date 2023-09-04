const productsModel = require('../models/product.model')


exports.getHome = (req,res,next)=>{

    let category = req.query.category;
    let productPromise ;
    if(category && category!=='all') productPromise=productsModel.getProductsByCategory(category);
    else productPromise=productsModel.getAllProducts();

    productPromise.then(products=>{
        res.render('index',{
            products: products,
            isUser: req.session.userId,
            validationErrors: req.flash('validationErrors')[0],
            isAdmin: req.session.isAdmin
        })
    })
}