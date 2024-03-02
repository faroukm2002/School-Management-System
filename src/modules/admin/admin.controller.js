import { adminModel } from "../../../database/models/admin.models.js"
import { catchError } from "../../utils/catchError.js"



// Add Admin
const addAdmin = catchError(async(req,res,next) => {
    const Admin =new adminModel(req.body)
    await Admin.save()
    res.status(201).json({message:"Done",Admin})

}) 


// Get teacher
const getAlladmins=catchError(async(req,res,next)=>{
    let admin = await adminModel.find();

    // created
      res.status(200).json({ message: "Done this is admins", admin });
    });



export {
 addAdmin,
 getAlladmins
}

  