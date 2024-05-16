import { adminModel } from "../../database/models/admin.models.js";
import { parentModel } from "../../database/models/parent.models.js";
import { studentModel } from "../../database/models/student.models.js";
import { teacherModel } from "../../database/models/teacher.models.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "../utils/catchError.js";


// 1- check we have token or not 
// 2- verfy token
// 3 if user of this token exist or not 


const allowedto = (roles) => {
    return catchError(async (req,res, next) => {

        let { token } = req.headers;
        if (!token) return next(new AppError("please provide token", 401))

            let decoded = verifyToken(token);
            console.log(decoded)      
          if (!decoded.id || !decoded?.isLoggedIn)  
           return next(new AppError("invalid token Payload", 401))


        else {

            const user = await adminModel.findById(decoded.id)
             ||await teacherModel.findById(decoded.id)
             ||await studentModel.findById(decoded.id)
            ||await parentModel.findById(decoded.id)
            if (!user) {
                res.status(404).json({ message: " validation error ,user not found" })

            } else {
                if (!roles.includes(user.role)) {
                    next (new AppError("You are not authorized to access this route. " , 401))
                } else {
                    req.user = user
                    next() 
                }

            }

        }

    })

}
 export{
    allowedto
 }