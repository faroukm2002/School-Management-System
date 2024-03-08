import { classModel } from "../../../database/models/class.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"



// Add class
const addClassLevel = catchError(async(req,res,next) => {
    
    req.body.createdby = req.user._id
    const ExistClassLevel = await classModel.findOne({ name:req.body.name })
    if (ExistClassLevel) return next(new AppError('Classlevel Aready Exist',404))

    const ClassLevel =new classModel(req.body)
    await ClassLevel.save()
    res.status(201).json({message:"Done",ClassLevel})

}) 


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

  