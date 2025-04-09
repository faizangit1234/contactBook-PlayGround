const express = require('express');

const router = express.Router();

const app = express();


router.route("/").get((req, res) => {
    res.status(200).json({ message: "get all contacts" })
}
)

router.route("/:id").get((req, res) => {
    res.status(200).json({ message: `get contact successfully id = ${req.params.id}` })
}
)

router.route("/").post((req, res) => {
    res.status(200).json({ message: "contact added successfully" })
}
)

router.route("/:id").put((req, res) => {
    res.status(200).json({ message: `get updated successfully id = ${req.params.id}` })
}
)

router.route("/:id").delete((req, res) => {
    res.status(200).json({ message: `deleted successfully id = ${req.params.id}` })
}
)

module.exports = router