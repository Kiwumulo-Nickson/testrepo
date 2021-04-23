const express=require('express');
const router=express.Router();

router.get('/' ,(req,res)=>{
    res.render('form')
    })
    
    router.post('/',(req,res)=>{
        console.log(req.body)//supposed to be posting in the data base , but since we dont have we post it here temporalily.
        res.render('project1')//pug is rendering a pug file called "thankyou.pug"
    });

    module.exports=router;

     



