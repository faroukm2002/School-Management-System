import Joi from "joi";

const addExamvalidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  examTime: Joi.string().required(),
  examDate: Joi.string().required(),
  examType: Joi.string().required(),
  examStatus: Joi.string().required(),

  examType: Joi.string().required(),
  totalMark: Joi.number().required(),
  passMark: Joi.number().required(),

  academicTermId: Joi.string().hex().length(24).required(), 
  academicYearId: Joi.string().hex().length(24).required(), 
  program: Joi.string().hex().length(24).required(), 
  classLevel: Joi.string().hex().length(24).required(), 
  questions: Joi.array().items(Joi.string().hex().length(24)).required(),
  subjectId: Joi.string().hex().length(24).required(), 

});

const updateExamrValidation = Joi.object({
  id: Joi.string().hex().length(24).required(), 

  name: Joi.string().min(2).max(20),
  description: Joi.string(),
  duration: Joi.string(),
  examTime: Joi.string(),
  examDate: Joi.string(),
  examType: Joi.string(),
  examType: Joi.string(),
  totalMark: Joi.number(),
  passMark: Joi.number(),

  academicTermId: Joi.string().hex().length(24), 
  academicYearId: Joi.string().hex().length(24), 
  program: Joi.string().hex().length(24), 
  classLevel: Joi.string().hex().length(24), 
  questions: Joi.string().hex().length(24), 

  }
  

  )

const deleteExamValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export { 
  addExamvalidation,
  updateExamrValidation,
  deleteExamValidation
};
