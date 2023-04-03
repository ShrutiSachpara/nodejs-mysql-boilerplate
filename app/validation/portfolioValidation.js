const Joi = require('@hapi/joi');

function portfolioValidation(req) {
    const schema = Joi.object({
        categoryName: Joi.string().empty().messages({
            "string.base": `categoryName should be a type of 'string'`,
            "string.empty": `categoryName can not an empty field`,
            "any.required": `categoryName  is a required field`,
        }),
        projectName : Joi.string().empty().messages({
            "string.base": `projectName should be a type of 'string'`,
            "string.empty": `projectName can not an empty field`,
            "any.required": `projectName is a required field`,
        }),
        projectTitle : Joi.string().empty().messages({
            "string.base": `projectTitle should be a type of 'string'`,
            "string.empty": `projectTitle  can not an empty field`,
            "any.required": `projectTitle  is a required field`,
        }),
        date: Joi.date().messages({
            "any.required": `date is a required field`,
        }),
        projectDescription : Joi.string().empty().messages({
            "string.base": `projectDescription should be a type of 'string'`,
            "string.empty": `projectDescription can not an empty field`,
            "any.required": `projectDescription  is a required field`,
        }),
    })
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    return schema.validate(req, options);
}

function updateValidation(req) {
    const schema = Joi.object({
        projectCategory: Joi.string().empty().messages({
            "string.base": `projectCategory should be a type of 'string'`,
            "string.empty": `projectCategory can not an empty field`,
            "any.required": `projectCategory name is a required field`,
        }),
        projectName : Joi.string().empty().messages({
            "string.base": `projectName should be a type of 'string'`,
            "string.empty": `projectName can not an empty field`,
            "any.required": `projectName is a required field`,
        }),
        projectTitle : Joi.string().empty().messages({
            "string.base": `projectTitle should be a type of 'string'`,
            "string.empty": `projectTitle  can not an empty field`,
            "any.required": `projectTitle  is a required field`,
        }),
        // date: Joi.date().required().messages({
        //     "any.required": `date is a required field`,
        // }),
        projectDescription : Joi.string().empty().messages({
            "string.base": `projectDescription should be a type of 'string'`,
            "string.empty": `projectDescription can not an empty field`,
            "any.required": `projectDescription  is a required field`,
        }),
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
module.exports = {portfolioValidation ,updateValidation,idValidate}