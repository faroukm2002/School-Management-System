import express from 'express';
import *as parent from './parent.controller.js';
import validate from '../../middleware/validate.js';
   import { deleteParentValidation, updateParentValidation } from './parent.validation.js';
import { allowedto } from '../../middleware/authorization.js';

const parentRouter=express.Router();



parentRouter.route('/')
.get(parent.getAllParents)


parentRouter.route('/:id')
.put(validate(updateParentValidation), allowedto('parent'), parent.updateParent)

.delete( validate(deleteParentValidation),allowedto('admin','parent'), parent.deleteparent)

export default parentRouter