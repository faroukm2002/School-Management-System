import express from 'express';
import * as auth from './auth.controller.js';
import validate from '../../middleware/validate.js';
import { AdminRegisterValidation, Login, TeacherRegisterValidation,  } from './auth.validation.js';

const authRouter = express.Router();

authRouter.post('/AdminRegister', validate(AdminRegisterValidation) ,auth.AdminRegister);
authRouter.post('/TeacherRegister',  validate(TeacherRegisterValidation), auth.TeacherRegister);
authRouter.post("/login",validate(Login), auth.login);

export default authRouter;
