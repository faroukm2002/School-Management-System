import { academicTermModel } from "../../../database/models/Academic/academicTerm.models.js"
import { adminModel } from "../../../database/models/admin.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"


//  Add AcademicTerm
const addAcademicTerm = catchError(async(req, res, next) => {
    req.body.createdby = req.user._id;
    const existAcademicTerm = await academicTermModel.findOne({ name: req.body.name });
    if (existAcademicTerm) return next(new AppError('AcademicTerm Already Exists', 404));

    const academicTermCreated = await academicTermModel.create(req.body);
    const admin = await adminModel.findById(req.user._id);
    admin.academicTerms.push(academicTermCreated._id);
    await admin.save();
   
     res.status(201).json({ message: "Done", academicTermCreated });
});

// Get AcademicTerms
const getAllAcademicTerms = catchError(async (req, res, next) => {
    let AcademicTerm = await academicTermModel.find();
      res.status(201).json({ message: "Done this is AcademicTerm", AcademicTerm });
  });


  //  Get AcademicTerm BY_ID
  
    const getAcademicTermByID=catchError(async(req,res,next)=>{

        const AcademicTerm=await academicTermModel.findById(req.params.id)
        !AcademicTerm && next(new AppError('AcademicTerm not found',404))

        AcademicTerm &&   res.status(201).json({message:"this is AcademicTerm",AcademicTerm})

    })
     



    


const updateAcademicTerm= catchError(async(req,res,next)=>{
    const{id}=req.params
    req.body.updatedBy = req.user._id

    const AcademicTerm=await academicTermModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !AcademicTerm && next(new AppError('AcademicTerm not found',404))

      AcademicTerm &&   res.status(201).json({message:"this is AcademicTerm",AcademicTerm})
}
)


 const deleteAcademicTerm= deleteOne(academicTermModel,"AcademicTerm")  




export {
    addAcademicTerm,
 getAllAcademicTerms,   
 getAcademicTermByID,
 updateAcademicTerm,
 deleteAcademicTerm
}

  