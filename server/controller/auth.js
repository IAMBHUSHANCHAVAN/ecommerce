import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"


// register user 

export const register = async (req,res)=>{
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            picturepath,
            friends,
            location,
            occupation
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password , salt)

        const newUser = new User({
            firstname,
            lastname,
            email,
            password : passwordHash,
            picturepath,
            friends,
            location,
            occupation,
            viewedprofile : Math.floor(Math.random()*1000),
            impression : Math.floor(Math.random()*1000)
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser) 

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// login user 

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({msg:"user does not exist"})
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch) return res.status(400).json({msg:"invalid credentails"})

        const token = jwt.sign({id: user_id}, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({token , user})

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}