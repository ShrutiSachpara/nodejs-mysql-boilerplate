const { log } = require('winston');
const con = require('../helper/connection');
const {testimonialValidation,updateValidation,idValidate} = require('../validation/testimonialvalidation');

exports.addTestimonial = async(req,res) => {
    try{
        const { error } = testimonialValidation(req.body);
        // console.log('error------>',error);
        if (error) {
            if (error.details[0].context.key == 'testimonialName') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1);
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                return res.status(400).send('enter');
            }
            if (error.details[0].context.key == 'testimonialDescription') {
                var err3 = error.details[0].message;
                return res.status(400).send(err3);
            }
        }
        if (req.files.length === 0){
            var err4 = 'Image is reqired filed';
            return res.status(400).send(err4)
        }
        const {testimonialName, designation, testimonialDescription} = req.body;
        const image = req.files.map((image) => image.filename);
        // console.log('image------------>',image);
       const sql = `INSERT INTO testimonial(testimonialName,designation,testimonialDescription,image) VALUES("${testimonialName}","${designation}","${testimonialDescription}","${image}")`; 
        con.query(sql,(error,result) => {
            if (error) {
                console.log("query error---------->",error);
            } else {
                 res.send('testmonail added successfully')
            }
        });
    }
    catch(error){
        console.log(error);
    }
}

exports.viewTestimonial = async(req,res) => {
    con.query('SELECT * FROM testimonial ', async(err,result) => {
        if(result){
            res.send(result)
        }
        else{
            res.status(400).send('data not found');
        }
    })
}

exports.updateTestimonial = async(req,res) => {
    try{
        const { error } = updateValidation(req.body);
        if (error) {
            if (error.details[0].context.key == 'testimonialName') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1);
            }
            if (error.details[0].context.key == 'designation') {
                var err2 = error.details[0].message;
                return res.status(400).send(err2    );
            }
            if (error.details[0].context.key == 'testimonialDescription') {
                var err3 = error.details[0].message;
                return res.status(400).send(err3);
            }
        }
       else{
        const id = req.params.id;
        const {testimonialName, designation, testimonialDescription} = req.body;
        con.query(`UPDATE testimonial SET testimonialName='${testimonialName}', designation='${designation}', testimonialDescription='${testimonialDescription}' WHERE id=?`, [id], async (err, result) => {
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

exports.deleteTestimonial = async(req,res) => {
    try{
        const id = req.params.id;
        con.query('DELETE FROM testimonial WHERE id=?',[id], async(err, result) => {
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

exports.multipleDeleteTestimonial = async(req,res) => {
    console.log('req.body--------->',req.body);
    try {
        const {error} = idValidate(req.query);
        // console.log('error-------------',error);
        if(error){
            return res.status(400).send(error.details[0].message);
        }else {
            const id = req.query.id;
            console.log(id);
            con.query("DELETE FROM testimonial WHERE id IN ('" + id.join("','") + "') ", (err, response) => {
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



