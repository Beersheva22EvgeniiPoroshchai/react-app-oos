import AuthService from "../service/auth/AuthService";
import AuthServiceJwt from "../service/auth/AuthServiceJwt";

import EmployeesService from "../service/crud/ProductService";
import AuthServiceFake from "../service/auth/authServiceFake";
import EmployeesServiceFire from "../service/crud/ProductServiceFire";
import AuthServiceFire from "../service/auth/AuthServiceFire";
import StorageService from "../service/crud/StorageService";
import StorageServiceFire from "../service/crud/StorageServiceFire";



//export const authService: AuthService = new AuthServiceJwt('http://localhost:3500/login');
//export const employeesService: EmployeesService = new EmployeesServiceRest('http://localhost:3500/employees')

//export const authService: AuthService = new AuthServiceFake();

export const authService: AuthService = new AuthServiceFire();

export const productsService: EmployeesService = new EmployeesServiceFire();

export const storageService: StorageService = new StorageServiceFire();


