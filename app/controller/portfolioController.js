const con = require('../helper/connection');
const {portfolioValidation, updateValidation,idValidate} = require('../validation/portfolioValidation');
const logger = require('../logger/logger');
const { result, error } = require('@hapi/joi/lib/base');
const { log } = require('winston');

exports.addPortfolio = async(req,res) =>{
    try{
        let { error } = portfolioValidation(req.body);
        if (error) {
            if (error.details[0].context.key == 'categoryName') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1);
            }
            if (error.details[0].context.key == 'projectName') {
                var err3 = error.details[0].message;
                return res.status(400).send(err3);
            }
            if (error.details[0].context.key == 'projectTitle') {
                var err4 = error.details[0].message;
                return res.status(400).send(err4);
            }
            if (error.details[0].context.key == 'date') {
                var err5 = error.details[0].message;
                return res.status(400).send(err5);
            }
            if (error.details[0].context.key == 'projectDescription') {
                var err5 = error.details[0].message;
                return res.status(400).send(err5);
            }
        }
        if (req.files.length === 0){
            var err4 = 'Image is reqired filed';
            return res.status(400).send(err4)
        }
        const categoryName = req.body.categoryName;
        con.query(`SELECT * FROM category WHERE categoryName = ?`,[categoryName], (err,result) => {
            if(result) {
                const image = req.files.map((image) => image.filename);
                const categoryName = result[0].categoryName;

                const {projectName,projectTitle,date,projectDescription} = req.body;

                const sql = `INSERT INTO portfolio(categoryName,projectName,projectTitle,date,projectDescription,image) VALUES("${categoryName}","${projectName}","${projectTitle}","${date}","${projectDescription}","${image}")`;

                con.query(sql,(error,result) => {
                    if(error){
                            console.log(error);
                        }
                    else{
                     res.send('data added successfully..........!!!!');
                    }
                })
            }else{
                res.status(400).send('category not found..........')
            }
        })
    }catch(error){
        console.log(error);
    }
}

exports.viewPortfolio = async(req,res) => {
    con.query('SELECT * FROM portfolio', async(err,result) => {
        if(result) {
            res.send(result)
        }else{
            res.status(400).send(err);
        }
    })
}


exports.updatePortfolio = async (req, res) => {
    try {
        const id = req.params.id;
        const category_name = req.body.categoryName;
        con.query(`SELECT * FROM category WHERE categoryName = ?`, [category_name], (err, result) => {
            if (result) {
                const categoryName = result[0].categoryName;
                const { projectName, projectTitle, date, projectDescription } = req.body;

                con.query(`UPDATE portfolio SET categoryName='${categoryName}',projectName = '${projectName}', projectTitle = '${projectTitle}',date = '${date}', projectDescription = '${projectDescription}' WHERE id = ?` , [id], async(err,result) => {
                    if(result){
                        res.send('updates successfully');
                    }
                    else{
                        console.log(err);
                    }
                })
            }
            else{
                console.log(err);
            }
        })
    } catch (error) {
        console.error('error------------>',error);
    }

}

exports.deletePortfolio = async (req,res) => {
    try{
        const id = req.params.id;
        con.query('DELETE FROM portfolio WHERE id = ? ', [id] , async(err,result) => {
            if(result){
                res.send('portfolio deleted successfully............!!!');
            }else{
                console.log(err);
            }
        })
    }catch(error){
        console.log('error------>',error);
    }
}


exports.multipleDeletePortfolio = async(req,res) => {
    console.log('req.body--------->',req.body);
    try {
        const {error} = idValidate(req.query);
        if(error){
            return res.status(400).send(error.details[0].message);
        }else {
            const id = req.query.id;
            console.log(id);
            con.query("DELETE FROM portfolio WHERE id IN ('" + id.join("','") + "') ", (err, response) => {
                if (response) {
                    res.send("Selected Category Deleted...");
                } else {
                    res.send('Selected Category Not Deleted!.....');
                }
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

