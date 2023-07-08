import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import  Path  from "path"
import { fileURLToPath } from "url"
import path from "path"
import { register } from "./controller/auth.js"
import createPost from "./controller/posts.js"
import { verifyToken } from "./middleware/auth.js"
import authRoute from "./routes/authroute.js"
import userRoute from "./routes/userroute.js"
import postRoutes from "./routes/postroute.js"

/*  configuration */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb", extended : true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended : true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname, 'public/assets')))

/*  file storage*/
const storage = multer.diskStorage({
    destination : function (req,res,cb){
        cb(null,"public/assets")
    },
    filename : function (req,res,cb){
        cb(null,File.originalname)
    }
})

const upload = multer({storage})

// routes with files 
app.post("/auth/register",upload.single("picture"), verifyToken, register)
app.post("/posts",upload.single("picture"), verifyToken, createPost)
// routes 
app.use("/auth", authRoute )
app.use("/users", userRoute )
app.use("/posts" , postRoutes)

/**   mongoose setup  */

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL , {
    // newUrlParser : true ,
    useUnifiedTopology : true
})
.then(()=>{
    app.listen(PORT ,()=>{
        console.log("port running on " , PORT);
    })
}).catch((Error)=>{
    console.log(Error);
})