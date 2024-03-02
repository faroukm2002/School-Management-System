import express from 'express';
import *as admin from './admin.controller.js';
import validate from '../../middleware/validate.js';

const adminRouter=express.Router();



adminRouter.route('/')
.post(admin.addAdmin)
.get(admin.getAlladmins)


adminRouter.route('/:id')
.get(admin.getAdminByID)
.put( admin.updateAdmin)

export default adminRouter