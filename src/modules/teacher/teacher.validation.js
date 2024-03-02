import Joi from "joi";

const addteachervalidation = Joi.object({
  firstname: Joi.string().min(2).max(20).required(),
  lastname: Joi.string().min(2).max(20).required(),
  phone: Joi.number().required(),
  Address: Joi.string().min(2).max(50).required(),
  image: Joi.string(),
  dateOfBirth: Joi.date().required(),
  placeOfBirth: Joi.string().min(2).max(50).required(),
  role: Joi.string().valid("admin", "teacher").default("teacher"),
  university: Joi.string().min(2).max(50).required(),
  degree: Joi.string().min(2).max(50).required(),
  city: Joi.string().min(2).max(50).required(),
  started_date: Joi.date(),
  finished_date: Joi.date(),
  subject: Joi.string()
});

const updateteaherValidation = Joi.object({
    firstname: Joi.string().min(2).max(20),
    lastname: Joi.string().min(2).max(20),
    phone: Joi.number(),
    Address: Joi.string(),
    image: Joi.string(),
    dateOfBirth: Joi.date(),
    placeOfBirth: Joi.string(),
    role: Joi.string().valid('admin', 'teacher'),
    university: Joi.string(),
    degree: Joi.string(),
    city: Joi.string(),
    started_date: Joi.date(),
    finished_date: Joi.date(),
    id: Joi.string().hex().length(24).required() 
  }
   
    
  )

const deleteteacherValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export { 
  addteachervalidation,
  updateteaherValidation,
  deleteteacherValidation
};
