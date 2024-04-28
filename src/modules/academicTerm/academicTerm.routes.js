import express from 'express';
import *as academicTerm from './academicTerm.controller.js';
import validate from '../../middleware/validate.js';
import { addAcademicTermvalidation, } from './academicTerm.validation.js';
import { allowedto } from '../auth/auth.controller.js';

const academicTermRouter=express.Router();



academicTermRouter.route('/')
.post(validate(addAcademicTermvalidation), allowedto('admin'), academicTerm.addAcademicTerm)
// .get(academicTerm.getAllacademicTerms)

// academicTermRouter.route('/:id')
// .get(allowedto('admin'),academicTerm.getacademicTermByID)
// .put(validate(updateteaherValidation),allowedto('admin'), academicTerm.updateacademicTerm )
// .delete(validate(deleteClassValidation),allowedto('admin'), academicTerm.deleteacademicTerm)

export default academicTermRouter