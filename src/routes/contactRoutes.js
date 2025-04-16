const express = require("express");
const validateToken = require("../middlewares/validateTokenHandler.js");
const router = express.Router();
const {
    getAllContacts,
    postContact,
    getContact,
    updateContact,
    deleteContact
} = require("../controllers/contact.controller.js")


router.use(validateToken)
router.route("/").get(validateToken , getAllContacts).post(validateToken ,postContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router