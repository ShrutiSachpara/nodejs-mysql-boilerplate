const con = require('../helper/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const logger = require('../logger/logger');
const {registrationValidate, loginValidate,updateProfileValidate,verifyemailValidate, newPswdValidate, verifyEmail} = require('../validation/authValidation');
const {otpsend} =require('../services/mail');

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);

exports.signup = async(req,res) => {
    try{
        const { error } = registrationValidate(req.body);        
        if(error){
            var err1 = error.details[0].message;
            return res.status(400).send(err1);
        }
        if(!req.file){
            return res.status(400).send('image is required field');
        }
        else{
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const gender = req.body.gender;
            const hobby = req.body.hobby;
            const city = req.body.city;
            const mobile = req.body.mobile;
            const email = req.body.email;
            const password = encryptedPassword;
            const image = req.file.filename;

            const sql = `INSERT INTO registration(firstname,lastname,gender,hobby,city,mobile,email,password,image) VALUES("${firstname}","${lastname}","${gender}","${hobby}","${city}","${mobile}","${email}","${password}","${image}")`; 
            con.query(sql,(error,result) => {
                if (error) {
                    console.log("query error---------->",error);
                } else {
                    let success = " " + req.body.firstname + " " + req.body.lastname + " successfully register";
                     res.send(success)
                }
            });
        }
    }
    catch(err){
        console.log(err);
    }
};

exports.authUser = async (req, res) => {
    try {
        let { error } = loginValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        var email= req.body.email;
        var password = req.body.password;
        con.query('SELECT * FROM registration WHERE email = ?',[email], async function (error, results, fields) {
            if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            }
            else{
                if(results.length >0){
                    const comparision = await bcrypt.compare(password, results[0].password)
                    if(comparision){
                        res.send("login sucessfull")
                    }
                    else{
                        res.send("Email and password does not match")
                    }
                }else{
                    res.send("Email does not exits");
                }
            }
        });
    }
    catch (err) {
        console.error('err', err)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { error } = updateProfileValidate(req.body);
       
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        else{
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const gender = req.body.gender;
            const hobby = req.body.hobby;
            const city = req.body.city;
            const mobile = req.body.mobile;
            const email = req.body.email;
            const image = req.file.filename;

            console.log('req.user.email',req.user.email);
            con.query(`UPDATE registration SET firstname='${firstname}',lastname='${lastname}',gender='${gender}',hobby='${hobby}',city='${city}',mobile='${mobile}',email='${email}',image='${image}'WHERE email ='${req.user.email}'`,function(err,response){
                if(response){
                    res.send('Data Updated suceessfully')
                }
                else{
                    console.log('error',error);
                }
            })
        }
    }
    catch (err) {
        console.log("err", err);
    }
};

exports.viewData = async(req,res) => {
    con.query('SELECT * FROM registration ', async(err,result) => {
        if(result){
            res.send(result)
        }
        else{
            res.status(400).send('data not found');
        }
    })
}

exports.updatePassword = async (req, res) => {
    try {
        const { error } = verifyemailValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const bcryptpassword = await bcrypt.hash(password, salt);
            console.log(bcryptpassword);
            con.query('UPDATE `registration` SET password = ?', [bcryptpassword], (err, response) => {

                if (response) {
                    res.send('password updated')
                } else {
                    logger.error('Error', err);
                }
            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.resetpassword = async(req,res) =>{
    const { error } = newPswdValidate(req.body);
   if(error){
    if (error.details[0].context.key == 'email') {
        var err1 = error.details[0].message;
        return res.status(400).send(err1);
    }
    if (error.details[0].context.key == 'password') {
        var err2 = error.details[0].message;
        return res.status(400).send(err2);
    }
    if (error.details[0].context.key == 'cpassword') {
        var err3 = error.details[0].message;
        return res.status(400).send(err3);
    }
   }
   const { email, password } = req.body;
   con.query('SELECT * FROM registration WHERE email=?', [email], async (err, result) => {
    if (result.length > 0) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        con.query(`UPDATE registration SET password='${hashPassword}' WHERE email=?`, [email], async (err, updateResult) => {
            if (updateResult) {
                res.send('Password Will Be Update')
            }
            else {
                res.status(400).send('Something Was Wrong')
            }
        })
    }
    else {
        res.status(400).send('User not found')
    }
})
}

exports.forgetPassword = async (req, res) => {
    try {
        const { error } = verifyEmail(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const email = req.body.email;
            con.query('SELECT * FROM `registration` WHERE email = "'+email+'"', async (error, result) => {
                if (result) {
                    otpsend(email,otp);
                    res.status(200).json('OTP send');
                }
                else {
                    res.send('user not found')
                }
            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.verifyOtp = async (req, res, next) => {
    try {
        if (otp == req.body.otp) {
            res.send('OTP Verify...');
        }
        else {
            res.send('Invalid Otp....')
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.send("logout successfully");
    }
    catch (err) {
        logger.error("err", err)
    }
};



