import express from 'express';
import *as yearGroup from './yeargroup.controller.js';
import validate from '../../middleware/validate.js';
import { addYearGroupValidation,  } from './yearGroup.validation.js';
import { allowedto } from '../auth/auth.controller.js';

const yearGroupRouter=express.Router();



yearGroupRouter.route('/')
// .get(allowedto('admin'),yearGroup.getAllyearGroups)

yearGroupRouter.route('/:id')
.post(validate(addYearGroupValidation), allowedto('admin'), yearGroup.addYearGroup)

// .get(allowedto('admin'),yearGroup.getyearGroupByID)
// .put(validate(updateyearGrouprValidation),allowedto('admin'), yearGroup.updateyearGroup )
// .delete(validate(deleteyearGroupValidation),allowedto('admin'), yearGroup.deleteyearGroup)

export default yearGroupRouter