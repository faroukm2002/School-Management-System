import { examModel } from "../../../database/models/Academic/exam.models.js";
import { questionModel } from "../../../database/models/Academic/question.models.js";
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"


//  Add addQuestion
const addQuestion = catchError(async(req, res, next) => {
    req.body.createdBy = req.user._id;
    const Exam = await examModel.findById(req.params.id );
    if (!Exam) return next(new AppError('exam Already Exists', 404));

    const existQuestion = await questionModel.findOne({ question: req.body.question });
    if (existQuestion) return next(new AppError('Question Already Exists', 404));

    const Question = await questionModel.create(req.body);
    Exam.questions.push(Question);
    await Exam.save();
   
     res.status(201).json({ message: "Done", Question });
});

// // Get AcademicTerms
// const getAllAcademicTerms = catchError(async (req, res, next) => {
//     let AcademicTerm = await academicTermModel.find();
//       res.status(201).json({ message: "Done this is AcademicTerm", AcademicTerm });
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


//  const deleteAcademicTerm= deleteOne(academicTermModel,"AcademicTerm")  




export {
    addQuestion,
//  getAllAcademicTerms,   
//  getAcademicTermByID,
//  updateAcademicTerm,
//  deleteAcademicTerm
}

  