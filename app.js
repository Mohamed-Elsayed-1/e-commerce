const express = require('express');
const path = require('path')

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const homeRouter = require('./routes/hom.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')
const adminRouter = require('./routes/admin.route')
const orderRouter = require('./routes/order.route')

const app=express();

app.set('view engine','ejs');
app.use(express.json());
app.use(flash())

const Store = new SessionStore({
    uri: 'mongodb://127.0.0.1:27017/souqDB',
    collection: 'sessions'
})

app.use(session({
    secret: 'this is secret session session',
    saveUninitialized: false,
    store: Store
    // cookie:{
    //     maxAge: 1*60*60*100
    // }
}))

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname,'images')));

app.use('/',homeRouter);
app.use('/',authRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/admin',adminRouter);
app.use("/", orderRouter);

app.listen(3000,()=>{
    console.log('server running ........');
})
