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
    id: Joi.string().hex().length(24).required(), 
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
