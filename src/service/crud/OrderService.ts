import { Observable } from "rxjs";
import Order from "../../model/Order";


export default interface OrderService {
  addOrder (order: Order): Promise<Order>;
  deleteOrder (id: any): Promise<void>;
  getAllOrders(): Observable <string | Order[]>;
  updateOrder(order: Order): Promise<Order>


}