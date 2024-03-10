import Joi from "joi";



const updaStudentValidation = Joi.object({
  firstname: Joi.string().min(2).max(20),
    lastname: Joi.string().min(2).max(20),
    password: Joi.string(),
    email: Joi.string().email(),

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

const deleteStudentValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})
const getStudentProfileByIdValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
})

export { 
  getStudentProfileByIdValidation,
  updaStudentValidation,
  deleteStudentValidation
};
