const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const StudentinfoSchema = require("../models/Studentinform");

router.post("/Studentinfo", fetchuser, async (req, res) => {
  //if ther are errors, return bad request and

  const {
    Collagename,
    Name,
    emailAddress,
    SSCPercentage,
    Branch,
    SPI,
    HSCpercentage,
    CONTACTNO,
    PROJECTS: [{ projectName, projectDescri, projectLink }],
    CompanyApli: [],
  } = req.body;



  try {
    let user = await StudentinfoSchema.create({
      studentId: req.user.id,
      Collagename,
      Name,
      emailAddress,
      SSCPercentage,
      Branch,
      SPI,
      HSCpercentage,
      CONTACTNO,
      PROJECTS: [
        {
          projectName,
          projectDescri,
          projectLink,
        },
      ],
      CompanyApli: [],
    });
    if (!user) {
      res.status(404).send("error");
    }
    res.status(200).json({user,status:true});
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error request");
  }
  //check wheather the user with this email exists already
});

//fetch all details

router.get("/userdatafetch", fetchuser, async (req, res) => {
  try {
    const userdata = await StudentinfoSchema.find({ studentId: req.user.id });
    res.status(200).json(userdata);
  } catch (error) {
    console.log(error.message);
  }
});


router.get("/StudentComApply", fetchuser, async (req, res) => {
  try {
    const userdata = await StudentinfoSchema.find({ studentId: req.user.id }).select("CompanyApli");
    res.status(200).json(userdata);
  } catch (error) {
    console.log(error.message);
  }
});



//upadte the userdetails


router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  

  const {
    Name,
    emailAddress,
    SSCPercentage,
    SPI,
    HSCpercentage,
    CONTACTNO,
  } = req.body;

///create newNote

    const newNote={};
    if(CONTACTNO){newNote.CONTACTNO=CONTACTNO};
    if(Name){newNote.Name=Name};
    if(emailAddress){newNote.emailAddress=emailAddress};
    if(SSCPercentage){newNote.SSCPercentage=SSCPercentage};
    if(HSCpercentage){newNote.HSCpercentage=HSCpercentage};
    if(SPI){newNote.SPI=SPI};

    try{

   let userdata=await StudentinfoSchema.findById(req.params.id);
    if(!userdata)
    {
     return res.status(404).send("Not found")
    }
    if(userdata.studentId.toString()!==req.user.id)
    {
           return res.status(401).send("Not Allowed");
    }

    userdata=await StudentinfoSchema.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

    res.json({userdata});

  }catch(error)
  {
    console.log(error.message);
    res.status(404).send("Internal server error is found!");
  }
})


router.post("/CApply",fetchuser,async(req,res)=>{

  const {Cname,Role,Status}=req.body;
  const date=new Date().toISOString();

  const objapply={

    Cname,
    Role,
    Status,
    date
  }
  try{

    let userdata=await StudentinfoSchema.find({studentId:req.user.id});
     if(!userdata)
     {
      return res.status(404).send("Not found")
     }

     userdata=await StudentinfoSchema.findOneAndUpdate({studentId:req.user.id},{$push: {CompanyApli: {
      Cname,
      Role,
      Status,
      date
    }}})
 
   
     res.json({userdata,status:true});
 
   }catch(error)
   {
     console.log(error.message);
     res.status(404).send("Internal server error is found!");
   }

})


module.exports = router;
