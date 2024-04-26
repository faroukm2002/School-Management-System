import { adminModel } from "../../../database/models/admin.models.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import jwt from "jsonwebtoken"; // Correct import
import bcrypt from 'bcrypt';
import { teacherModel } from "../../../database/models/teacher.models.js";
import { selectModel } from "../../middleware/validationRole.js";
import { sendEmail } from "../../../services/emails.js";
import { studentModel } from "../../../database/models/student.models.js";
import { parentModel } from "../../../database/models/parent.models.js";
import { request } from "express";

// admin register
const AdminRegister = catchError(async (req, res, next) => {
    let {email} = req.body
        let isAdmin = await adminModel.findOne({ email });
        if (isAdmin)  return next(new AppError("Account already exists", 409));

            const admin = new adminModel(req.body); 
            const token = await jwt.sign({ id: admin._id,role: admin.role}, process.env.emailToken)
        const link=`${process.env.BASEURL}/api/v1/auth/confirmEmail/${token}`
            sendEmail({email,link}); // Pass the email address from request body
            await admin.save(); // Save admin instance

            res.status(201).json({ message: "Done", admin });
    
});

 

// TeacherRegister

const TeacherRegister = catchError(async (req, res, next) => {
    req.body.image=req.file.filename

    let {email} = req.body

    let isTeacher = await teacherModel.findOne({ email });
    if (isTeacher)  return next(new AppError("Account already exists", 409));

    const teacher = new teacherModel(req.body); 
    const token = await jwt.sign({ id: teacher._id,role: teacher.role}, process.env.emailToken)
const link=`${process.env.BASEURL}/api/v1/auth/confirmEmail/${token}`
    sendEmail({email,link}); // Pass the email address from request body
    await teacher.save(); // Save teacher instance
    res.status(201).json({ message: "Done", teacher });

});


// StudentRegister
const StudentRegister = catchError(async (req, res, next) => {
   
    req.body.image=req.file.filename
    let {email} = req.body
    let isStudent = await studentModel.findOne({ email });
    if (isStudent)  return next(new AppError("Account already exists", 409));

    const student = new studentModel(req.body); 
    const token = await jwt.sign({ id: student._id,role: student.role}, process.env.emailToken)
const link=`${process.env.BASEURL}/api/v1/auth/confirmEmail/${token}`
    sendEmail({email,link}); // Pass the email address from request body
    await student.save(); // Save student instance
    res.status(201).json({ message: "Done", student });

});

 
// ParentRegister
const ParentRegister = catchError(async (req, res, next) => {
    let {email} = req.body

    let isParent = await parentModel.findOne({ email });
    if (isParent)  return next(new AppError("Account already exists", 409));

    const Parent = new parentModel(req.body); 
    const token = await jwt.sign({ id: Parent._id,role: Parent.role}, process.env.emailToken)
const link=`${process.env.BASEURL}/api/v1/auth/confirmEmail/${token}`
    sendEmail({email,link}); // Pass the email address from request body
    await Parent.save(); // Save Parent instance
    res.status(201).json({ message: "Done", Parent });

});


// login(admin,teacher,student)
const login = catchError(async (req, res, next) => {


    const { email, password,role} = req.body;
        // define userCollection
        const userCollection = selectModel(role)

    let user = await userCollection.findOne({ email });
    
    if (!user || !bcrypt.compareSync(password, user.password)  ) 
        return next(new AppError("Invalid email or password or role", 401)); 
    
        if(!user.confirmEmail)  
          return next(new AppError("confirm you email frist", 403)); 

    let token = jwt.sign(
        { name: user.name, email: user.email, id: user._id, role: user.role, isLoggedIn: true },
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
   
       
      const  userCollection = selectModel(decoded.role)
 const User= await userCollection.findOneAndUpdate({_id:decoded.id,confirmEmail:false},{confirmEmail:true})
  return res.status(200).json({message:"email confirmed successfuly",UserId:User._id})

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

export {
    AdminRegister,
    TeacherRegister,
    StudentRegister,
    login,
    confirmEmail,
    allowedto,
    ParentRegister
};
