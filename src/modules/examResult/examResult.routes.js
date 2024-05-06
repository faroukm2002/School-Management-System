import express from 'express';
import *as exam from './examResult.controller.js';
import validate from '../../middleware/validate.js';
import { allowedto } from '../auth/auth.controller.js';
import { addExamvalidation, deleteExamValidation, updateExamrValidation } from './examResult.validation.js';

const examRouter=express.Router();



examRouter.route('/')
.post(validate(addExamvalidation), allowedto('teacher'), exam.addExam)
.get(allowedto('admin'),exam.getAllExams)

examRouter.route('/:id')
.get(allowedto('admin'),exam.getExamByID)
.put(validate(updateExamrValidation),allowedto('teacher'), exam.updateExam )
.delete(validate(deleteExamValidation),allowedto('admin'), exam.deleteExam)

export default examRouter