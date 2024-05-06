import Joi from "joi";

const checkExamResultvalidation = Joi.object({

  examId: Joi.string().hex().length(24).required(), 

});

const updateExamResultValidation = Joi.object({
  id: Joi.string().hex().length(24).required(), 

  IsPublished: Joi.boolean().required()
  }
  

  )



export { 
  checkExamResultvalidation,
  updateExamResultValidation,
};
