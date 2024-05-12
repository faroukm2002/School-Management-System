import { programModel } from "../../../database/models/Academic/program.models.js"
import { adminModel } from "../../../database/models/admin.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"



// Add Program
const addProgram = catchError(async(req, res, next) => {
    req.body.createdBy = req.user._id;
    const existProgram = await programModel.findOne({ name: req.body.name });
    if (existProgram) return next(new AppError('Program Already Exists', 404));

    const Program = await programModel.create(req.body);
    if (Program) {
    const admin = await adminModel.findById(req.user._id);
    admin.program.push(Program._id);
    await admin.save();
    }
     res.status(201).json({ message: "Done", Program });
}); 


// Get Program
const getAllPrograms = catchError(async (req, res, next) => {
    let Program = await ProgramModel.find();
    // created
      res.status(201).json({ message: "Done this is Program", Program });
  });


  //  Get Program BY_ID
  
    const getProgramByID=catchError(async(req,res,next)=>{

        const Program=await ProgramModel.findById(req.params.id)
        !Program && next(new AppError('Program not found',404))

        Program &&   res.status(201).json({message:"this is Program",Program})

    })
     



    


const updateProgram= catchError(async(req,res,next)=>{
    req.body.updatedBy = req.user._id
    const{id}=req.params
    const Program=await ProgramModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !Program && next(new AppError('Program not found',404))

      Program &&   res.status(201).json({message:"this is Program",Program})
}
)


 const deleteProgram= deleteOne(programModel,"Program")




export {
 addProgram,
 getAllPrograms,   
 getProgramByID,
 updateProgram,
 deleteProgram
}

  