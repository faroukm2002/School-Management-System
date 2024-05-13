import { examModel } from "../../../database/models/Academic/exam.models.js"
import { examResultModel } from "../../../database/models/Academic/examResult.models.js"
import { studentModel } from "../../../database/models/student.models.js"
import { Apifeatures } from "../../utils/Apifeatures.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js" 


// Get student
const getAllStudents=catchError(async(req,res,next)=>{
    let apifeatures= new Apifeatures( studentModel.find(),req.query)
    .pagination().search()
    // created
    const students = await apifeatures.mongooseQuery
        res.status(201).json({ message: 'Done this is students list', page:apifeatures.page, students });
    })


  //  Get studentProfile BY_ID
    const getStudentProfileByID=catchError(async(req,res,next)=>{

        const student=await studentModel.findById(req.params.id)
        if (!student) {
            next(new AppError(" student not found",404))
        } else {
            res.status(201).json({ message: " Done this is student", student})
    
        }

    })
     


  
    


//  Update student profile
const updateStudent= catchError(async(req,res,next)=>{
    const{id}=req.params
    const student=await studentModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !student && next(new AppError('student not found',404))

      student &&   res.status(201).json({message:"Done",student})
}
)


//  Update studentData by admin
const updateStudentDataByAdmin = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { subject, academicYear, program, classLevel, IsSuspended, IsWithdrawn } = req.body;
    
    const student = await studentModel.findById(id);
    if (!student) return next(new AppError('Student not found', 404));

    const update = {
        subject,
        academicYear,
        program,
        IsSuspended,
        IsWithdrawn,
        $addToSet: { classLevel } 
    };

    const updatedStudent = await studentModel.findByIdAndUpdate(id, update, { new: true });

    res.status(201).json({ message: "Student data updated successfully", update: updatedStudent });
});


 const deleteStudent= deleteOne(studentModel,"Student")





const promotingStudent = catchError(async (req, res, next) => {
        const student = await studentModel.findById(req.params.id);
        if (!student) return next(new AppError('Student not found', 404));

        const examResult = await examResultModel.findOne({ studentId: req.params.id }).populate("academicTermId");
        if (!examResult) return next(new AppError('Exam result not found for this student', 404));

        // Promoting student
        if (examResult.status === "passed") {
            switch (student.currentClassLevel) {
                case "level 1":
                    student.classLevel.push("level 2");
                    student.currentClassLevel = "level 2";
                    break;
                case "level 2":
                    student.classLevel.push("level 3");
                    student.currentClassLevel = "level 3";
                    break;
                case "level 3":
                    student.classLevel.push("level 4");
                    student.currentClassLevel = "level 4";
                    break;
                case "level 4":
                    student.YearGraduated = new Date();
                    student.isGraduated = true;
                    break;
            }
            await student.save();
            res.status(201).json({ message: "Student promoting", student });
        }
   
});






export {
 getAllStudents,   
 getStudentProfileByID,
 updateStudent,
 updateStudentDataByAdmin,
 deleteStudent,
 promotingStudent
}

  