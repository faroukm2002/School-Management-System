import Joi from "joi";

const AdminRegisterValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),

});

const TeacherRegisterValidation = Joi.object({
   firstname: Joi.string().min(2).max(20).required(),
  lastname: Joi.string().min(2).max(20).required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  role: Joi.string().required(),

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

  }
  

  )

const Login = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  role: Joi.string().required(),})
export { 
  AdminRegisterValidation,
  TeacherRegisterValidation,
  Login
};
