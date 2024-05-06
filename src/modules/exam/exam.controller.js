import { examModel } from "../../../database/models/Academic/exam.models copy.js";
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"


//  Add Exam
const addExam = catchError(async(req, res, next) => {
    req.body.createdby = req.user._id;
    const existExam = await examModel.findOne({ name: req.body.name });
    if (existExam) return next(new AppError('Exam Already Exists', 404));

    const ExamCreated = await examModel.create(req.body);
    const admin = await adminModel.findById(req.user._id);
    admin.Exams.push(ExamCreated._id);
    await admin.save();
   
     res.status(201).json({ message: "Done", ExamCreated });
});

// Get Exams
const getAllExams = catchError(async (req, res, next) => {
    let Exam = await examModel.find();
      res.status(201).json({ message: "Done this is Exam", Exam });
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

  