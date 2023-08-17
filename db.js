const mongoose=require("mongoose")
const mongoURI=process.env.DATABASE;

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log('connect successfully')
    }).catch(err=>{
        {
            console.log(err.message)
        }
    })
}

module.exports=connectToMongo;