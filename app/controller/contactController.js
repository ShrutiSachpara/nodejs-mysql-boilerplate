const { result } = require('@hapi/joi/lib/base');
const con = require('../helper/connection');
const {contactValidation , upadteValidation,idValidate} = require('../validation/contactValidation');

exports.addContact = async(req,res) => {
    console.log('req.body----',req.body);
    try{
        const { error } = contactValidation(req.body);
        if (error) {
            if (error.details[0].context.key == 'contactName') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1);
            }
            if (error.details[0].context.key == 'email') {
                var err2 = error.details[0].message;
                return res.status(400).send(err2);
            }
            if (error.details[0].context.key == 'contactNumber') {
                var err3 = error.details[0].message;
                return res.status(400).send(err3);
            }
            if (error.details[0].context.key == 'messages') {
                var err4 = error.details[0].message;
                return res.status(400).send(err4);
            }
            if (error.details[0].context.key == 'date') {
                var err5 = error.details[0].message;
                return res.status(400).send(err5);
            }
        }
        const {contactName, email, contactNumber, message, date} = req.body;
        con.query('SELECT * FROM registration WHERE email= ? ',[email], (err,result) => {
            if(result.length > 0){
                return res.status(400).send('contact already add')
            }
            if(err){
                console.log(err);
            }
            else{
                console.log('abcdef');
                con.query('INSERT INTO contact SET ?',{
                    contactName : contactName,
                    email : email,
                    contactNumber : contactNumber,
                    message : message,
                    date : date
                },(err,result) => {
                    if(result){
                        res.send('Contact added successfully.......!!')
                    }
                })
            }
        }) 
    }
    catch(error){
        console.log(error);
    }
}

exports.viewContact = async(req,res) => {
    con.query('SELECT * FROM contact ', async(err,result) => {
        if(result){
            res.send(result)
        }
        else{
            res.status(400).send('data not found');
        }
    })
}

exports.updateContact = async(req,res) => {
    try{
        const { error } = upadteValidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        else{
            const id = req.params.id;
            const {contactName, email, contactNumber, message, date} = req.body;
    
            con.query(`UPDATE contact SET contactName='${contactName}', email='${email}', contactNumber='${contactNumber}', message='${message}', date='${date}' WHERE id=?`, [id], async (err, result) => {
                if(result){
                    res.send('Data Updated suceessfully')
                }
                else{
                    console.log('error',err);
                }
            })
        }
    }
    catch(error){
        console.log(error);
    }
}

exports.deleteContact = async(req,res) => {
    try{
        const id = req.params.id;
        con.query('DELETE FROM contact WHERE id=?',[id], async(err, result) => {
            if(result){
                res.send('contact deleted successfully......!');
            }
            else{
                res.status(400).send('data not found');
            }
        })
    }   
    catch(error){
        console.log(error);
    }
}

exports.multipleDeleteContact = async(req,res) => {
    console.log('req.body--------->',req.body);
    try {
        const {error} = idValidate(req.query);
        if(error){
            return res.status(400).send(error.details[0].message);
        }else {
            const id = req.query.id;
            console.log(id);
            con.query("DELETE FROM contact WHERE id IN ('" + id.join("','") + "') ", (err, response) => {
                if (response) {
                    res.send("Selected contact Deleted...");
                } else {
                    res.send('Selected contact Not Deleted!.....');
                }
            });
        }
    }
    catch(err){
        console.log(err);
    }
}


