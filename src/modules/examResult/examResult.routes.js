import express from 'express';
import *as examResult from './examResult.controller.js';
import validate from '../../middleware/validate.js';
import { allowedto } from '../auth/auth.controller.js';
import { checkExamResultvalidation, updateExamResultValidation } from './examResult.validation.js';

const examResultRouter=express.Router();



examResultRouter.route('/:examId')
    .get(validate(checkExamResultvalidation), allowedto('student'), examResult.checkExamResult);


examResultRouter.route('/:id')
.put(validate(updateExamResultValidation),allowedto('admin'), examResult.publishedExamResult )
// .get(validate(checkExamResultvalidation),allowedto('student'),examResult.checkExamResult)

export default examResultRouter