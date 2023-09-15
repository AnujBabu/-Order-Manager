const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Users = require("./models/user");
const Orders = require("./models/order");

const app = express();

const port = 4000;

//Middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//DataBase connection
const db_name = "Conift";
const db_url = "mongodb+srv://himeshnishant1:DUxerrJGMdXIGWgv@cluster0.rrdtzfu.mongodb.net/" + db_name + "?retryWrites=true&w=majority";
const db_params = {
    useNewUrlParser: true,
    useUnifiedTopology: true    
};
mongoose.connect(db_url, db_params)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => {throw err;});


// Orders html template from files
let orderFile = fs.readFileSync(`${__dirname}/public/orders.html`, 'utf-8');

//Routes

app.get("/", (req, res) => {
    res.status(200).sendFile(`./index.js`);
});

app.post("/user", (req, res) => {
    const {name, phoneno, password} = req.body;
    const user = new Users({name, phoneno, password});

    Users.find({phoneno: {$eq: `${phoneno}`}})
        .then(usr => {
            if(usr.length == 0) user.save().then(response => res.status(200).json({status: "OK", data: response})).catch(err => console.log(err));
            else    res.status(500).json({status: "User with the email address already Exists!!"});
        })
        .catch(err => console.log(err));
});

app.get("/user/:phoneno/:password", (req, res) => {
    //console.log(req.params);
    const {phoneno, password} = req.params;
    Users.find({phoneno: {$eq: `${phoneno}`}})
        .then(usr => {
            if(usr.length === 1){
                if(usr[0].password === password){
                    res.status(200).json({status: "OK", data: usr[0]});
                }
                else    res.status(404).json({status: "Wrong", message: "Username or Password wrong!!"});
            }
            else    res.status(404).json({status: "Failed", message: "User Not Found!!"});
        })
        .catch(err => console.log(err));
});

app.post("/order", (req, res) => {
    const {user_id, sub_total, phone_number} = req.body;
    const order = new Orders({
        user_id,
        sub_total,
        phone_number
    });

    order.save()
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err));
});

app.get("/order/:phoneno", (req, res) => {
    const phoneno = req.params.phoneno;
    Orders.find({phone_number: {$eq: `${phoneno}`}})
        .then(orders => {
            if(orders.length === 0) res.status(404).json({status:"No Orders Found!!"});
            else    res.status(200).json({status: "OK", result: orders.length, data: {orders}});
        })
        .catch(err => res.status(404).json({status: err}));
});

app.listen(port, () => {
    console.log("Listening to 127.0.0.1:" + port);
});