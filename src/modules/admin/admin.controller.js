import { adminModel } from "../../../database/models/admin.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"





// Get admin
const getAlladmins=catchError(async(req,res,next)=>{
    let admin = await adminModel.find();

      res.status(200).json({ message: "Done this is admins", admin });
    });



  //  Get adminProfile BY_ID
  const getAdminProfileByID=catchError(async(req,res,next)=>{

    const admin = await adminModel.findById(req.user._id)
if (!admin) {
        next(new AppError(" admin not found",404))
    } else {
        res.status(201).json({ message: " Done this is admin", admin})

    }

})
 
// update Admin
const updateAdmin= catchError(async(req,res,next)=>{
    const{id}=req.params
    const isEmailExist=await adminModel.findOne({email:req.body.email})
     if(isEmailExist) next(new AppError('email is taken',409))
    const admin=await adminModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !admin && next(new AppError('admin not found',404))

      admin &&   res.status(201).json({message:"Done",admin})
}
)


// delete admin
const deleteAdmin= deleteOne(adminModel,"Admin")





 

export {
 getAlladmins,
 getAdminProfileByID,
 updateAdmin,
 deleteAdmin
}

   