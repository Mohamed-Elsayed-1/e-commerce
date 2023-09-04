const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const DB_URL = "mongodb://127.0.0.1:27017/souqDB";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

let User = mongoose.model('user',userSchema);

exports.createNewUser = (username,firstname,lastname,phone,address,email,password) =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email: email})
        }).then((user)=>{
            if(user){ 
                mongoose.disconnect()
                reject('email is used')
            }
            else{
                return bcrypt.hash(password,12)
            }
        }).then((hashedPassword)=>{
            let user = new User({
                username: username,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                address: address,
                email: email,
                password: hashedPassword,
            })
            return user.save();
        }).then(()=>{
            mongoose.disconnect()
            resolve('user created')
        }).catch(err=> {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.login = (email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=> User.findOne({email:email})).then((user)=>{
            if(!user){
                mongoose.disconnect();
                reject('Email or Password is incorrect');
            }else{
                    bcrypt.compare(password,user.password).then((same)=>{
                    if(!same){
                        mongoose.disconnect();
                        reject('Email or Password is incorrect');
                    }else{
                        mongoose.disconnect();
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        })
                    }
                })
            }
        }).catch(err=> {
            mongoose.disconnect();
            reject(err)
        })
    })
}


exports.updateUser = (id,name,password,firstname,lastname,phone,address)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=> bcrypt.hash(password,12))
        .then((hashedPassword)=>{
            return User.updateOne({_id: id},{
                username: name,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                address: address
            });
        }).then((user)=>{
            mongoose.disconnect();
            resolve(user)
        }).catch(err=> {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.getAllUsers = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.find({_id: {$ne : id}});
        }).then((users)=>{
            mongoose.disconnect();
            resolve(users)
        }).catch((err)=>{
            reject(err)
        })
    })
}

exports.getUsersById = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.find({_id: id});
        }).then((users)=>{
            mongoose.disconnect();
            resolve(users)
        }).catch((err)=>{
            reject(err)
        })
    })
}

exports.deletUser = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL).then(() => User.findByIdAndDelete(id)).then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};