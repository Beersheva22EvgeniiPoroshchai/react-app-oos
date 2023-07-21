import AuthService from "../service/auth/AuthService";

import EmployeesService from "../service/crud/ProductService";

import EmployeesServiceFire from "../service/crud/ProductServiceFire";
import AuthServiceFire from "../service/auth/AuthServiceFire";
import StorageService from "../service/crud/StorageServiceImg";
import StorageServiceFire from "../service/crud/StorageServiceImgFire";
import OrderServiceFire from "../service/crud/OrderServiceFire";
import OrderService from "../service/crud/OrderService";



//export const authService: AuthService = new AuthServiceJwt('http://localhost:3500/login');
//export const employeesService: EmployeesService = new EmployeesServiceRest('http://localhost:3500/employees')

//export const authService: AuthService = new AuthServiceFake();

export const authService: AuthService = new AuthServiceFire();

export const productsService: EmployeesService = new EmployeesServiceFire();

export const storageService: StorageService = new StorageServiceFire();

export const orderService: OrderService = new OrderServiceFire();


