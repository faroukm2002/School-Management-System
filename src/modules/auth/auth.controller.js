import { adminModel } from "../../../database/models/admin.models.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import jwt from "jsonwebtoken"; // Correct import
import bcrypt from 'bcrypt';
import { teacherModel } from "../../../database/models/teacher.models.js";

// admin register
const AdminRegister = catchError(async (req, res, next) => {
        let isAdmin = await adminModel.findOne({ email: req.body.email });
        if (isAdmin)  return next(new AppError("Account already exists", 409));

            const admin = new adminModel(req.body); 
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






// login
const login = catchError(async (req, res, next) => {
    const { email, password } = req.body;
    let admin = await adminModel.findOne({ email });
    
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return next(new AppError("Invalid email or password", 401)); 
    }
    
    let token = jwt.sign(
        { name: admin.name, email: admin.email, id: admin._id, role: admin.role, isLoggedIn: true },
        process.env.TOKEN_SIGNATURE
    );
    
    // Success
    res.status(200).json({ message: "Login successful", token }); // Changed status code and message
});


    
export {
    AdminRegister,
    TeacherRegister,
    login
};
