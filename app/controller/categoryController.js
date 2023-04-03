const con = require('../helper/connection');
const {categoryValidation, categoryUpdateValidation, idValidate} = require('../validation/categoryValidation');

exports.addCategory = async(req,res) => {
    try{
        const { error } = categoryValidation(req.body);
        // console.log('error------>',error);
        if (error) {
            if (error.details[0].context.key == 'categoryName') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1);
            }
        }
        const {categoryName} = req.body;
        con.query('SELECT * FROM category WHERE categoryName= ? ',[categoryName], (err,result) => {
            if(result.length > 0){
                return res.status(400).send('category already add')
            }
            else{
                con.query('INSERT INTO category SET ?',{
                    categoryName : categoryName
                },(err,result) => {
                    if(result){
                        res.send('category added successfully.......!!')
                    }else{
                        console.log(err);
                    }
                })
            }
        }) 
    }
    catch(error){
        console.log(error);
    }
}

exports.viewCategory = async(req,res) => {
    con.query('SELECT * FROM category ', async(err,result) => {
        if(result){
            res.send(result)
        }
        else{
            res.status(400).send('data not found');
        }
    })
}

exports.updateCategory = async(req,res) => {
    try{
        const { error } = categoryUpdateValidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        else{
            const id = req.params.id;
            const {categoryName} = req.body;
    
            con.query(`UPDATE category SET categoryName='${categoryName}' WHERE id=?`, [id], async (err, result) => {
                if(result){
                    res.send('Category Updated suceessfully')
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

exports.deleteCategory = async(req,res) => {
    try{
        const id = req.params.id;
        con.query('DELETE FROM category WHERE id=?',[id], async(err, result) => {
            if(result){
                res.send('category deleted successfully......!');
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

exports.multipleDeleteCategory = async(req,res) => {
    console.log('req.body--------->',req.body);
    try {
        const {error} = idValidate(req.query);
        // console.log('error-------------',error);
        if(error){
            return res.status(400).send(error.details[0].message);
        }else {
            const id = req.query.id;
            console.log(id);
            con.query("DELETE FROM category WHERE id IN ('" + id.join("','") + "') ", (err, response) => {
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
