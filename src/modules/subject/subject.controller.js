import { subjectModel } from "../../../database/models/subject.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"



// Add Subject
const addSubject = catchError(async(req,res,next) => {
    
    // req.body.Createdby = req.user._id
    
    const subject =new subjectModel(req.body)
    await subject.save()
    res.status(201).json({message:"Done",subject})

}) 


// Get subject
const getAllSubjects = catchError(async (req, res, next) => {
    let subject = await subjectModel.find();
    // created
      res.status(201).json({ message: "Done this is subject", subject });
  });


  //  Get subject BY_ID
  
    const getSubjectByID=catchError(async(req,res,next)=>{

        const subject=await subjectModel.findById(req.params.id)
        !subject && next(new AppError('subject not found',404))

        subject &&   res.status(201).json({message:"this is subject",subject})

    })
     



    


const updateSubject= catchError(async(req,res,next)=>{
    const{id}=req.params
    const subject=await subjectModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !subject && next(new AppError('subject not found',404))

      subject &&   res.status(201).json({message:"this is subject",subject})
}
)


 const deleteSubject= deleteOne(subjectModel,"subject")




export {
 addSubject,
 getAllSubjects,   
 getSubjectByID,
 updateSubject,
 deleteSubject
}

  