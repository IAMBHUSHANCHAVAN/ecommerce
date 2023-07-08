import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname : {
        type :String,
        required : true,
        min : 2,
        max: 10
    },
    lastname : {
        type :String,
        required : true,
        min : 2,
        max: 10
    },
    email : {
        type :String,
        required : true,
        unique : true ,
        max: 10
    },
    password : {
        type :String,
        required : true,
        min : 6,
        max: 12
    },
    picturepath:{
        type : String , 
        default : "",
    },
    friends : {
        type : Array ,
        default : []
    },
    location : String ,
    occupation : String ,
    viewedprofile : Number,
    impression : Number
},{timestamps : true})

const User = mongoose.model("Usermain" , UserSchema)
export default User