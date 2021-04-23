
const express = require('express');
const router = express.Router();
const passport = require('passport');
//roles
//const roles=
// gets and displays a login page
router.get('/', (req, res) => {
    res.render('login', { title: 'Login form' })
})

//process the username and password that are submitted in the login page
router.post('/', passport.authenticate('local'), (req,res) =>{
    req.session.user = req.user;
    // console.log(err);
    res.redirect('/userlist');
})

//process the username and password that are submitted in the login page // to be added later
// router.post('/', passport.authenticate('local', {failureRedirect: '/login'}), (req,res) =>{
//     req.session.user = req.user;
//     const userRole = roles[req.user.role]
    
//     if(userRole == 'admin')
//         {
//          res.redirect('/userlist');
//         }
//     else(userRole == 'farmer')
//         {
//         res.redirect('/farmerdash');
//     }
// })

module.exports = router;

