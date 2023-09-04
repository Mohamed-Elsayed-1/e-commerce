const authModel = require('../models/auth.model');


exports.getSignup = (req,res,next)=>{
    res.render("signup",{ msg: null,isUser: req.session.userId ,error: req.flash('signError')[0],isAdmin: false})
}

exports.postSignup = (req,res,next)=>{

    let regeEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let regePassword =new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$") 
    let regePhone = /^01[0125][0-9]{8}$/gm

    let username = req.body.username.toLowerCase();
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (username.length<=2 || !isNaN(username)) {
        res.render('signup', { msg: 'Field user name is invalid',isUser:false,error: req.flash('signError')[0],isAdmin: false});
    }else if (firstName.length<=2 || !isNaN(firstName)) {
        res.render('signup', { msg: 'Field first name is invalid' ,isUser:false,error: req.flash('signError')[0],isAdmin: false});
    }else if (lastName.length<=2 || !isNaN(lastName)) {
        res.render('signup', { msg: 'Field last name is invalid' ,isUser:false,error: req.flash('signError')[0],isAdmin: false});
    } else if (!regeEmail.test(email)) {
        res.render('signup', { msg: 'Field email is invalid' ,isUser:false,error: req.flash('signError')[0],isAdmin: false});
    }else if (!regePhone.test(phone)) {
        res.render('signup', { msg: 'Field Phone is invalid' ,isUser:false,error: req.flash('signError')[0],isAdmin: false});
    }else if (!isNaN(address)) {
        res.render('signup', { msg: 'Field address is invalid' ,isUser:false,error: req.flash('signError')[0],isAdmin: false});
    } else if (!regePassword.test(password)) {
        res.render('signup', { msg: 'Select password more secure',isUser:false,error: req.flash('signError')[0],isAdmin: false});
    } else if (confirmPassword !== password) {
        res.render('signup', { msg: 'Field confirmPassword is invalid',isUser:false,error: req.flash('signError')[0],isAdmin: false });
    } else {
        authModel.createNewUser(username,firstName,lastName,phone,address,email,password)
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => {
                req.flash('signError',err)
                res.redirect('/signup');
            });
    }
}

exports.getLogin = (req,res,next)=>{
    res.render("login",{
        error: req.flash('loginError')[0],
        isUser: req.session.userId,
        isAdmin: false
    })
}

exports.postLogin = (req,res,next)=>{
    authModel.login(req.body.email,req.body.password).then((result)=>{
        req.session.userId = result.id;
        req.session.isAdmin = result.isAdmin
        res.redirect('/');
    }).catch((err)=>{
        req.flash('loginError',err)
        res.redirect('/login');
    })
}

exports.logout = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
}

exports.getUpdate = (req,res,next)=>{
    authModel.getUsersById(req.session.userId).then(user=>{
        res.render("updateuser",{ msg: null,isUser: req.session.userId,isAdmin: false,user})
    }).catch(err=>{
        console.log(err)
    })
}

exports.editeUser = (req,res,next)=>{
    authModel.getUsersById(req.session.userId).then((user)=>{
        let regePhone = /^01[0125][0-9]{8}$/gm
        let regePassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$") 

        let username = req.body.username;
        let password = req.body.password;
        let firstName = req.body.firstname;
        let lastName = req.body.lastname;
        let phone = req.body.phone;
        let address = req.body.address;
        let confirmPassword = req.body.confirmPassword;

        if (username.length<=2 || !isNaN(username)) {
            res.render('updateuser', { msg: 'Field user name is invalid',isUser: req.session.userId ,isAdmin: false,user});
        }else if(firstName.length<=2 || !isNaN(firstName)){
            res.render('updateuser', { msg: 'Field first name is invalid',isUser: req.session.userId,isAdmin: false,user});
        }else if(lastName.length<=2 || !isNaN(lastName)){
            res.render('updateuser', { msg: 'Field last name is invalid',isUser: req.session.userId,isAdmin: false,user});
        }else if(!regePhone.test(phone)){
            res.render('updateuser', { msg: 'Field phone is invalid',isUser: req.session.userId,isAdmin: false,user});
        }else if (!isNaN(address)) {
            res.render('updateuser', { msg: 'Field address is invalid',isUser: req.session.userId,isAdmin: false,user});
        }else if(!regePassword.test(password)){
            res.render('updateuser', { msg: 'Select password more secure',isUser: req.session.userId,isAdmin: false,user});
        }else if (confirmPassword !== password) {
            res.render('updateuser', { msg: 'Field confirmPassword is invalid',isUser: req.session.userId,isAdmin: false,user});
        } else {
            authModel.updateUser(req.session.userId,username,password,firstName,lastName,phone,address)
            .then(() => {
                // console.log('right',username,password)
                res.redirect('/');
            })
            .catch(err => {
                // console.log('wrong',username,password)
                res.redirect('/updateuser');
            });
        }
    });
}