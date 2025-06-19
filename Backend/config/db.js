import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://aastha06:asati06@cluster1.jubrk6f.mongodb.net/food-delivery-application')
    .then(()=> console.log("DB Connected"));   
}