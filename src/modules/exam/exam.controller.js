import { examModel } from "../../../database/models/Academic/exam.models copy.js";
import { teacherModel } from "../../../database/models/teacher.models.js";
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"


//  Add Exam
const addExam = catchError(async(req, res, next) => {
    req.body.createdby = req.user._id;
    const teacher = await teacherModel.findById(req.user._id);
    if (!teacher) return next(new AppError('teacher not found', 404));

    const existExam = await examModel.findOne({name:req.body.name});
    if (existExam) return next(new AppError('Exam already exists', 404));
    
    const newExam = await examModel.create(req.body);
    teacher.exams.push(newExam); 
    await teacher.save(); 
    res.status(201).json({ message: "Done", newExam });
});


// // Get Exams
// const getAllExams = catchError(async (req, res, next) => {
//     let Exam = await examModel.find();
//       res.status(201).json({ message: "Done this is Exam", Exam });
//   });


//   //  Get AcademicTerm BY_ID
  
//     const getAcademicTermByID=catchError(async(req,res,next)=>{

//         const AcademicTerm=await academicTermModel.findById(req.params.id)
//         !AcademicTerm && next(new AppError('AcademicTerm not found',404))

//         AcademicTerm &&   res.status(201).json({message:"this is AcademicTerm",AcademicTerm})

//     })
     



    


// const updateAcademicTerm= catchError(async(req,res,next)=>{
//     const{id}=req.params
//     req.body.updatedBy = req.user._id

//     const AcademicTerm=await academicTermModel.findByIdAndUpdate(
//         id,
//         req.body,
//         {new:true}
//     )
//     !AcademicTerm && next(new AppError('AcademicTerm not found',404))

//       AcademicTerm &&   res.status(201).json({message:"this is AcademicTerm",AcademicTerm})
// }
// )


//  const deleteAcademicTerm= deleteOne(examModel,"AcademicTerm")  




export {
    addExam,
//  getAllAcademicTerms,   
//  getAcademicTermByID,
//  updateAcademicTerm,
//  deleteAcademicTerm
}

  