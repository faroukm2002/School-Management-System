import express from 'express';
import *as admin from './admin.controller.js';
import validate from '../../middleware/validate.js';
import { deleteAdminValidation, getAdminProfileByIDValidation, updateAdminValidation } from './admin.validation.js';
import { allowedto } from '../../middleware/authorization.js';

const adminRouter=express.Router();



adminRouter.route('/')
// .post(validate(addAdminvalidation), admin.addAdmin)
.get( admin.getAllAdmins)


adminRouter.route('/:id')
.get(validate(getAdminProfileByIDValidation), allowedto('admin'), admin.getAdminProfileByID)
.put( allowedto('admin'),validate(updateAdminValidation) ,admin.updateAdmin)
.delete(allowedto('admin'),validate(deleteAdminValidation),admin.deleteAdmin)

export default adminRouter