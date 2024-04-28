import Joi from "joi";

const addAcademicYearvalidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  fromYear: Joi.date(),
  ToYear: Joi.date(),

});

const updateAcademicYearrValidation = Joi.object({
   
    id: Joi.string().hex().length(24).required(), 
    name: Joi.string().min(2).max(20),
    fromYear: Joi.date(),
    ToYear: Joi.date(),

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
