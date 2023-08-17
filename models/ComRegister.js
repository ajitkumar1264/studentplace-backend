const mongoose=require('mongoose');

const ComRegiSchema=new mongoose.Schema({
    Comname:{
        type:String,
        required:true
    },
    Comemail:{
        type:String,
        required:true,
        unique:true
    },
    Compassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('ComRegiSchema',ComRegiSchema);