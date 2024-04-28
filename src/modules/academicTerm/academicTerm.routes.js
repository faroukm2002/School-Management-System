import express from 'express';
import *as academicTerm from './academicTerm.controller.js';
import validate from '../../middleware/validate.js';
import { addAcademicTermvalidation, } from './academicTerm.validation.js';
import { allowedto } from '../auth/auth.controller.js';
import { deleteClassValidation } from '../class/class.validation.js';

const academicTermRouter=express.Router();



academicTermRouter.route('/')
.post(validate(addAcademicTermvalidation), allowedto('admin'), academicTerm.addAcademicTerm)
.get(academicTerm.getAllAcademicTerms)

academicTermRouter.route('/:id')
.get(allowedto('admin'),academicTerm.getAcademicTermByID)
// .put(validate(updateteaherValidation),allowedto('admin'), academicTerm.updateacademicTerm )
.delete(validate(deleteClassValidation),allowedto('admin'), academicTerm.deleteAcademicTerm)

export default academicTermRouter