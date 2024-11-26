const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOptions = {secret: "secretstring", resave: false, saveUninitialized: true};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res, next) => {
    res.locals.scs = req.flash('success');
    res.locals.err = req.flash('err');
    next();
});


app.get("/register", (req,res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("err", "User not registered");
    } else {
        req.flash("success", "registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello", (req,res) => {
    res.render("page.ejs", {name: req.session.name });
});

app.get("/req", (req,res) =>{
    if(req.session.count){
        req.session.count++;
    } else{
        req.session.count = 1;
    }
    res.send(`You sent req ${req.session.count} times`);
});

app.get("/test", (req, res) => {
    res.send("successful");
}); 

app.listen(3000, (req,res) => {
    console.log("listening");
});