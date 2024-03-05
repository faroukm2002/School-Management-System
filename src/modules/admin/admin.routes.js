import express from 'express';
import *as admin from './admin.controller.js';
import validate from '../../middleware/validate.js';
import { addAdminvalidation } from './admin.validation.js';

const adminRouter=express.Router();



adminRouter.route('/')
.post(validate(addAdminvalidation), admin.addAdmin)
.get(admin.getAlladmins)


adminRouter.route('/:id')
.get(admin.getAdminByID)
.put( admin.updateAdmin)
.delete(admin.deleteAdmin)

export default adminRouter