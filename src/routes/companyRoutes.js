const express= require("express")
const router = express.Router();
const {
    getCompanies,
    getCompanyById,
    postCompany,
    updateCompany,
    deleteCompany,
}= require("../controllers/company.controller.js");
const validateToken = require("../middlewares/validateTokenHandler.js");


router.use(validateToken)
router.route("/").get(getCompanies).post(postCompany)
router.route("/:id").get(getCompanyById).put(updateCompany).delete(deleteCompany)


module.exports= router