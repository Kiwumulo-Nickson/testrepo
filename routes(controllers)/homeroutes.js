const express =require('express');
const router=express.Router();

router.get('/',(req,res) =>{
    res.render('farmer');
})

router.post('/',(req,res)=>{
    console.log(req.body);
    res.redirect('uhome');
})






module.exports= router;


