import { parentModel } from "../../../database/models/parent.models.js"
import { Apifeatures } from "../../utils/Apifeatures.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
import { deleteOne } from "../handlers/refactor.js" 


// Get parent
const getAllParents = catchError(async (req, res, next) => {
    let apifeatures = new Apifeatures(parentModel.find().populate('children'), req.query)
        .pagination()
        .search();
    
    // Execute the query
    const parents = await apifeatures.mongooseQuery;

    res.status(200).json({ message: 'Here is the list of parents with children details', page: apifeatures.page, parents });
});




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

  