import Joi from "joi";

const addAcademicYearvalidation = Joi.object({
  name: Joi.string().trim().required(),
  teachers: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  students: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  isCurrent: Joi.boolean().default(false),
  fromYear: Joi.date().required(),
  toYear: Joi.date().required(),

});

const updateAcademicYearrValidation = Joi.object({
   
    id: Joi.string().hex().length(24).required(), 
    name: Joi.string().min(2).max(20),
    fromYear: Joi.date(),
    toYear: Joi.date(),

  }
  

  )

const deleteAcademicYearValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export { 
  addAcademicYearvalidation,
  updateAcademicYearrValidation,
  deleteAcademicYearValidation
};
