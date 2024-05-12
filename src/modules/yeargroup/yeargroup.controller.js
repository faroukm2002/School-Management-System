import { yeargroupModel } from "../../../database/models/Academic/yeargroup.models.js";
import { adminModel } from "../../../database/models/admin.models.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js"


//  Add YearGroup
const addYearGroup = catchError(async(req, res, next) => {
    req.body.createdby = req.user._id;
    req.body.academicYear = req.params.id;
    const existYearGroup = await yeargroupModel.findOne({ name: req.body.name });
    if (existYearGroup) return next(new AppError('YearGroup Already Exists', 404));

    const YearGroub =new yeargroupModel(req.body)
    await YearGroub.save()
    res.status(201).json({message:"Done",YearGroub})

});


// Get YearGroups
const getAllYearGroups = catchError(async (req, res, next) => {
    let YearGroup = await YearGroupModel.find();
      res.status(201).json({ message: "Done this is YearGroup", YearGroup });
  });


  //  Get YearGroup BY_ID
  
    const getYearGroupByID=catchError(async(req,res,next)=>{

        const YearGroup=await YearGroupModel.findById(req.params.id)
        !YearGroup && next(new AppError('YearGroup not found',404))

        YearGroup &&   res.status(201).json({message:"this is YearGroup",YearGroup})

    })
     



    


const updateYearGroup= catchError(async(req,res,next)=>{
    const{id}=req.params
    req.body.updatedBy = req.user._id

    const YearGroup=await YearGroupModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !YearGroup && next(new AppError('YearGroup not found',404))

      YearGroup &&   res.status(201).json({message:"this is YearGroup",YearGroup})
}
)


 const deleteYearGroup= deleteOne(yeargroupModel,"YearGroup")  




export {
    addYearGroup,
 getAllYearGroups,   
 getYearGroupByID,
 updateYearGroup,
 deleteYearGroup
}

  