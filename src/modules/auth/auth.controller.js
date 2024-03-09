import { adminModel } from "../../../database/models/admin.models.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import jwt from "jsonwebtoken"; // Correct import
import bcrypt from 'bcrypt';
import { teacherModel } from "../../../database/models/teacher.models.js";
import { selectModel } from "../../middleware/validationRole.js";
import { sendEmail } from "../../../services/emails.js";

// admin register
const AdminRegister = catchError(async (req, res, next) => {
    let {email} = req.body
        let isAdmin = await adminModel.findOne({ email });
        if (isAdmin)  return next(new AppError("Account already exists", 409));

            const admin = new adminModel(req.body); 
            const token = await jwt.sign({ id: admin._id,role: admin.role}, process.env.emailToken)
            sendEmail({email,token}); // Pass the email address from request body
            await admin.save(); // Save admin instance

            res.status(201).json({ message: "Done", admin });
    
});

 


const TeacherRegister = catchError(async (req, res, next) => {
    let isTeacher = await teacherModel.findOne({ email: req.body.email });
    if (isTeacher)  return next(new AppError("Account already exists", 409));

        const teacher = new teacherModel(req.body); 
        await teacher.save(); // Save teacher instance
        res.status(201).json({ message: "Done", teacher });

});






// login(admin,teacher,student)
const login = catchError(async (req, res, next) => {


    const { email, password,role} = req.body;
        // define userCollection
        const userCollection = selectModel(role)

    let admin = await userCollection.findOne({ email });
    
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return next(new AppError("Invalid email or password or role", 401)); 
    }
    
    let token = jwt.sign(
        { name: admin.name, email: admin.email, id: admin._id, role: admin.role, isLoggedIn: true },
        process.env.TOKEN_SIGNATURE
    );
    
    // Success
    res.status(200).json({ message: "Login successful",role, token  }); // Changed status code and message
});







const confirmEmail = catchError(async (req, res, next) => {
    const {token} =req.params

    const decoded= await jwt.verify(token,process.env.emailToken)

    if(!decoded )
      return  next (new (AppError("invalid pay load or it is aready confirmed",400)))
   
       
       await adminModel.findOneAndUpdate({ _id: decoded.id, confirmEmail: false }, { confirmEmail: true });
         res.status(200).json({ message: "Done" }); 
});







// 1- check we have token or not 
// 2- verfy token
// 3 if user of this token exist or not 

const allowedto = (roles) => {
    return catchError(async (req,res, next) => {

        let { token } = req.headers;
        if (!token) return next(new AppError("please provide token", 401))

        let decoded = await jwt.verify(token, process.env.TOKEN_SIGNATURE);
        console.log(decoded)      
          if (!decoded.id || !decoded?.isLoggedIn)  
           return next(new AppError("invalid token Payload", 401))

          
        else {

            const user = await adminModel.findById(decoded.id) ||await teacherModel.findById(decoded.id)
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

export {
    AdminRegister,
    TeacherRegister,
    login,
    confirmEmail,
    allowedto
};
