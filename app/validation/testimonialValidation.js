const Joi = require('@hapi/joi');

function testimonialValidation(req) {
    const schema = Joi.object({
        testimonialName: Joi.string().empty().messages({
            "string.base": `testimonialName should be a type of 'string'`,
            "string.empty": `testimonialName can not an empty field`,
            "any.required": `testimonialName name is a required field`,
        }),
        designation : Joi.string().empty().messages({
            "string.base": `designation should be a type of 'string'`,
            "string.empty": `designation can not an empty field`,
            "any.required": `designation is a required field`,
        }),
        testimonialDescription  :  Joi.string().empty().messages({
            "string.base": `testimonialDescription should be a type of 'string'`,
            "string.empty": `testimonialDescription can not an empty field`,
            "any.required": `testimonialDescription  is a required field`,
        }),
         image: Joi.optional()
    });
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    return schema.validate(req, options);
}

function updateValidation(req) {
    const schema = Joi.object({
        testimonialName: Joi.string().empty().messages({
            "string.base": `testimonialName should be a type of 'string'`,
            "string.empty": `testimonialName can not an empty field`,
            "any.required": `testimonialName name is a required field`,
        }),
        designation : Joi.string().empty().messages({
            "string.base": `designation should be a type of 'string'`,
            "string.empty": `designation can not an empty field`,
            "any.required": `designation is a required field`,
        }),
        testimonialDescription  :  Joi.string().empty().messages({
            "string.base": `testimonialDescription should be a type of 'string'`,
            "string.empty": `testimonialDescription can not an empty field`,
            "any.required": `testimonialDescription  is a required field`,
        })
    });
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    return schema.validate(req, options);
}


function idValidate(req) {
    const schema = Joi.object({

        id: Joi.array().empty().required().messages({
            "string.base": `URL should be a type of text`,
            "string.empty":'URL  is not allowed to be empty',
            "string.required": `URL is Required`,
          }),
    })
    const options = {
        abortEarly: false,
        allowUnknown: true, 
        stripUnknown: true 
    };
    return schema.validate(req, options);
}

module.exports = {testimonialValidation,updateValidation,idValidate}