const Joi = require("@hapi/joi");

function categoryValidation(req) {
    const schema = Joi.object({
        categoryName: Joi.string().empty().required().messages({
            "string.base": `category Name should be a type of 'string'`,
            "string.empty": `category can not an empty field`,
            "any.required": `category Name is a required field`,
        })
    })
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    return schema.validate(req, options);
}

function categoryUpdateValidation(req) {
    const schema = Joi.object({
        categoryName: Joi.string().empty().required().messages({
            "string.base": `category Name should be a type of 'string'`,
            "string.empty": `category can not an empty field`,
            "any.required": `category Name is a required field`,
        })
    })
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
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    return schema.validate(req, options);
}

module.exports = {categoryValidation, categoryUpdateValidation,idValidate}