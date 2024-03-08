import express from 'express';
import *as teacher from './teacher.controller.js';
import validate from '../../middleware/validate.js';
import {  deleteteacherValidation, updateteaherValidation } from './teacher.validation.js';
import { allowedto } from '../auth/auth.controller.js';
import { getAdminProfileByIDValidation } from '../admin/admin.validation.js';

const teacherRouter=express.Router();



teacherRouter.route('/')
.get(teacher.getAllteachers)

teacherRouter.route('/:id')
.get( validate(getAdminProfileByIDValidation), allowedto('teacher'), teacher.getTeacherProfileByID)
.put(validate(updateteaherValidation), allowedto('teacher'), teacher.updateTeacher)
.delete( validate(deleteteacherValidation),allowedto('admin,teacher'), teacher.deleteTeacher)

export default teacherRouter