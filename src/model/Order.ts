import Good from "./Good";
import UserData from "./UserData"

type Order = {
    id?: any;
    idUser: UserData;
    products: {goods:Good, amount:number}[];
    orderTime: Date;
    status: 'preOrdered'|'ordered'|'delivered'
}

export default Order;
