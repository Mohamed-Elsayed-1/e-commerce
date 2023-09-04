const mongoose = require("mongoose");

const cartModel = require("./cart.model");

const DB_URL = "mongodb://127.0.0.1:27017/souqDB";

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
});

const Order = mongoose.model("order", orderSchema);

exports.addNewOrder = data => {
    return new Promise((resolve, reject) => {
        cartModel
            .deleteItem(data.cartId)
            .then(() => mongoose.connect(DB_URL))
            .then(() => {
                data.time = Date.now();
                let order = new Order(data);
                return order.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getOrdersByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
                return Order.find({ userId: userId },{},{ sort: { time: 1 } });
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.cancelOrder = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL).then(() => Order.findByIdAndDelete(id)).then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getAllOrders = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Order.find({}, {}, { sort: { time: 1 } });
        }).then(items => {
            mongoose.disconnect();
            resolve(items);
        }).catch(err => {
                mongoose.disconnect();
                reject(err);
        });
    });
};

exports.editOrder = (id, newStatus) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
                return Order.updateOne({ _id: id }, { status: newStatus });
            }).then(items => {
                mongoose.disconnect();
                resolve(items);
            }).catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};