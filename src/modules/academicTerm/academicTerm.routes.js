import express from 'express';
import *as academicTerm from './academicTerm.controller.js';
import validate from '../../middleware/validate.js';
import { addAcademicTermvalidation, deleteAcademicTermValidation, updateAcademicTermrValidation, } from './academicTerm.validation.js';
import { allowedto } from '../../middleware/authorization.js';

const academicTermRouter=express.Router();



academicTermRouter.route('/')
.post(validate(addAcademicTermvalidation), allowedto('admin'), academicTerm.addAcademicTerm)
.get(allowedto('admin'),academicTerm.getAllAcademicTerms)

academicTermRouter.route('/:id')
.get(allowedto('admin'),academicTerm.getAcademicTermByID)
.put(validate(updateAcademicTermrValidation),allowedto('admin'), academicTerm.updateAcademicTerm )
.delete(validate(deleteAcademicTermValidation),allowedto('admin'), academicTerm.deleteAcademicTerm)

export default academicTermRouter