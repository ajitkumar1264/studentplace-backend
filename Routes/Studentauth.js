const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const StudentRegi=require("../models/Studentregi")
const fetchuser=require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "ajitkumarvaghela";

//Register a student

router.post(
    "/createuser",
    [
      body("email", "enter valid email").isEmail(),
      body("name", "enter valid name").isLength({ min: 5 }),
      body("password").isLength({ min: 5 }),
    ],
    async (req, res) => {
      //if ther are errors, return bad request and
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        let usercheck = await StudentRegi.findOne({ email: req.body.email });
        if (usercheck) {
          return res
            .status(400)
            .json({ error: "Sorry a user with this email exists already" });
        }
  
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
  
        let user = await StudentRegi.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
  
        const data = {
          user: {
            id: user.id,
          },
        };
  
        const authtoken = JWT.sign(data, JWT_SECRET);
        console.log(authtoken);
        res.status(200).json({ authtoken ,status:true});
       
      } catch (err) {
        console.log(err.message);
        res.status(500).send("some error request");
      }
      //check wheather the user with this email exists already
    }
  );
  

router.post('/login',[

    body("email", "enter valid email").isEmail(),
    body("password",'password cannnot be blank').exists(),

],async(req,res)=>{

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;

    try{

        let user=await StudentRegi.findOne({email});
        if(!user)
        {
            res.status(400).json({error:'please try to login with correct credentials'});
        }

        const passwordCompare=await bcrypt.compare(password,user.password);

        if(!passwordCompare)
        {
            res.status(400).json({error:'please try to login with correct credentials'});
        }

        const payload={
            user:{
                id:user.id
            }
        }

        const authtoken = JWT.sign(payload, JWT_SECRET);
        console.log(authtoken);
        res.json({authtoken,status:true})

    }catch(error)
    {
        console.log(error.message);
        res.status(500).send("some Internal server occur");
    }
})

router.get('/getuser',fetchuser,async(req,res)=>{
  try{

      const userId=req.user.id;
      const user= await StudentRegi.findById(userId).select('-password');
      res.send(user);
  }catch(error)
  {

      console.log(error.message);
      res.status(500).send("some Internal server occur");
 

  }
})


module.exports=router;