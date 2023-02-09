import jwt from 'jsonwebtoken';
  

// error invalid token because token ko without "" m bhejna h frontend se
//postman se 
 export const verifyToken=async(req,res,next)=>{
    try{
        const token=req.header('Authorization')
     
     
     
     if(!token){
        return res.status(500).send("Access denied");
     }
     
    
    //  if(token.startsWith("Bearer ")){
    //     newtoken=token.slice(7,token.length()).trimLeft();
    //  } 
       
     const verified=jwt.verify(token,'secrethbhaikyahikarlengajanke');
     //req.user=verified;
     next();
      console.log("next")

    }catch(err){
      res.status(500).json({error:err.message});
    }
 };