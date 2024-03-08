import Joi from "joi";



const updateteaherValidation = Joi.object({
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

const deleteteacherValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})
const getteacherProfileByIdValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
})

export { 
  getteacherProfileByIdValidation,
  updateteaherValidation,
  deleteteacherValidation
};
