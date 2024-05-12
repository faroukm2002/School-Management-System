import express from 'express';
import *as program from './program.controller.js';
import validate from '../../middleware/validate.js';
import { addProgramValidation} from './program.validation.js';
import { allowedto } from '../auth/auth.controller.js';

const programRouter=express.Router();



programRouter.route('/')
.post(validate(addProgramValidation), allowedto('admin') ,program.addProgram)
// .get(program.getAllprograms)

// programRouter.route('/:id')
// .get(allowedto('admin'), program.getprogramByID)
// .put(validate(updateprogramValidation), allowedto('admin'), program.updateprogram)
// .delete(validate(deleteClassValidation), allowedto('admin'),program.deleteprogram)

export default programRouter