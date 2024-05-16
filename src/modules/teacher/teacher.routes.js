import express from 'express';
import *as teacher from './teacher.controller.js';
import validate from '../../middleware/validate.js';
import {  assigningTeacherRoleValidation, deleteteacherValidation, updateteaherValidation } from './teacher.validation.js';
import { getAdminProfileByIDValidation } from '../admin/admin.validation.js';
import { allowedto } from '../../middleware/authorization.js';

const teacherRouter=express.Router();



teacherRouter.route('/')
.get(allowedto('admin'),teacher.getAllteachers)

teacherRouter.route('/:id')
.get( validate(getAdminProfileByIDValidation), allowedto('teacher'), teacher.getTeacherProfileByID)
.put(validate(updateteaherValidation), allowedto('teacher'), teacher.updateTeacher)
.put(validate(assigningTeacherRoleValidation), allowedto('admin'), teacher.assigningTeacherRole)

.delete( validate(deleteteacherValidation),allowedto('admin'), teacher.deleteTeacher)
teacherRouter.put('/assigningTeacherRole/:id',(validate(assigningTeacherRoleValidation), allowedto('admin'), teacher.assigningTeacherRole))

export default teacherRouter