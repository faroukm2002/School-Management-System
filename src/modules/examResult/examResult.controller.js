import { examResultModel } from "../../../database/models/Academic/examResult.models.js";
import { studentModel } from "../../../database/models/student.models.js";
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"





// Get Exams
const checkExamResult = catchError(async (req, res, next) => {
    const student=await studentModel.findById(req.user._id)
    if (!student) return next(new AppError('student not register', 404));


    const examResult = await examResultModel.findOne({
        studentId:req.user._id,
        examId:req.params.examId
    }).populate(
        {
            path:"examId",
            populate:{ 
                path:"questions",
                select:"question",
            }
        } );
        if (!examResult) return next(new AppError('examResult not found', 404));
    
        if (!examResult.IsPublished) return next(new AppError("examResult not published yet ,back later", 404));
      res.status(201).json({ message: "Done this is Result", examResult });
  });




    

// Admin obscure Results

const publishedExamResult= catchError(async(req,res,next)=>{
    const{id}=req.params
    const examResult=await examResultModel.findByIdAndUpdate(
        id,
        {IsPublished:req.body.isPublished},
        {new:true}
    )
    !examResult && next(new AppError('result not found',404))

    examResult &&   res.status(201).json({message:"this is result",examResult})
}
)






export {
    checkExamResult,   
    publishedExamResult,
}

  