import express from 'express';
import *as subject from './subject.controller.js';
import validate from '../../middleware/validate.js';
import { addSubjectsvalidation, updateSubjectValidation } from './subject.validation.js';
import { deleteClassValidation } from '../class/class.validation.js';
import { allowedto } from '../../middleware/authorization.js';

const subjectRouter=express.Router();



subjectRouter.route('/')
.post(validate(addSubjectsvalidation), allowedto('admin') ,subject.addSubject)
.get(subject.getAllSubjects)

subjectRouter.route('/:id')
.get(allowedto('admin'), subject.getSubjectByID)
.put(validate(updateSubjectValidation), allowedto('admin'), subject.updateSubject)
.delete(validate(deleteClassValidation), allowedto('admin'),subject.deleteSubject)

export default subjectRouter