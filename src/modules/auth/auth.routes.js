import express from 'express';
import *as auth from './auth.controller.js';
import validate from '../../middleware/validate.js';
// import { addauthvalidation } from './auth.validation.js';

const authRouter=express.Router();




authRouter.post('/AdminRegister', auth.AdminRegister)
authRouter.post('/TeacherRegister', auth.TeacherRegister)

authRouter.post("/login",auth.login)

// .get(auth.getAllauths)


// authRouter.route('/:id')
// .get(auth.getauthByID)
// .put( auth.updateauth)
// .delete(auth.deleteauth)

export default authRouter