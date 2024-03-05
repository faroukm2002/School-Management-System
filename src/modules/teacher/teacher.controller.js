import { teacherModel } from "../../../database/models/teacher.models.js"
import { Apifeatures } from "../../utils/Apifeatures.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"



// // Add teacher
// const addTeacher = catchError(async(req,res,next) => {
//     const teacher =new teacherModel(req.body)
//     await teacher.save()
//     res.status(201).json({message:"Done",teacher})

// }) 


// Get teacher
const getAllteachers=catchError(async(req,res,next)=>{
    let apifeatures= new Apifeatures( teacherModel.find(),req.query)
    .pagination().search()
    // created
    const teachers = await apifeatures.mongooseQuery
        res.status(201).json({ message: 'Done this is teachers list', page:apifeatures.page, teachers });
    })


  //  Get Teacher BY_ID
  
    const getTeacherByID=catchError(async(req,res,next)=>{

        const teacher=await teacherModel.findById(req.params.id)
        if (!teacher) {
            next(new AppError(" Teacher not found",404))
        } else {
            res.status(201).json({ message: " Done this is teacher", teacher})
    
        }

    })
     


    // //  Get Teacher profile
    // const GetTeacherProfile = catchError(async (req, res, next) => {
    //     const teacher = await teacherModel.findById(req.user._id); 
    //     console.log(teacher);
    //     if (!teacher) {
    //         next(new AppError("Teacher not found", 404));
    //     } else {
    //         res.status(200).json({ message: "This is the teacher profile", teacher });
    //     }
    // });
    


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
//  addTeacher,
 getAllteachers,   
 getTeacherByID,
//  GetTeacherProfile,
 updateTeacher,
 deleteTeacher
}

  