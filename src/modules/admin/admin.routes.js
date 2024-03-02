import express from 'express';
import *as admin from './admin.controller.js';
import validate from '../../middleware/validate.js';

const adminRouter=express.Router();



adminRouter.route('/')
.post(admin.addAdmin)


export default adminRouter