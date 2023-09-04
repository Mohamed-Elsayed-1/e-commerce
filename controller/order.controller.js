const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");

const validationResult = require("express-validator").validationResult;

exports.getOrderVerify = (req, res, next) => {
    cartModel.getItemById(req.query.order)
        .then(cartItem => {
            console.log(cartItem)
            res.render("verify-order", {
                cart: cartItem,
                isUser: true,
                isAdmin: req.session.isAdmin,
                validationError: req.flash("validationErrors")[0]
            });
        })
        .catch(err => console.log(err));
};

exports.getOrder = (req, res, next) => {
    orderModel.getOrdersByUser(req.session.userId)
        .then(items => {
            res.render("orders", {
                isUser: true,
                isAdmin: req.session.isAdmin,
                items: items
            });
        })
        .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    if (validationResult(req).isEmpty())
        orderModel.addNewOrder(req.body)
            .then(() => res.redirect("/orders"))
            .catch(err => {
                console.log(err)
            });
    else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/verify-order?order=" + req.body.cartId);
    }
};

exports.postCancel = (req, res, next) => {
    orderModel.cancelOrder(req.body.orderId)
        .then(() => res.redirect("/orders"))
        .catch(err => {
            console.log(err)
        });
};