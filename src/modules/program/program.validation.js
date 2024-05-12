import Joi from "joi";

const addProgramValidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  description: Joi.string().required(),
  duration: Joi.string().default("4 years").required(),
  code: Joi.string().required(),
  updatedBy: Joi.string().hex().length(24),
  teachers: Joi.array().items(Joi.string().hex().length(24)),
  students: Joi.array().items(Joi.string().hex().length(24)),
  subjects: Joi.array().items(Joi.string().hex().length(24)),
});

const updateProgramValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(20),
  description: Joi.string().min(2).max(1000),
  duration: Joi.string(),
  code: Joi.string(),
  createdBy: Joi.string().hex().length(24),
  updatedBy: Joi.string().hex().length(24),
  teachers: Joi.array().items(Joi.string().hex().length(24)),
  students: Joi.array().items(Joi.string().hex().length(24)),
  subjects: Joi.array().items(Joi.string().hex().length(24)),
});

const deleteProgramValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export { 
  addProgramValidation,
  updateProgramValidation,
  deleteProgramValidation
};
