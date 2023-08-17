const express = require("express");
const router = express.Router();
const ComRegiSchema=require("../models/ComRegister");
const { body, validationResult } = require("express-validator");

router.post(
    "/regicomp",
    [
      body("Comemail", "enter valid email").isEmail(),
      body("Comname", "enter valid name").isLength({ min: 5 }),
      body("Compassword").isLength({ min: 5 }),
    ],
    async (req, res) => {
      //if ther are errors, return bad request and
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        let usercheck = await ComRegiSchema.findOne({ Comemail: req.body.Comemail });
        if (usercheck) {
          return res
            .status(400)
            .json({ error: "Sorry a user with this email exists already" });
        }

        let user = await ComRegiSchema.create({
            Comname: req.body.Comname,
            Comemail: req.body.Comemail,
            Compassword: req.body.Compassword,
        });
        if(user){
        res.status(200).json({user,status:true});
    }else{
        res.status(404).josn({message:"error",status:false})
    }
       
      } catch (err) {
        console.log(err.message);
        res.status(500).send("some error request");
      }
      
    }
  );




  router.post('/logincomp',[

    body("Comemail", "enter valid email").isEmail(),
    body("Compassword",'password cannnot be blank').exists(),

],async(req,res)=>{

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {Comemail,Compassword}=req.body;

    try{

        let user=await ComRegiSchema.findOne({Comemail});
        if(!user)
        {
            res.status(400).json({error:'please try to login with correct credentials'});
        }
        if(user.Compassword===Compassword)
        {
            res.status(200).json({status:true,Companyname:user.Comname,message:"login succcessfully"})
        }
        else
        {
            res.status(404).json({status:false,message:"Invalid login"})
        }
    

    }catch(error)
    {
        console.log(error.message);
        res.status(500).send("some Internal server occur");
    }
})

  
  module.exports=router;