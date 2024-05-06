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

// Get Questions
const getAllQuestions = catchError(async (req, res, next) => {
    let Question = await questionModel.find();
      res.status(201).json({ message: "Done this is Question", Question });
  });


  //  Get Question BY_ID
  
    const getQuestionByID=catchError(async(req,res,next)=>{

        const Question=await questionModel.findById(req.params.id)
        !Question && next(new AppError('Question not found',404))

        Question &&   res.status(201).json({message:"this is Question",Question})

    })
     



    


const updateQuestion= catchError(async(req,res,next)=>{
    const{id}=req.params

    const Question=await questionModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !Question && next(new AppError('Question not found',404))

      Question &&   res.status(201).json({message:"this is Question",Question})
}
)


 const deleteQuestion= deleteOne(questionModel,"Question")  




export {
    addQuestion,
 getAllQuestions,   
 getQuestionByID,
 updateQuestion,
 deleteQuestion
}

  