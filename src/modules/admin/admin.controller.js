import { adminModel } from "../../../database/models/admin.models.js"
import { Apifeatures } from "../../utils/Apifeatures.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"





// Get Admins
const getAllAdmins=catchError(async(req,res,next)=>{
  let apifeatures= new Apifeatures( adminModel.find(),req.query)
  .pagination().search()
  // created
  const admins = await apifeatures.mongooseQuery
      res.status(201).json({ message: 'Done this is Adminss list', page:apifeatures.page, admins });
  })


  //  Get adminProfile BY_ID
  const getAdminProfileByID = catchError(async (req, res, next) => {
    const admin = await adminModel
        .findById(req.user._id)
        .select("name email role")
        .populate("academicTerm");
    
    if (!admin) {
        next(new AppError("Admin not found", 404));
    } else {
        res.status(201).json({ message: "Done. This is admin", admin });
    }
});

 
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
  getAllAdmins,
 getAdminProfileByID,
 updateAdmin,
 deleteAdmin
}

   