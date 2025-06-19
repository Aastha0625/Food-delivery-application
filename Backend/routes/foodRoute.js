import express from 'express'
import { addFood } from '../controllers/foodController.js'
import multer from 'multer' //image storage

const foodRouter = express.Router(); //get,post,etc. methods


//image saving in upload: image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename : (req,file,cb)=>{
        return cb(null,Date.now()+"-"+file.originalname) //file.originalname me time stamp add hoga and create unique file name
    }
})

const upload = multer({storage : storage})

//created post method with endpoint using middleware to upload the images
foodRouter.post("/add",upload.single("image"),addFood)


export default foodRouter;
