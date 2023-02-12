
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

       if (user.following.includes(friendId)) {
        user.following = user.following.filter((id) => id !== friendId);
        friend.followers = friend.followers.filter((id) => id !== id);
      } else {
        user.following.push(friendId);
        friend.followers.push(id);
      }
      await user.save();
      await friend.save();
      
      const followers = await Promise.all(
        friend.followers.map((id) => User.findById(id))
      ); 
      const following = await Promise.all(
        user.following.map((id) => User.findById(id))
      ); 

      
      const formattedfollowing= await following.map(({ _id,userName,email,picturePath})=>{
        return {_id,userName,email,picturePath};
    });
    const formattedfollowers= await followers.map(({ _id,userName,email,picturePath})=>{
        return {_id,userName,email,picturePath};
    }); 

    // res.status(200).json({formattedfollowers,formattedfollowing});
    res.status(200).json({data:formattedfollowing});
     console.log(formattedfollowing)
    }catch(err)
    {
        res.status(404).json({ message: err.message });
    }
}


