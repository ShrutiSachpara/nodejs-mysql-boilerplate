const Joi = require('@hapi/joi');

function registrationValidate(req){
    const schema = Joi.object({
        firstname : Joi.string().empty().required().messages({
           "string.base": `first name should be a type of 'string'`,
            "string.empty": `first name can not an empty field`,
            "any.required": `first name is a required field`,
        }),
        lastname : Joi.string().empty().required().messages({
            "string.base": `last name should be a type of 'string'`,
            "string.empty": `last name can not an empty field`,
            "any.required": `last name is a required field`,
        }),
        gender:Joi.string().empty().required().messages({
            "string.base": `gender should be a type of 'string'`,
            "string.empty": `gender can not an empty field`,
            "any.required": `gender is a required field`,
        }),
        hobby: Joi.required().messages({
            "string.base": `hobby should be choose`,
            "string.empty": `hobby can not an empty field`,
            "any.required": `hobby is a required field`,
        }),
        city: Joi.string().empty().required().messages({
            "string.base": `city should be a type of 'string'`,
            "string.empty": `city can not an empty field`,
            "any.required": `city is a required field`,
        }),
        mobile: Joi.string().empty().required().messages({
            "string.base": `mobile should be a type of 'number'`,
            "string.empty": `mobile can not an empty field`,
            "any.required": `mobile is a required field`,
        }),
        email:Joi.string().empty().required().email().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "any.required": `email is a required field`,
        }),
        password:Joi.string().empty().required().min(4).max(16).messages({
            "string.base": `password should be a type of 'string'`, 
            "string.empty": `password can not an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),    
    })
    return schema.validate(req);
}

function loginValidate(req) {
    const schema = Joi.object({
        email : Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        })
    })
    const options = {
        abortEarly : false,
    }
    return schema.validate(req,options);
}

function updateProfileValidate(req){
    const schema = Joi.object({
        firstname : Joi.string().empty().required().min(3).messages({
           "string.base": `first name should be a type of 'string'`,
            "string.empty": `first name can not an empty field`,
            "any.required": `first name is a required field`,
        }),
        lastname : Joi.string().empty().required().min(3).messages({
            "string.base": `last name should be a type of 'string'`,
            "string.empty": `last name can not an empty field`,
            "any.required": `last name is a required field`,
        }),
        gender:Joi.string().empty().required().messages({
            "string.base": `gender should be a type of 'string'`,
            "string.empty": `gender can not an empty field`,
            "any.required": `gender is a required field`,
        }),
        hobby: Joi.required().messages({
            "string.base": `hobby should be choose`,
            "string.empty": `hobby can not an empty field`,
            "any.required": `hobby is a required field`,
        }),
        city: Joi.string().empty().required().messages({
            "string.base": `city should be a type of 'string'`,
            "string.empty": `city can not an empty field`,
            "any.required": `city is a required field`,
        }),
        mobile: Joi.string().empty().required().messages({
            "string.base": `mobile should be a type of 'number'`,
            "string.empty": `mobile can not an empty field`,
            "any.required": `mobile is a required field`,
        }),
        email:Joi.string().empty().required().email().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "any.required": `email is a required field`,
        }),
        password:Joi.string().empty().required().min(4).max(16).messages({
            "string.base": `password should be a type of 'string'`, 
            "string.empty": `password can not an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        })    
    })
    return schema.validate(req);
}

function verifyemailValidate(req) {
    const schema = Joi.object({
        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `Password should be a type of 'text'`,
            "string.empty": `Password cannot be an empty field`,
            "string.min": "Password should be of minimum 6 characters",
            "string.max": "Password should be of maximum 16 characters",
            "any.required": `Password is a required field`,
        }),
        cpassword: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.base": `Confirm Password should be a type of 'text'`,
            "any.only": "Confirm Password doesn't match password",
            "any.required": `Confirm Password is a required field`,
        })
    })
    const options = {
        abortEarly: false
    };
    return schema.validate(req, options);
}

function newPswdValidate(req) {
    const schema = Joi.object({
        email: Joi.string().empty().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email can not an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email name is a required field`,
        }),
        password: Joi.string().required().min(6).max(16).messages({
            "string.base": `new password should be a type of 'text'`,
            "string.empty": `new password cannot be an empty field`,
            "string.min": "new password should be of minimum 6 characters",
            "string.max": "new password should be of maximum 16 characters",
            "any.required": `new password is a required field`,
        }),
        cpassword: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match new password",
            "any.required": `confirm password is a required field`,
        })
    })
    const options = {
        abortEarly: false
    };
    return schema.validate(req, options);
}

function verifyEmail(req){
    const schema = Joi.object({
        email: Joi.string().email().empty().required().label("email").messages({
            "string.base": `Email should be a type of text`,
            "string.email": `Email format not valid`,
            "string.empty": 'Email is not allowed to be empty',
            "string.required": `Email is Required`,

        }),
    })
    return schema.validate(req, { abortEarly: false });
}

module.exports = { registrationValidate , loginValidate, updateProfileValidate, verifyemailValidate,newPswdValidate, verifyEmail};