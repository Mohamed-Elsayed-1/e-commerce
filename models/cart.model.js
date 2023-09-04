const mongoose =require('mongoose');

const DB_URL = "mongodb://127.0.0.1:27017/souqDB";

const cartSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    productId:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    }
})

const CartItem = mongoose.model('cart',cartSchema);

exports.addNewItem = data=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            let item = new CartItem(data);
            return item.save();
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.checkItem = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return CartItem.findOne({productId: id});
        }).then((item)=>{
            mongoose.disconnect();
            resolve(item);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.getItemByUser = userId=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return CartItem.find({userId: userId},{},{sort:{time: 1}})
        }).then((items)=>{
            mongoose.disconnect();
            resolve(items);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.editeItem = (id,newData)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return CartItem.updateOne({_id: id},newData)
        }).then((items)=>{
            mongoose.disconnect();
            resolve(items);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.deleteItem = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return CartItem.findByIdAndDelete(id);
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.getItemById = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => CartItem.findById(id))
            .then(item => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};