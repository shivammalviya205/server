// In index.js i have written this for working of multer 
//but the real problem is from frontend 
//content type ko multiform-data karna padega  

//ye chal raha h 
// app.post('/auth/register',async (req, res) => {
//     upload(req, res, async(error) => {
//       if (error) {
//         console.log(error);
//         return res.status(502).json({ error });
//       }
  
//       try {
//         const {userName,email,password}=req.body;
//         const image = req.file.filename;
//         const newpassword=await bcrypt.hash(password,10)
//         const user=await User.create({
//             userName:userName,
//             email:email,
//             password:newpassword,
//             picturePath:image,
    
//         });
//         const msg="user registered succesfull"
//         res.status(201).json(msg);
//        } catch (err) {
//         res.status(501).json({ error: err.message });
//        }


//     //   const { name, email, password } = req.body;
//     //   const picturePath = req.file.filename;
  
//       // Create a new user
//     //   const user = new User({ name, email, password, picturePath });
  
//       // Save the user to the database
//     //   user.save((error) => {
//     //     if (error) {
//     //       return res.status(500).json({ error });
//     //     }
  
//     //     return res.status(200).json({ name, email, password, image });
//     //   });



//     });
//   });

