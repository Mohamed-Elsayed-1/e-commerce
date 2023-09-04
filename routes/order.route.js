const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const orderController = require("../controller/order.controller");
const authProtect = require("./protecter/auth.protect");

router.get("/verify-order", authProtect.isAuth, orderController.getOrderVerify);

router.get("/orders", authProtect.isAuth, orderController.getOrder);

router.post(
    "/orders",
    authProtect.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check("address")
        .not()
        .isEmpty()
        .withMessage("address is required"),
    orderController.postOrder
);

router.post(
    "/orders/cancel",
    authProtect.isAuth,
    bodyParser.urlencoded({ extended: true }),
    orderController.postCancel
);

module.exports = router;