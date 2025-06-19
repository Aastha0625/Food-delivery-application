import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item(store product data in database)
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    console.log("req.file:",req.file);
    

    const image_filename = req.file.filename;

//whenevr we hit api , get these details in body, send these and access in backend using this func.
    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })

    //saving product check
    await food.save();
    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {addFood};