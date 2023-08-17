const mongoose=require('mongoose');


const ProjectSchema=new mongoose.Schema({

    projectName:{
     
        type:String,
         default:null
    },
    projectDescri:{
     
        type:String,
        default:null
    },
    projectLink:{

        type:String,
        default:null
    }
})
const ApplycomSchema =new mongoose.Schema({

    CompanyName:{
     
        type:String,
        default:null
    },
    Role:{
     
        type:String,
        default:null
    },
    Status:{
        type:Number,
        default:null
    },
    Applydate:{
        type:Date,
        default:Date.now
    }
})

const StudentinfoSchema=new mongoose.Schema({
  
    studentId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'StudentRegi'
    },
    Name:{

        type:String,
        required:true
    },
    emailAddress:{
        type:String,
        required:true
    },
    Collagename:{
        type:String,
        required:true
    },
    SSCPercentage:{
        type:String,
        required:true,
        
    },
    Branch:{
        type:String,
        required:true,
      
    },
    SPI:{
        type:String,
        required:true,
      
    },
    HSCpercentage:{
        type:String,
        required:true
    },
    CONTACTNO:{
        type:String,
        required:true
    },
    PROJECTS:{
        type:Array,
        default:null
       
    },
    CompanyApli:{
          type:Array,
          default:null
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Studentinfo',StudentinfoSchema);