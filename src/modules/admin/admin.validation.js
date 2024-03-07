import Joi from "joi";


// UPDATE ADMIN
const updateAdminValidation = Joi.object({
   
    id: Joi.string().hex().length(24).required(), 
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),

  }
  

  )
// DELETE ADMIN
const deleteAdminValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})

// GET ADMINP_PROFILE
const getAdminProfileByIDValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
})
export { 
  updateAdminValidation,
  deleteAdminValidation,
  getAdminProfileByIDValidation
};
