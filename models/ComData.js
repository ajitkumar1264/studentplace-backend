const mongoose=require('mongoose');

const Comdata=new mongoose.Schema({
    compname:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    link:{
        type:String,
    },
    skills:{
        type:[String],
    },
    role:{
        type:[String],
    },
    salary:{
        type:String,
    },
    jobtype:{
        type:String,
    },
    schedule:{
        type:String,
    },
    jobdescri:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Comdata',Comdata);