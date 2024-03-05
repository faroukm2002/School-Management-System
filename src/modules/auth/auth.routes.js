// Make sure to use CommonJS require syntax if your environment doesn't support ES Modules
import express from 'express';
import * as auth from './auth.controller.js';

const authRouter = express.Router();

authRouter.post('/AdminRegister', auth.AdminRegister);
authRouter.post('/TeacherRegister', auth.TeacherRegister);
authRouter.post("/login", auth.login);

export default authRouter;
