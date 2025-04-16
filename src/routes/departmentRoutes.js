const express = require("express");
const validateToken = require("../middlewares/validateTokenHandler.js");
const router = express.Router();
const {
    getAllDepartments,
    postDepartment,
    getDepartment,
    updateDepartment,
    deleteDepartment
} = require("../controllers/department.controller.js")


router.use(validateToken)
router.route("/").get(validateToken , getAllDepartments).post(validateToken ,postDepartment)
router.route("/:id").get(getDepartment).put(updateDepartment).delete(deleteDepartment)

module.exports = router