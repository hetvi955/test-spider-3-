
const express= require("express");
const mongoose = require('mongoose');
const Article = require('./models/article');
const bcrypt=require("bcrypt");
const passport= require('passport');
const flash= require('express-flash');
const session= require('express-session');
const methodOverride=require('method-override');

var User=require('./models/users');


const app = express();


const articleRouter=require('./routes/articles');
const router = require("./routes/articles");

mongoose.connect('mongodb://localhost/my_articlepage' , { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true} );

app.use(methodOverride('_method'));


app.use(express.urlencoded({extended :false}));


app.set('view engine','ejs');

app.get('/login',(req,res)=>{
    res.render('login.ejs')
});
app.get('/register',(req,res)=>{
    res.render('register.ejs')
});
app.post('/login',(req,res)=>{
    var username= req.body.username;
   var password = req.body.password;

   User.findOne({username:username, password:password},(err,user)=>{
    if(err){
        console.log(err);
        return res.status(500).send();
    }
    if(user){
        return res.status(404).send();
    }
    return res.status(200).send();
 });
});


app.post('/register',(req,res)=>{
   var username= req.body.username;
   var password = req.body.password;
   var email = req.body.email

   var newuser= new User();
   newuser.username=username;
   newuser.password=password;
   newuser.email=email;
   newuser.save(function(err,saveduser){
       if(err){
           console.log(err);
           return res.status(500).send();
       }
       return res.status(200).send();

    });
});

app.get('/article',async(req,res)=>{
    const articles= await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index',{articles: articles})
})
app.use('/articles',articleRouter);

app.listen(3000);