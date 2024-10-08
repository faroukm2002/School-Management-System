import express from 'express';
import * as auth from './auth.controller.js';
import validate from '../../middleware/validate.js';
import { AdminRegisterValidation, Login, ParentRegisterValidation, StudentRegisterValidation, TeacherRegisterValidation,  } from './auth.validation.js';
import { uploadSingleFile } from '../../multer/multer.js';
import { allowedto } from '../../middleware/authorization.js';

const authRouter = express.Router();

authRouter.post('/AdminRegister',  validate(AdminRegisterValidation) ,auth.AdminRegister);
authRouter.post('/TeacherRegister', uploadSingleFile('image','teacher'),validate(TeacherRegisterValidation),  allowedto('admin'), auth.TeacherRegister);
authRouter.post('/StudentRegister',uploadSingleFile('image','student'), validate(StudentRegisterValidation),  allowedto('admin'), auth.StudentRegister);
authRouter.post('/ParentRegister', validate(ParentRegisterValidation),  allowedto('admin'), auth.ParentRegister);

authRouter.post("/login",validate(Login), auth.login);
authRouter.get("/confirmEmail/:token",auth.confirmEmail)

export default authRouter;
