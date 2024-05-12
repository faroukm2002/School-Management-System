import Joi from "joi";

const addYearGroupValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  duration: Joi.string().min(2).max(1000).required(),
  id: Joi.string().hex().length(24).required()

});

const updateYearGroupValidation = Joi.object({
  id: Joi.string().hex().length(24).required(), 
  name: Joi.string().min(2).max(50),
  duration: Joi.string().min(2).max(1000),
  academicYearId: Joi.string().hex().length(24)
});

const deleteYearGroupValidation = Joi.object({
    id: Joi.string().hex().length(24).required()
});

export { 
  addYearGroupValidation,
  updateYearGroupValidation,
  deleteYearGroupValidation
};
