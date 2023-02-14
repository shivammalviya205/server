import Post from "../models/Post.js";
import User from "../models/User.js";


//data ka content type multipart-form-data hona chahiye
export const createPost=async(req,res)=>{
    try{ 
     const{userId,description}=req.body;
     
     const image=req.file.filename;
      const user=await User.findById(userId);

      const newPost=new Post({
        userId,
        userName:user.userName,
        description,
        email:user.email,
        userPicturePath:user.picturePath,
        picturePath:image,
        likes:{},
        comments:[],
      })
      await newPost.save();

      const posts = await Post.find();
      res.status(200).json(posts);


    }catch(err){
        res.status(404).json({ message: err.message });
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
 
    try { 
      const posts = await Post.find();
      res.status(200).json(posts);
      console.log(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

/* particular user post*/
  export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await Post.find({ userId });
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  /* UPDATE */

  //data ka content type application.json hona chahiye
export const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      // userId=`${userId}`;
      const post = await Post.findById(id);
      const isLiked = post.likes.get(userId);
  
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }; 

 export const postcomment=async(req,res)=>{
    try{
    const { id } = req.params;
    const{userId,textcomment}=req.body;
    console.log(userId);
    console.log(textcomment);
    const user= await User.findById(userId);
    
    const post= await Post.findById(id);
   
    post.comments.push({
        userId,
        userName:user.userName,
        userPicturePath:user.picturePath,
        textcomment
    })
    
    await post.save();
      console.log(post.comments[0].userName)
      //yaha changes karna pad skta h image ja rahi h ya nhi dekhna padega
    //   const postcomments = await Promise.all(
    //     post.comments.map((id) => User.findById(id))
    //   );  

    const updatedPost = await Post.findById(id);
      res.status(200).json(updatedPost);
    }catch(err)
    {
        res.status(404).json({ message: err.message }); 
    }
};




export const deletecomment=async(req,res)=>{
    try{
    const { id } = req.params;
    const{requserId,reqtextcomment}=req.body;
    const post= await Post.findById(id);
 
    
       post.comments = post.comments.filter(comment => 
        comment.userId !== requserId || comment.textcomment !== reqtextcomment
      );
      // or and and ulta chal raha h yaha 
     
    await post.save();
    
      //yaha changes karna pad skta h image ja rahi h ya nhi dekhna padega
    //   const postcomments = await Promise.all(
    //     post.comments.map((id) => User.findById(id))
    //   );  

    const updatedPost = await Post.findById(id);
      res.status(200).json(updatedPost);
    }catch(err)
    {
        res.status(404).json({ message: err.message }); 
    }
};



