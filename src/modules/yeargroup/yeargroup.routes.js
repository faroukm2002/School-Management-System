import express from 'express';
import *as yearGroup from './yeargroup.controller.js';
import validate from '../../middleware/validate.js';
import { addYearGroupValidation,deleteYearGroupValidation,updateYearGroupValidation  } from './yearGroup.validation.js';
import { allowedto } from '../../middleware/authorization.js';

const yearGroupRouter=express.Router();



yearGroupRouter.route('/')
.get(allowedto('admin'),yearGroup.getAllYearGroups)

yearGroupRouter.route('/:id')
.post(validate(addYearGroupValidation), allowedto('admin'), yearGroup.addYearGroup)

.get(allowedto('admin'),yearGroup.getYearGroupByID)
.put(validate(updateYearGroupValidation),allowedto('admin'), yearGroup.updateYearGroup )
.delete(validate(deleteYearGroupValidation),allowedto('admin'), yearGroup.deleteYearGroup)

export default yearGroupRouter