const cartModel = require('../models/cart.model');
const validationResult = require('express-validator').validationResult

exports.getCart = (req,res,next)=>{
    cartModel.getItemByUser(req.session.userId).then((items)=>{
        res.render('cart',{
            items: items,
            isUser: true,
            validationErrors: req.flash('validationErrors')[0],
            updateDone: req.flash('updateDone')[0],
            isAdmin: req.session.isAdmin
        })
    }).catch(err=> {console.log(err)})
}


exports.postCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.checkItem(req.body.productId).then((item)=>{
            if(item){
                cartModel.editeItem(item._id,{amount:req.body.amount , time: Date.now()}).then(()=>{
                    res.redirect('/cart')
                }).catch(err=> console.log(err))
            }else{
                cartModel.addNewItem({
                    name: req.body.name,
                    price: req.body.price,
                    amount: req.body.amount,
                    productId: req.body.productId,
                    userId: req.session.userId,
                    time: Date.now()
                }).then(()=>{
                    res.redirect('/cart')
                }).catch(err=>{
                    console.log(err)
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}


exports.postSave = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.editeItem(req.body.cartId,{amount:req.body.amount , time: Date.now()}).then(()=>{
            res.redirect('/cart')
            req.flash('updateDone','Update is done')
        }).catch(err=> console.log(err))
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/cart')
    }
}

exports.postDelete = (req,res,next)=>{
    cartModel.deleteItem(req.body.cartId).then(()=>{
        res.redirect('/cart')
    }).catch(err => console.log(err))
}


