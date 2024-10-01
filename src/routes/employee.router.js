import { Router } from "express";

import {addEmployee, getAllEmployee, editEmployee, deleteEmployee } from "../controllers/employee.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const empolyeeRouter = Router()

empolyeeRouter.post('/add',isLoggedIn, addEmployee)
empolyeeRouter.get('/all',isLoggedIn, getAllEmployee)
empolyeeRouter.put('/edit/:id',isLoggedIn, editEmployee)
empolyeeRouter.delete('/delete/:id',isLoggedIn, deleteEmployee)

export default empolyeeRouter