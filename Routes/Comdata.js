const express = require("express");
const router = express.Router();
const Comdata = require("../models/ComData");
const StudentinfoSchema = require("../models/Studentinform");

router.post("/Companyinfo", async (req, res) => {
  //if ther are errors, return bad request and

  const {
    compname,
    location,
    link,
    skills,
    role,
    salary,
    jobtype,
    schedule,
    jobdescri,
  } = req.body;

  try {
    let user = await Comdata.create({
      compname,
      location,
      link,
      skills,
      role,
      salary,
      jobtype,
      schedule,
      jobdescri,
    });
    if (!user) {
      res.status(404).send("error");
    }
    res.status(200).json({ user, status: true });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error request");
  }
  //check wheather the user with this email exists already
});

//fetch all details

router.get("/fetchallcomp", async (req, res) => {
  try {
    const userdata = await Comdata.find();
    res.status(200).json(userdata);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/cominform/:name", async (req, res) => {
  try {
    const {name}=req.params;
    const userdata = await Comdata.find({compname:name});
    res.status(200).json(userdata);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/cominfor/:id", async (req, res) => {
  const {id}=req.params;
  console.log(id)
  try {
    const userdata = await StudentinfoSchema.findById({_id:id});
    res.status(200).json(userdata);
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/cominfor/com/:id", async (req, res) => {
  const {id}=req.params;
  console.log(id)
  try {
    const userdata = await Comdata.findById({_id:id});
    res.status(200).json(userdata);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/Companyfetch/:cname", async (req, res) => {
  try {
    const { name } = req.params;
    const userdata = await Comdata.find({ Comname: name });
    res.status(200).json(userdata);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/Cstudentfetch/:cname", async (req, res) => {
  try {
    const { cname } = req.params;
    const num=0;
    const userdata = await StudentinfoSchema.find({
      CompanyApli:{$elemMatch:{Cname:cname,Status:0}}
    });
   
    if(userdata)
    {
      res.status(200).json({userdata,status:true});
    }
    res.status(404).json({status:false})
   
  } catch (error) {
    console.log(error.message);
  }
});



router.put("/UpdateStatus2/:name/:id", async (req, res) => {
  try {
    const { id,name } = req.params;
    const userdata = await StudentinfoSchema.findOneAndUpdate(
      { _id: id, "CompanyApli.Cname": name,},
      {
        $set: {
            "CompanyApli.$.Status": 2,
         }
      }
    );
    res.status(200).json({userdata,status:true});
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/UpdateStatus1/:name/:id", async (req, res) => {
  try {
    const { id,name } = req.params;
    const userdata = await StudentinfoSchema.findOneAndUpdate(
      { _id: id, "CompanyApli.Cname": name,},
      {
        $set: {
            "CompanyApli.$.Status": 1,
         }
      }
    );
    res.status(200).json({userdata,status:true});
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
