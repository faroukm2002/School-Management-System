import Joi from "joi";

const addExamvalidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  examTime: Joi.string().required(),
  examDate: Joi.string().required(),
  examType: Joi.string().required(),
  examType: Joi.string().required(),
  totalMark: Joi.number().required(),
  passMark: Joi.number().required(),

  academicTermId: Joi.string().hex().length(24).required(), 
  AcademicYearId: Joi.string().hex().length(24).required(), 
  program: Joi.string().hex().length(24).required(), 
  classLevel: Joi.string().hex().length(24).required(), 
  questions: Joi.string().hex().length(24).required(), 
  createdBy: Joi.string().hex().length(24).required(), 

});

const updateExamrValidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  examTime: Joi.string().required(),
  examDate: Joi.string().required(),
  examType: Joi.string().required(),
  examType: Joi.string().required(),
  totalMark: Joi.number().required(),
  passMark: Joi.number().required(),

  academicTermId: Joi.string().hex().length(24).required(), 
  AcademicYearId: Joi.string().hex().length(24).required(), 
  program: Joi.string().hex().length(24).required(), 
  classLevel: Joi.string().hex().length(24).required(), 
  questions: Joi.string().hex().length(24).required(), 

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
