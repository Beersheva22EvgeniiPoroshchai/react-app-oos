import { Observable } from "rxjs";

import Good from "../../model/Good";

export default interface EmployeesService {
    addProduct(prod: Good): Promise<Good>;
    getProducts(): Observable<Good[] | string>;
    deleteProduct(id: any): Promise<void>;
    updateProduct(prod: Good): Promise<Good>;
    
}