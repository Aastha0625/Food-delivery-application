import mongoose from "mongoose";


//food model properties
const foodSchema = new mongoose.Schema({
    name: {type:String , required:true},
    description: {type:String, required:true},
    price:{type:Number, required:true},
    image: {type: String, required:true},
    category : {type:String, required:true}
})

//model creation
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema) //only created once,if already there used, else creaated

export default foodModel;