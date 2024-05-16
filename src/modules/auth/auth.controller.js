import { adminModel } from "../../../database/models/admin.models.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import bcrypt from 'bcrypt';
import { teacherModel } from "../../../database/models/teacher.models.js";
import { selectModel } from "../../middleware/validationRole.js";
import { sendEmail } from "../../../services/emails.js";
import { studentModel } from "../../../database/models/student.models.js";
import { parentModel } from "../../../database/models/parent.models.js";
import generateToken from "../../utils/generateToken.js"; // Correct import
import verifyToken from "../../utils/verifyToken.js"; // Correct import

// admin register
const AdminRegister = catchError(async (req, res, next) => {
    let { email } = req.body;
    let isAdmin = await adminModel.findOne({ email });
    if (isAdmin)  return next(new AppError("Account already exists", 409));

    const admin = new adminModel(req.body); 
    const token = generateToken({ id: admin._id, role: admin.role });
    const link = `${process.env.BASEURL}/api/v1/auth/confirmEmail/${token}`;
    sendEmail({ email, link }); // Pass the email address from request body
    await admin.save(); // Save admin instance

    res.status(201).json({ message: "Done", admin });
});

// TeacherRegister
const TeacherRegister = catchError(async (req, res, next) => {
    req.body.image = req.file.filename; 
    req.body.createdBy = req.user._id; 

    let { email } = req.body;

    let isTeacher = await teacherModel.findOne({ email });
    if (isTeacher)  
        return next(new AppError("Account already exists", 409));

    const teacher = new teacherModel(req.body); 

    const token = generateToken({ id: teacher._id, role: teacher.role });

    const link = `${process.env.BASEURL}/api/v1/auth/confirmEmail/${token}`;

    sendEmail({ email, link });

    await teacher.save(); 

    res.status(201).json({ message: "Done", teacher });
});

// StudentRegister
const StudentRegister = catchError(async (req, res, next) => {

    req.body.image=req.file.filename
    let {email} = req.body
    let isStudent = await studentModel.findOne({ email });
    if (isStudent)  return next(new AppError("Account already exists", 409));

    const student = new studentModel(req.body); 
    const token = generateToken({ id: student._id, role: student.role });
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
    const token = generateToken({ id: Parent._id, role: Parent.role });
    const link=`${process.env.BASEURL}/api/v1/auth/confirmEmail/${token}`
    sendEmail({email,link}); // Pass the email address from request body
    await Parent.save(); // Save Parent instance
    res.status(201).json({ message: "Done", Parent });
});

// login (admin, teacher, student)
const login = catchError(async (req, res, next) => {
    const { email, password, role } = req.body;

    const userCollection = selectModel(role);
    const user = await userCollection.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password))
        return next(new AppError('Invalid email or password or role', 401));

    if (!user.confirmEmail)
        return next(new AppError('Please confirm your email first', 403));

    const token = generateToken({
        id: user._id,
        role: user.role,
        isLoggedIn: true
    });


    res.status(201).json({ message: "Login success", role, loginToken: token });
});

const confirmEmail = catchError(async (req, res, next) => {
    const { token } = req.params;

    const decoded = verifyToken(token);

    if (!decoded) {
        return next(new AppError("Invalid payload or email already confirmed", 400));
    }

    const userCollection = selectModel(decoded.role);
    const User = await userCollection.findOneAndUpdate(
        { _id: decoded.id, confirmEmail: false },
        { confirmEmail: true }
    );

    return res.status(200).json({ message: "Email confirmed successfully", UserId: User._id });
});

export {
    AdminRegister,
    TeacherRegister,
    StudentRegister,
    login,
    confirmEmail,
    ParentRegister
};
