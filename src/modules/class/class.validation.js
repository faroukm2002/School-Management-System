import Joi from "joi";

const addClassvalidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().min(2).max(1000).required(),
  teachers: Joi.string().hex().length(24),
  subjects: Joi.string().hex().length(24),

});

const updateteaherValidation = Joi.object({
   
    id: Joi.string().hex().length(24).required(), 
    name: Joi.string().min(2).max(20),
    description: Joi.string().min(2).max(1000),
    teachers: Joi.string().hex().length(24),
    subjects: Joi.string().hex().length(24),

  }
  

  )

const deleteClassValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export { 
  addClassvalidation,
  updateteaherValidation,
  deleteClassValidation
};
