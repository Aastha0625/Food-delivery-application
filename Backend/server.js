import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config: initialise app using express
const app = express()
const port = 4000 //host port

//middleware
app.use(express.json())  //frontend to backend req passed through express.json
app.use(cors()) //access backend from any frontend

//DB Connection
connectDB();

//api endpoints
//for foodRoute:
app.use('/api/food',foodRouter)
app.use("/images",express.static('uploads')) //can visit image on browser /images/address
app.use("/api/user",userRouter) //to visit endpoint user
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

//http method request data from server  '/' is endpoint
app.get("/",(req,res)=>{
    res.send("API working") //endpoint / pe show
}) 

//after starting message 
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})

//mongodb+srv://aastha06:asati06@cluster1.jubrk6f.mongodb.net/?