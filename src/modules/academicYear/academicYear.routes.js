import express from 'express';
import *as academicYear from './academicYear.controller.js';
import validate from '../../middleware/validate.js';
import { addAcademicYearvalidation, deleteAcademicYearValidation, updateAcademicYearrValidation, } from './academicYear.validation.js';
import { allowedto } from '../auth/auth.controller.js';

const academicYearRouter=express.Router();



academicYearRouter.route('/')
.post(validate(addAcademicYearvalidation), allowedto('admin'), academicYear.addAcademicYear)
.get(allowedto('admin'),academicYear.getAllAcademicYears)

academicYearRouter.route('/:id')
.get(allowedto('admin'),academicYear.getAcademicYearByID)
.put(validate(updateAcademicYearrValidation),allowedto('admin'), academicYear.updateAcademicYear )
.delete(validate(deleteAcademicYearValidation),allowedto('admin'), academicYear.deleteAcademicYear)

export default academicYearRouter