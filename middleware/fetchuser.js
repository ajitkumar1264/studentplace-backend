const JWT=require('jsonwebtoken');
const JWT_SECRET = "ajitkumarvaghela";

const fetchuser=(req,res,next)=>{

    //get the user from the json web token add id to req

    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:'please authenticate using a valid token'})
    }

    try{

    const data =JWT.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
    
    }catch(err)
    {
        res.status(401).send({error:'please authenticate using a valid token'})
    }
    
}

module.exports=fetchuser;