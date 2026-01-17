import express from "express";
import {
  createEmployee,
  deleteEmp,
  employeeUpdate,
  getAllEmployee,
  getSpecificEmp,
  searchApi
} from "../controller/Employee.controller.js";

const EmpRouter = express.Router();

EmpRouter.post("/employee", createEmployee);
EmpRouter.get("/employee", getAllEmployee);
EmpRouter.get("/search/:key", searchApi);
EmpRouter.get("/employee/:id", getSpecificEmp);
EmpRouter.put("/employee/:id", employeeUpdate);
EmpRouter.delete("/employee/:id", deleteEmp);

export default EmpRouter;
