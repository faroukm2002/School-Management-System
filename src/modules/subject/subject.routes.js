import express from 'express';
import *as subject from './subject.controller.js';
import validate from '../../middleware/validate.js';
import { addSubjectsvalidation, updateSubjectValidation } from './subject.validation.js';
import { deleteClassValidation } from '../class/class.validation.js';

const subjectRouter=express.Router();



subjectRouter.route('/')
.post(validate(addSubjectsvalidation), subject.addSubject)
.get(subject.getAllSubjects)

subjectRouter.route('/:id')
.get(subject.getSubjectByID)
.put(validate(updateSubjectValidation), subject.updateSubject)
.delete(validate(deleteClassValidation), subject.deleteSubject)

export default subjectRouter