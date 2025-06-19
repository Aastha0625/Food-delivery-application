import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item(store product data in database)
const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;

//whenevr we hit api , get these details in body, send these and access in backend using this func.
    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })

    //saving product check
    try {
        await food.save()
        res.json({success: true, message: "Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: "Error"})
    }
}

//all food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log("Error");
        res.json({success:false,message:"Error"})
    }
}

//remove food items
const removeFood = async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body._id)
        fs.unlink(`uploads/${food.image}`,()=>{})  //delete image from uploads

        await foodModel.findByIdAndDelete(req.body._id) 
        res.json({succes:true, message:"Food item removed"})

    } catch (error) {
        console.log("Error");
        res.json({succes:false , message:"Error"})
    }
}

export {addFood,listFood,removeFood};