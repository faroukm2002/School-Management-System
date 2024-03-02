import express from 'express';
import *as ClassLevel from './class.controller.js';
import validate from '../../middleware/validate.js';
import { addClassvalidation, deleteClassValidation, updateteaherValidation } from './class.validation.js';

const ClassLevelRouter=express.Router();



ClassLevelRouter.route('/')
.post(validate(addClassvalidation), ClassLevel.addClassLevel)
.get(ClassLevel.getAllClasslevels)

ClassLevelRouter.route('/:id')
.get(ClassLevel.getClasslevelByID)
.put(validate(updateteaherValidation), ClassLevel.updateClasslevel )
.delete(validate(deleteClassValidation), ClassLevel.deleteClasslevel)

export default ClassLevelRouter