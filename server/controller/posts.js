import Post from "../models/posts.js"
import User from "../models/user.js"
// create \

const createPost = async (req,res)=>{
    try {
        const {userId , description , picturepath} = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstname : user.firstname,
            lastname : user.lastname,
            location : user.location,
            description,
            userpicturepath : user.picturepath,
            picturepath,
            likes:{},
            comments : []
        })
        await newPost.save();
        const post = await Post.find()

        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}


// read 

export const getFeedPosts = async (req,res)=>{
    try {
        const post =  await Post.find()
        res.status(201).json(post)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

export const getUserPost = async (req,res)=>{
    try {
        const {userId}= req.params;
        const posts =  await Post.find(userId)
        res.status(201).json(posts)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}



// update 

export const likedPost = async (req,res)=>{
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)
        if(isLiked){
            post.likes.delete(userId)
        }
        else{
            post.likes.set(userId , true)
        }
        const updatePost = await Post.findByIdAndUpdate(id,{likes:post.likes},{new : true})

        res.status(201).json(updatePost)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}
export default createPost