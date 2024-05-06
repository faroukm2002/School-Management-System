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


// Get Exams
const getAllExams = catchError(async (req, res, next) => {
    let Exam = await examModel.find().populate(
        // {
        //     path:"questions",
        //     select:"-correctAnswer -Incorrect -updatedAt -createdAt",
        //     populate:{ 
        //         path:"createdBy",
        //         select:"Name",
        //     }
        // },
            
    ).select(" Name duration questions ");
      res.status(201).json({ message: "Done this is Exam", Exam });
  });


  //  Get ExamBY_ID
  
    const getExamByID=catchError(async(req,res,next)=>{

        const Exam=await examModel.findById(req.params.id)
        !Exam&& next(new AppError('Exam not found',404))

        Exam&&   res.status(201).json({message:"this is Exam",Exam})

    })
     



    


const updateExam= catchError(async(req,res,next)=>{
    const{id}=req.params
    const Exam=await examModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !Exam && next(new AppError('Exam not found',404))

      Exam &&   res.status(201).json({message:"this is Exam",Exam})
}
)


 const deleteExam= deleteOne(examModel,"Exam")  




export {
    addExam,
 getAllExams,   
 getExamByID,
 updateExam,
 deleteExam
}

  