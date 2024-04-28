import { academicTermModel } from "../../../database/models/Academic/academicTerm.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"



// Add AcademicTerm
const addAcademicTerm = catchError(async(req,res,next) => {
    
    req.body.createdby = req.user._id
    const ExistAcademicTerm = await academicTermModel.findOne({ name:req.body.name })
    if (ExistAcademicTerm) return next(new AppError('AcademicTerm Aready Exist',404))

    const AcademicTerm =new academicTermModel(req.body)
    await AcademicTerm.save()
    res.status(201).json({message:"Done",AcademicTerm})

}) 


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

    const AcademicTerm=await classModel.findByIdAndUpdate(
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

  