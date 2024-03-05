import express from 'express';
import *as teacher from './teacher.controller.js';
import validate from '../../middleware/validate.js';
import {  deleteteacherValidation, updateteaherValidation } from './teacher.validation.js';

const teacherRouter=express.Router();



teacherRouter.route('/')
// .post(validate(addteachervalidation), teacher.addTeacher)
.get(teacher.getAllteachers)

// teacherRouter.get('/profile',teacher.GetTeacherProfile)
teacherRouter.route('/:id')
.get(teacher.getTeacherByID)
.put(validate(updateteaherValidation), teacher.updateTeacher)
.delete(validate(deleteteacherValidation),teacher.deleteTeacher)

export default teacherRouter