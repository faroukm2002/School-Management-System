import express from 'express';
import * as auth from './auth.controller.js';
import validate from '../../middleware/validate.js';
import { AdminRegisterValidation, Login, UserRegisterValidation,  } from './auth.validation.js';

const authRouter = express.Router();

authRouter.post('/AdminRegister', validate(AdminRegisterValidation) ,auth.AdminRegister);
authRouter.post('/TeacherRegister', validate(UserRegisterValidation),  auth.allowedto('admin'), auth.TeacherRegister);
authRouter.post('/TeacherRegister', validate(UserRegisterValidation),  auth.allowedto('admin'), auth.TeacherRegister);

authRouter.post("/login",validate(Login), auth.login);
authRouter.get("/confirmEmail/:token",auth.confirmEmail)

export default authRouter;
