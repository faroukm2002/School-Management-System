import Joi from "joi";

const addAcademicTermvalidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().min(2).max(1000).required(),
  duration: Joi.string().min(2).max(1000).required(),

});

const updateAcademicTermrValidation = Joi.object({
   
    id: Joi.string().hex().length(24).required(), 
    name: Joi.string().min(2).max(20),
    description: Joi.string().min(2).max(1000),
    duration: Joi.string().min(2).max(1000).required(),

  }
  

  )

const deleteAcademicTermValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export { 
  addAcademicTermvalidation,
  updateAcademicTermrValidation,
  deleteAcademicTermValidation
};
