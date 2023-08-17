require("dotenv").config();
const express=require('express')
const app=express();
const port=process.env.PORT;
const connectmongo=require('./db')
const cors=require("cors")
const Student=require("./Routes/Studentauth")
const Stuinfo=require("./Routes/Stuinfo")
const comauth=require("./Routes/Compauth")
const comData=require("./Routes/Comdata")

connectmongo();

app.use(cors())
app.use(express.json())

//available routes
app.use("/api/student",Student)
app.use("/api/student/v1",Stuinfo)

///company

app.use("/api/company/auth",comauth);
app.use("/api/company/Data",comData);

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})