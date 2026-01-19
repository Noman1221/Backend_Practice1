import Employee from "../model/Employee.mpdel.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, age, bob, city, country } = req.body;
console.log( name, age, bob, city, country );


    if (!name || !age || !bob || !city || !country) {
      return res.status(400).json({ message: "Missing required fields" });
    }

  
    const existsEmp = await Employee.findOne({ name });
    if (existsEmp) {
      return res.status(409).json({ message: "Employee already exists" });
    }

    const newEmployee = new Employee({
      name,
      age,
      bob,
      city,
      country
    });

    await newEmployee.save();

    return res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee
    });
  } catch (error) {
     console.error("Error creating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllEmployee = async (req, res) => {
  try {
    // pagination 
    const page = parseInt(req.query.page) || 1 ;
    const limit = parseInt(req.query.limit) || 5 ;
    const skip = (page - 1) * limit;

    // sorting
    const sortBy = req.query.sortBy || "city";
    const sortOrder = req.query.sortOrder === "desc"? -1:1;

    // filtering
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    };
    if (req.query.minAge) {
      filter.age = {...filter.age, $gte:Number(req.query.minAge)}
    }
    if (req.query.maxAge) {
      filter.age = {...filter.age, $lte:Number(req.query.maxAge)};
    };


    
    const employees = Employee.find(filter).sort({[sortBy]:sortOrder}).skip(skip).limit(limit);

    const totalDocument = await Employee.countDocuments(filter);
    const totalPages = await Math.ceil(totalDocument/limit);

    return res.status(200).json({
      message: "Employees fetched successfully",
      employees,
      totalDocument,
      totalPages,
      page,
      limit,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchApi = async (req, res) => {
  try {
    const key = req.query.q || "";
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit)|| 10;
    const skip = (page -1) * limit;
        const filter = { "$or": [
        { name: { $regex: key, $options: "i" } },
        { city: { $regex: key, $options: "i" } },
        { country: { $regex: key, $options: "i" } }
      ]}

    const data = await Employee.find(filter).skip(skip).limit(limit);

    const total = await Employee.countDocuments(filter);

    return res.json({
      page,
      total,
      limit,
      message: "Search successful",
      results: data
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




// Want Next?

// I can teach you:

// Option A → Pagination + Sorting + Filtering using Aggregation Pipeline
// Option B → Cursor-based Pagination (FB/Instagram style)
// Option C → Reusable Middleware for Pagination