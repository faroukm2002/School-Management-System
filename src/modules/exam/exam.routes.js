import express from 'express';
import *as exam from './exam.controller.js';
import validate from '../../middleware/validate.js';
import { allowedto } from '../auth/auth.controller.js';
import { addExamvalidation } from './exam.validation.js';

const examRouter=express.Router();



examRouter.route('/')
.post(validate(addExamvalidation), allowedto('teacher'), exam.addExam)
// .get(allowedto('admin'),exam.getAllexams)

// examRouter.route('/:id')
// .get(allowedto('admin'),exam.getexamByID)
// .put(validate(updateexamrValidation),allowedto('admin'), exam.updateexam )
// .delete(validate(deleteexamValidation),allowedto('admin'), exam.deleteexam)

export default examRouter