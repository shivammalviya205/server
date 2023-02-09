import mongoose from 'mongoose';

const postSchema= new mongoose.Schema(
    {
        userId: {
          type: String,
          required: true,
        },
        userName: {
          type: String,
          required: true,
        },
        description: {type:String, required:true},
        picturePath: {type:String, required:true},
        userPicturePath: String,
        likes: {
          type: Map,
          of: Boolean,
        },
        comments: {
          type: Array,
          default: [],
        },
      },
      { timestamps: true }
    );   


const Post=mongoose.model('posts',postSchema);
export default Post;


//likes are stored in map becuase it is efficient .
//set and delete are map methods .