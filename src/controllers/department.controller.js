const Department = require("../models/department.model.js");
const asyncHandler = require("express-async-handler");

// @desc    Get all departments
// @route   GET /api/v1/departments
// @access  Private
const getAllDepartments = asyncHandler(async (req, res) => {
    const departments = await Department.find();
    
    if (departments.length === 0) {
        return res.status(404).json({ message: "No departments to show" });
    }

    res.status(200).json(departments);
});

// @desc    Get a department by ID
// @route   GET /api/v1/departments/:id
// @access  Private
const getDepartment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const department = await Department.findById(id); // Better than find({ _id: id })

    if (!department) {
        return res.status(404).json({ message: "No department found" });
    }

    res.status(200).json(department);
});

// @desc    Create a new department
// @route   POST /api/v1/departments
// @access  Private
const postDepartment = asyncHandler(async (req, res) => {
    const { name, type, description, head } = req.body;

    if (!name || !type || !description || !head) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const department = await Department.create({ name, type, description, head });

    res.status(201).json(department);
});

// @desc    Update a department
// @route   PUT /api/v1/departments/:id
// @access  Private
const updateDepartment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const department = await Department.findById(id);
    if (!department) {
        return res.status(404).json({ message: "No such department found" });
    }

    const { name, type, description, head } = req.body;
    if (!name || !type || !description || !head) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(updatedDepartment);
});

// @desc    Delete a department
// @route   DELETE /api/v1/departments/:id
// @access  Private
const deleteDepartment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const department = await Department.findById(id);
    if (!department) {
        return res.status(404).json({ message: "No such department found" });
    }

    await Department.findByIdAndDelete(id);

    res.status(200).json({ message: "Department deleted successfully" });
});

module.exports = {
    getAllDepartments,
    postDepartment,
    getDepartment,
    updateDepartment,
    deleteDepartment,
};
