import AppError from "../utils/error.util.js";
import Employee from "../models/employee.model.js";

const addEmployee = async (req, res, next) => {
  try {
    const { name, email, number, designation, gender, course } = req.body;

    if (!name || !email || !number || !designation || !gender || !course) {
      return next(new AppError("All feilds are required!", 400));
    }

    const employee = new Employee.create({
      name,
      email,
      number,
      designation,
      gender,
      course,
    });

    if (!employee) {
      return next(new AppError("Employee can't created, try again!", 400));
    }

    await employee.save();
    res.status(200).json({
      success: true,
      message: "Employee added successfully",
      employee,
    });
  } catch (error) {
    new AppError(`Error in addEmployee controller :${error.message} `, 400);
  }
};
const getAllEmployee = async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.status(201).json({
      success: true,
      message: "Successfully get all employees",
      employees,
    });
  } catch (error) {
    new AppError(`Error in getAllEmployee controller :${error.message} `, 400);
  }
};
const editEmployee = async (req, res, next) => {
  try {
    const { name, email, number, designation, gender, course } = req.body;
    if (!name || !email || !number || !designation || !gender || !course) {
      return next(new AppError("All feilds are required!", 400));
    }
    const id = req.params.id;
    const updatedEmployee = await Employee.findOneAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEmployee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    res
      .status(200)
      .json({
        success: true,
        message: "Employee edited successfully",
        updatedEmployee,
      });
  } catch (error) {
    new AppError(`Error in editEmployee controller :${error.message} `, 400);
  }
};
const deleteEmployee = async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      id: req.params.id,
    });
    if (!deletedEmployee)
      return res.status(400).json({
        success: false,
        message: "Employee not found",
      });
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    new AppError(`Error in deleteEmployee controller :${error.message} `, 400);
  }
};

export { addEmployee, getAllEmployee, editEmployee, deleteEmployee };
