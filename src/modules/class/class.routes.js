import express from 'express';
import *as ClassLevel from './class.controller.js';
import validate from '../../middleware/validate.js';
import { addClassvalidation, deleteClassValidation, updateClassValidation } from './class.validation.js';
import { allowedto } from '../auth/auth.controller.js';

const ClassLevelRouter=express.Router();



ClassLevelRouter.route('/')
.post(validate(addClassvalidation), allowedto('admin'), ClassLevel.addClassLevel)
.get(ClassLevel.getAllClasslevels)

ClassLevelRouter.route('/:id')
.get(allowedto('admin'),ClassLevel.getClasslevelByID)
.put(validate(updateClassValidation),allowedto('admin'), ClassLevel.updateClasslevel )
.delete(validate(deleteClassValidation),allowedto('admin'), ClassLevel.deleteClasslevel)

export default ClassLevelRouter