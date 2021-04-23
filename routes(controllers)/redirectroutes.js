const express=require('express');
const router=express.Router();

router.get('/pugf' ,(req,res)=>{
    res.render('form1')
    })
    
    router.post('/pugf',(req,res)=>{
        console.log(req.body)//supposed to be posting in the data base , but since we dont have we post it here temporalily.
        // res.redirect('/pugf')//pug is rendering a pug file called "thankyou.pug"
        res.render('thankyou')
    });

   module.exports=router;
