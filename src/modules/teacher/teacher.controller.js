import { teacherModel } from "../../../database/models/teacher.models.js"
import { Apifeatures } from "../../utils/Apifeatures.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js" 


// Get teacher
const getAllteachers=catchError(async(req,res,next)=>{
    let apifeatures= new Apifeatures( teacherModel.find(),req.query)
    .pagination().search()
    // created
    const teachers = await apifeatures.mongooseQuery
        res.status(201).json({ message: 'Done this is teachers list', page:apifeatures.page, teachers });
    })


  //  Get TeacherProfile BY_ID
    const getTeacherProfileByID=catchError(async(req,res,next)=>{

        const teacher=await teacherModel.findById(req.params.id).select("name email role")
        if (!teacher) {
            next(new AppError(" Teacher not found",404))
        } else {
            res.status(201).json({ message: " Done this is teacher", teacher})
    
        }

    })
     


  
    


//  Update Teacher profile
const updateTeacher= catchError(async(req,res,next)=>{
    const{id}=req.params
    const teacher=await teacherModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !teacher && next(new AppError('teacher not found',404))

      teacher &&   res.status(201).json({message:"Done",teacher})
}
)


// delete teacher
 const deleteTeacher= deleteOne(teacherModel,"Teacher")

//  admin assign roles to teacher

const assigningTeacherRole = catchError(async (req, res, next) => {
    const { academicTerm, academicYear, program, classLevel } = req.body;
    const teacher = await teacherModel.findById(req.params.id);
   
    if (!teacher) return next(new AppError('Teacher not found', 404));
    
    if (teacher.Iswitdrawn || teacher.IsSuspended) {
        return next(new AppError('Teacher is Iswitdrawn or IsSuspended', 404));  
    }

    if (program) {
        teacher.program = program;
        await teacher.save();
        return res.status(201).json({ message: "Program added to teacher" });
    }
    
    if (academicTerm) {
        teacher.academicTerm = academicTerm;
        await teacher.save();
        return res.status(201).json({ message: "Academic term added to teacher" });
    }

    if (academicYear) {
        teacher.academicYear = academicYear;
        await teacher.save();
        return res.status(201).json({ message: "Academic year added to teacher" });
    }

    if (classLevel) {
        teacher.classLevel = classLevel;
        await teacher.save();
        return res.status(201).json({ message: "Class level added to teacher" });
    }

    return res.status(400).json({ message: "No valid fields provided for update" });
});


export {
 getAllteachers,   
 getTeacherProfileByID,
 updateTeacher,
 deleteTeacher,
 assigningTeacherRole
}

  