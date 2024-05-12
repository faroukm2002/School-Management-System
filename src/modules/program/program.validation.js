import Joi from "joi";

const addSubjectsvalidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().min(2).max(1000).required(),
  duration: Joi.string().default("3 months"),
  teachers: Joi.string().hex().length(24),

});

const updateSubjectValidation = Joi.object({
   
    id: Joi.string().hex().length(24).required(), 
    name: Joi.string().min(2).max(20),
    description: Joi.string().min(2).max(1000),
    duration: Joi.string(),
  }
    

  )

const deleteSubjectsValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export { 
  addSubjectsvalidation,
  updateSubjectValidation,
  deleteSubjectsValidation
};
