const asyncHandler = require("express-async-handler")
const Company = require("../models/company.model.js")


//@desc get all companies
//@Get /api/v1/companies/
//@access Public
const getCompanies = asyncHandler(async (req, res) => { 
    const companies= await Company.find();
    if(!companies || companies.legth == 0 ){
        res.status(404)
        throw new Error("failed or no companies available")
    }
    res.send(companies)
 })


//@desc get company by id
//@Get /api/v1/companies/:id
//@access Public
const getCompanyById = asyncHandler(async (req, res) => {
    const companyId= req.params.id;
    if(!companyId){
        res.status(400)
        throw new Error("id is mandatory")
    }
    const company= await Company.findOne({_id:companyId})
    if(!company){
        res.status(404)
        throw new Error("no such company found")
    }
     res.send(company) 
    })


//@desc post a companies
//@Post /api/v1/companies/
//@access Public
const postCompany = asyncHandler(async (req, res) => {
    
    const { name, workType, location, employees, isRegistered } = req.body;
    if(!name || !workType || !location?.main || !employees ){
        res.status(400)
        throw new Error("all fields are necessary")
    }
    const company = await Company.create({name, workType, location, employees, isRegistered })
    if(!company){
        res.status(400)
        throw new Error("error in provided field please review your data")
    }

    res.json({name: "company created successfully",company})
})

//@desc post a company
//@Put /api/v1/companies/
//@access Public
const updateCompany = asyncHandler(async (req, res) => { 

    const companyId= req.params.id;
    if(!companyId){
        res.status(400)
        throw new Error("id is mandatory")
    }
    const company= await Company.findOne({_id:companyId})
    if(!company){
        res.status(404)
        throw new Error("no such company found")
    }
    const updatedCompany= await Company.findOneAndUpdate({_id:companyId}, req.body ,{new: true})
    if(!updatedCompany){
        res.status(500)
        throw new Error("server error please try again")
    }
    res.send(updatedCompany) 
})


//@desc delete a company
//@Delete /api/v1/companies/:id
//@access Public
const deleteCompany = asyncHandler(async (req, res) => { 

     const companyId= req.params.id;
    if(!companyId){
        res.status(400)
        throw new Error("id is mandatory")
    }
    const company= await Company.findOne({_id:companyId})
    if(!company){
        res.status(404)
        throw new Error("no such company found")
    }
    const deletedCompany= await Company.deleteOne(company)
     res.send(deletedCompany)  
})

module.exports = {
    getCompanies,
    getCompanyById,
    postCompany,
    updateCompany,
    deleteCompany
}