import express from 'express';
import *as parent from './parent.controller.js';
import validate from '../../middleware/validate.js';
import {  deleteParentValidation, updateParentValidation,  } from './student.validation.js';
import { allowedto } from '../auth/auth.controller.js';

const parentRouter=express.Router();



studentRouter.route('/')
.get(student.getAllStudents)


studentRouter.route('/:id')
.put(validate(updateParentValidation), allowedto('parent'),parent.updateStudent)

.delete( validate(deleteParentValidation),allowedto('admin','parent'),parent.deleteStudent)

export default parentRouter