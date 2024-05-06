import express from 'express';
import *as question from './question.controller.js';
import validate from '../../middleware/validate.js';
import { allowedto } from '../auth/auth.controller.js';
import { addQuestionvalidation, } from './question.validation.js';

const   questionRouter=express.Router();



// questionRouter.route('/')
// .get(allowedto('admin'),question.getAllQuestions)

questionRouter.route('/:id')
.post(validate(addQuestionvalidation), allowedto('teacher'), question.addQuestion)
// .get(allowedto('admin'),question.getQuestionByID)
// .put(validate(updateQuestionrValidation),allowedto('admin'), question.updateQuestion )
// .delete(validate(deleteQuestionValidation),allowedto('admin'), question.deleteQuestion)

export default questionRouter