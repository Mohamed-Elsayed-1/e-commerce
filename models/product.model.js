const mongoose = require('mongoose');
const DB_URL = "mongodb://127.0.0.1:27017/souqDB";


const productSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    discription:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})



let Product = mongoose.model('Product',productSchema);

exports.addProduct = (name,price,discription,amount,category,image)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            let newProduct = new Product({
                name:name,
                price:price,
                discription:discription,
                amount:amount,
                category:category,
                image:image
            })
            return newProduct.save();
        }).then(product => {
            mongoose.disconnect();
            resolve(product)
        }).catch(err => reject(err))
    })
}

exports.getAllProducts= ()=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({});
        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => reject(err))
    })
}


exports.getProductsByCategory = (category)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({category : category});
        }).then(products => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => reject(err))
    })
}

exports.getProductById = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findById(id);
        }).then(product => {
            mongoose.disconnect();
            resolve(product)
        }).catch(err => reject(err))
    })
}

exports.getFirstProduct = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findOne({});
        }).then(product => {
            mongoose.disconnect();
            resolve(product)
        }).catch(err => reject(err))
    })
}
