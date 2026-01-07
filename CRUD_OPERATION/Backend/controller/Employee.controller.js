import Employee from "../model/Employee.mpdel.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, age, dob, city, country } = req.body;


    if (!name || !age || !dob || !city || !country) {
      return res.status(400).json({ message: "Missing required fields" });
    }

  
    const existsEmp = await Employee.findOne({ name });
    if (existsEmp) {
      return res.status(409).json({ message: "Employee already exists" });
    }

    const newEmployee = new Employee({
      name,
      age,
      dob,
      city,
      country
    });

    await newEmployee.save();

    return res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllEmployee = async (req, res) => {
  try {
    // pagination 
    const page = parseInt(req.query.page) || 1 ;
    const limit = parseInt(req.query.limit) || 5 ;
    const skip = (page - 1) * limit;

    const employees = await Employee.find({}).skip(skip).limit(limit);

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    const totalDocument = await Employee.countDocuments();
    const totalPages = await Math.ceil(totalDocument/limit);

    return res.status(200).json({
      message: "Employees fetched successfully",
      employees,
      totalDocument,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getSpecificEmp = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee fetched successfully",
      employee
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const employeeUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { dob } = req.body;

    const updatedEmp = await Employee.findByIdAndUpdate(
      id,
      { dob },
      { new: true, runValidators: true }
    );

    if (!updatedEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmp
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteEmp = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmp = await Employee.findByIdAndDelete(id);
    if (!deletedEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
