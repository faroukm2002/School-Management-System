import { adminModel } from "../../../database/models/admin.models.js";
import { classModel } from "../../../database/models/class.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"



// Add class
const addClassLevel = catchError(async(req, res, next) => {
    req.body.createdby = req.user._id;
    const existClassLevel = await classModel.findOne({ name: req.body.name });
    if (existClassLevel) return next(new AppError('ClassLevel Already Exists', 404));

    const ClassLevelCreated = await classModel.create(req.body);
    const admin = await adminModel.findById(req.user._id);
    admin.classLevel.push(ClassLevelCreated._id);
    await admin.save();
   
     res.status(201).json({ message: "Done", ClassLevelCreated });
});






// Get Classlevel
const getAllClasslevels = catchError(async (req, res, next) => {
    let Classlevel = await classModel.find();
    // created
      res.status(201).json({ message: "Done this is Classlevel", Classlevel });
  });


  //  Get Classlevel BY_ID
  
    const getClasslevelByID=catchError(async(req,res,next)=>{

        const Classlevel=await classModel.findById(req.params.id)
        !Classlevel && next(new AppError('Classlevel not found',404))

        Classlevel &&   res.status(201).json({message:"this is Classlevel",Classlevel})

    })
     



    


const updateClasslevel= catchError(async(req,res,next)=>{
    const{id}=req.params
    req.body.updatedBy = req.user._id

    const Classlevel=await classModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !Classlevel && next(new AppError('Classlevel not found',404))

      Classlevel &&   res.status(201).json({message:"this is Classlevel",Classlevel})
}
)


 const deleteClasslevel= deleteOne(classModel,"Classlevel")




export {
 addClassLevel,
 getAllClasslevels,   
 getClasslevelByID,
 updateClasslevel,
 deleteClasslevel
}

  