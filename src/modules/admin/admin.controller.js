import { adminModel } from "../../../database/models/admin.models.js"
import { catchError } from "../../utils/catchError.js"



// Add Admin
const addAdmin = catchError(async(req,res,next) => {
    const Admin =new adminModel(req.body)
    await Admin.save()
    res.status(201).json({message:"Done",Admin})

}) 






export {
 addAdmin,

}

  