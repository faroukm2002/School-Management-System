import { adminModel } from "../../../database/models/admin.models.js"
import { catchError } from "../../utils/catchError.js"



// Add Admin
const addAdmin = catchError(async(req,res,next) => {
    const Admin =new adminModel(req.body)
    await Admin.save()
    res.status(201).json({message:"Done",Admin})

}) 


// Get admin
const getAlladmins=catchError(async(req,res,next)=>{
    let admin = await adminModel.find();

    // created
      res.status(200).json({ message: "Done this is admins", admin });
    });



  //  Get admin BY_ID
  
  const getAdminByID=catchError(async(req,res,next)=>{

    const admin=await adminModel.findById(req.params.id)
    if (!admin) {
        next(new AppError(" admin not found",404))
    } else {
        res.status(201).json({ message: " Done this is admin", admin})

    }

})
 


// //  GetAdmin profile
//  const AdminProfile = catchError(async (req, res, next) => {

//     const Admin = await adminModel.findById(req.user._id).select("Name email role").populate("AcademicYear")
//     if (!Admin) {
//         next(new Error("Admin not found"))
//     } else {
//         res.status(201).json({ message: " Done this is Admin Profile", Admin })

//     }

// })



export {
 addAdmin,
 getAlladmins,
 getAdminByID,
}

  