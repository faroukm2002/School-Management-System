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

        const teacher=await teacherModel.findById(req.params.id)
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



 const deleteTeacher= deleteOne(teacherModel,"Teacher")




export {
 getAllteachers,   
 getTeacherProfileByID,
 updateTeacher,
 deleteTeacher
}

  