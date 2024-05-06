import express from 'express';
import *as question from './question.controller.js';
import validate from '../../middleware/validate.js';
import { allowedto } from '../auth/auth.controller.js';
import { addQuestionvalidation, deleteQuestionValidation, updateQuestionValidation, } from './question.validation.js';

const   questionRouter=express.Router();



questionRouter.route('/')
.get(allowedto('teacher'),question.getAllQuestions)

questionRouter.route('/:id')
.post(validate(addQuestionvalidation), allowedto('teacher'), question.addQuestion)
.get(allowedto('teacher'),question.getQuestionByID)
.put(validate(updateQuestionValidation),allowedto('teacher'), question.updateQuestion )
.delete(validate(deleteQuestionValidation),allowedto('teacher'), question.deleteQuestion)

export default questionRouter