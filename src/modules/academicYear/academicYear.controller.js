import { academicYearModel } from "../../../database/models/Academic/academicYear.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"



// Add AcademicYear
const addAcademicYear = catchError(async(req,res,next) => {
    
    req.body.createdby = req.user._id
    const ExistAcademicYear = await academicYearModel.findOne({ name:req.body.name })
    if (ExistAcademicYear) return next(new AppError('AcademicYear Aready Exist',404))

    const AcademicYear =new academicYearModel(req.body)
    await AcademicYear.save()
    res.status(201).json({message:"Done",AcademicYear})

}) 


// Get AcademicYears
const getAllAcademicYears = catchError(async (req, res, next) => {
    let AcademicYear = await academicYearModel.find();
      res.status(201).json({ message: "Done this is AcademicYear", AcademicYear });
  });


  //  Get AcademicYear BY_ID
  
    const getAcademicYearByID=catchError(async(req,res,next)=>{

        const AcademicYear=await academicYearModel.findById(req.params.id)
        !AcademicYear && next(new AppError('AcademicYear not found',404))

        AcademicYear &&   res.status(201).json({message:"this is AcademicYear",AcademicYear})

    })
     



    


const updateAcademicYear= catchError(async(req,res,next)=>{
    const{id}=req.params
    req.body.updatedBy = req.user._id

    const AcademicYear=await academicYearModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !AcademicYear && next(new AppError('AcademicYear not found',404))

      AcademicYear &&   res.status(201).json({message:"this is AcademicYear",AcademicYear})
}
)


 const deleteAcademicYear= deleteOne(academicYearModel,"AcademicYear")  




export {
    addAcademicYear,
 getAllAcademicYears,   
 getAcademicYearByID,
 updateAcademicYear,
 deleteAcademicYear
}

  