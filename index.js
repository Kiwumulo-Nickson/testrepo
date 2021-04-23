const express=require('express');
//importing express module using require/import word into our project
//importing body-parser into our project
const bodyParser= require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Registration = require('./models/Registration')
const mongoose=require('mongoose');
const path=require('path');
require("dotenv/config");

const pugroutes=require('./routes(controllers)/pugroutes');
const redirect=require('./routes(controllers)/redirectroutes');
const indexRoutes = require('./routes(controllers)/indexroutes');
const loginRoutes = require('./routes(controllers)/loginroutes');
const uhomeRoutes = require('./routes(controllers)/homeroutes');
//creating an object in express an calling it app.
//instatiating 
const app=express();

// mongoose.connect( process.env.DATABASE, { useNewUrlParser: true },
//     ()=> console.log('connected to DB'))


  mongoose.connect(
      process.env.DATABASE, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
    });
  
    mongoose.connection
       .on('open', () => {
        console.log('Mongoose connection open');
      })
     .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
      });

      // const expressSession = require('express-session')({
      //   secret: 'secret',
      //   resave: false,
      //   saveUninitialized: false
      // });

//Configurations
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//middleware settings 
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, "public")))
// passport configs, must be above our routes
// passport configs
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

app.use( (req, res, next) => {
    console.log('A new request received at ' + Date.now());
    next();
  });

//Using the imported routes.
 app.use('/pug', pugroutes);
 app.use('/re',redirect);
app.use('/', indexRoutes);
 app.use('/login', loginRoutes);
app.use('/uhome' ,uhomeRoutes);



//logout
app.post('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy((err)=> {
          if (err) {
              // failed to destroy session
          } else {
              return res.redirect('/login');
          }
      })
  }  
})









//The Routes/controls (The folder C/controls contents)
app.get('/nick' ,(req,res)=>{
    res.render('form1')
    })
    
    app.post('/nick',(req,res)=>{
        console.log(req.body)//supposed to be posting in the data base , but since we dont have we post it here temporalily.
        res.redirect('/pugf')//pug is rendering a pug file called "thankyou.pug"
    });

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.get('/nick',(req,res)=>{
    res.sendFile(__dirname + '/project1.html');
})

app.post('/nick',(req,res)=>{
    // res.send('Submitted successfully');
    console.log(req.body);
})


app.get('/pathparams/:name' ,(req,res)=>{
    res.send('my path param is '  +  req.params.name)
})


app.get('/user',(req,res)=>{
res.send('This class  ' + req.query.class  + ' cohort  '  + req.query.cohort)
})


//for the post method;
//ensure that your end point/path/route is the same as that in your form's action attribute.
app.post('/', (req, res) => {
    console.log(req.body) 
   })
   //for easy practise ensure that  the route you use for your post method is the same as 
   //that of the get method if handling the same item.

//app.get('*',(req,res)=>{
   // res.send('Error page');
//})
// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
  });







//we call/invoke/ instantiate (creating an object from a class ) the function express
//(which has  all the c)
//  app.get('/', (req, res) => {
//      res.send('Homepage! Hello world.')
//  } );
//specify what to do when the user hits the '/'(Homepage) route/end point/path.
//supposed to first stop the server by Crtl C in the terminal ,then start it again by npm start
//and the go test it in the browser.


//  app.get('/about',(req,res)=> {
//      res.send('Homepge!Hello world,welcome.')
//  });
//specify what to do/(what the server should do) when the user hits the '/about' end point 
// hits the '/about'  route or end point of the URL.
// a route is like a URL sent directly to the server 

//   app.get('/',(req,res)=> {
//       res.sendFile(__dirname + '/index.html')
//   });


// creating a server with port name 3000 & a call back function

 //app.post('/',(req,res) =>{
    // console.log('Hellooooooooo');
// })
 app.listen(3000,() => console.log('listening on port 3000'));