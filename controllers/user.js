
import User from "../models/User.js";



/* for getting user deatils */
export const getUser=async(req,res)=>{
   
    try{
    const{id}=req.params;
    const user=await User.findById(id);
    
    res.status(200).json(user);
} catch (err) {
  res.status(404).json({ message: err.message });
}
};

/* for getting followers details*/
export const getUserFollowers=async(req,res)=>{
    try{
      const {id} =req.params;
      const user=await User.findById(id);
       
      const userfollowers=await Promise.all(
          user.followers.map((e)=>{
           return User.findById(e)
    })
      );  

    //   const followers = await Promise.all(
    //     user.followers.map((id) => User.findById(id))
    //   ); 

      
      const formattedfollowers= userfollowers.map(({ _id,userName,email,picturePath})=>{
          return {_id,userName,email,picturePath}
      });
      res.status(200).json(formattedfollowers);

    }catch(err)
    {
        res.status(404).json({ message: err.message });
    }
}



/* for getting following details*/
export const getUserFollowing=async(req,res)=>{
    
    try{
      const {id} =req.params;
     
      console.log(id)
      const user=await User.findById(id);
       
      const following=await Promise.all(
          user.following.map((e)=>{
           return User.findById(e)
          })
      );
      
      const formattedfollowing= following.map(({ _id,userName,email,picturePath})=>{
          return {_id,userName,email,picturePath};
      });
      res.status(200).json(formattedfollowing);

    }catch(err)
    {
        res.status(404).json({ message: err.message });
    }
}




/* follow unfollow functionality */ 
export const addRemoveFollower=async(req,res)=>{
    try{
       const {id,friendId}=req.params;
       const user=await User.findById(id);
       const friend = await User.findById(friendId);

       if (user.followers.includes(friendId)) {
        user.followers = user.followers.filter((id) => id !== friendId);
        friend.following = friend.following.filter((id) => id !== id);
      } else {
        user.followers.push(friendId);
        friend.following.push(id);
      }
      await user.save();
      await friend.save();
      
      const followers = await Promise.all(
        user.followers.map((id) => User.findById(id))
      ); 
      const following = await Promise.all(
        friend.following.map((id) => User.findById(id))
      ); 

      
      const formattedfollowing= await followers.map(({ _id,userName,email,picturePath})=>{
        return {_id,userName,email,picturePath};
    });
    const formattedfollowers= await following.map(({ _id,userName,email,picturePath})=>{
        return {_id,userName,email,picturePath};
    }); 

    res.status(200).json({formattedfollowers,formattedfollowing});

    }catch(err)
    {
        res.status(404).json({ message: err.message });
    }
}


