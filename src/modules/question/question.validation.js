import Joi from "joi";

const addQuestionvalidation = Joi.object({
  id: Joi.string().hex().length(24).required(), 

  question: Joi.string().required(),
  optionA: Joi.string().required(),
  optionB: Joi.string().required(),
  optionC: Joi.string().required(),
  optionD: Joi.string().required(),
  correctAnswer:Joi.string().required(),

});
 
const updateQuestionValidation = Joi.object({
   
    id: Joi.string().hex().length(24).required(), 
    name: Joi.string().min(2).max(20),
    optionA: Joi.string(),
    optionB: Joi.string(),
    optionC: Joi.string(),
    optionD: Joi.string(),
    correctAnswer:Joi.string()

  }
  

  )

const deleteQuestionValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export { 
  addQuestionvalidation, 
  updateQuestionValidation,
  deleteQuestionValidation
};
