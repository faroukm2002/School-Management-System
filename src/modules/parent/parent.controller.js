import { parentModel } from "../../../database/models/parent.models.js"
import { Apifeatures } from "../../utils/Apifeatures.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js" 


// Get parent
const getAllParents=catchError(async(req,res,next)=>{
    let apifeatures= new Apifeatures( parentModel.find(),req.query)
    .pagination().search()
    // created
    const parents = await apifeatures.mongooseQuery
        res.status(201).json({ message: 'Done this is parents list', page:apifeatures.page, parents });
    })




//  Update parent 
const updateParent= catchError(async(req,res,next)=>{
    const{id}=req.params
    const parent=await parentModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    !parent && next(new AppError('parent not found',404))

      parent &&   res.status(201).json({message:"Done",parent})
}
)





 const deleteparent= deleteOne(parentModel,"parent")




export {
 getAllParents,   
 updateParent,
 deleteparent
}

  