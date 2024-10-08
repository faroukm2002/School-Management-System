import express from 'express';
import *as program from './program.controller.js';
import validate from '../../middleware/validate.js';
import { addProgramValidation, deleteProgramValidation, updateProgramValidation} from './program.validation.js';
import { allowedto } from '../../middleware/authorization.js';

const programRouter=express.Router();



programRouter.route('/')
.post(validate(addProgramValidation), allowedto('admin') ,program.addProgram)
.get(allowedto('admin'),program.getAllPrograms)

programRouter.route('/:id')
.get(allowedto('admin'), program.getProgramByID)
.put(validate(updateProgramValidation), allowedto('admin'), program.updateProgram)
.delete(validate(deleteProgramValidation), allowedto('admin'),program.deleteProgram)

export default programRouter