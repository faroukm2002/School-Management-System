import express from 'express';
import *as student from './student.controller.js';
import validate from '../../middleware/validate.js';
import {  deleteStudentValidation,  getStudentProfileByIdValidation,  updaStudentValidation,  } from './student.validation.js';
import { allowedto } from '../../middleware/authorization.js';

const studentRouter=express.Router();



studentRouter.route('/')
.get(student.getAllStudents)

// updateStudentDataByAdmin
studentRouter.put("/updateStudentDataByAdmin/:id",( allowedto('admin'), student.updateStudentDataByAdmin))

studentRouter.route('/:id')
.get( validate(getStudentProfileByIdValidation), allowedto('student'), student.getStudentProfileByID)
.put(validate(updaStudentValidation), allowedto('student'), student.updateStudent)

.delete( validate(deleteStudentValidation),allowedto('admin'), student.deleteStudent)
.post( allowedto('admin'), student.promotingStudent)

export default studentRouter