import Good from "./Good";
import UserData from "./UserData"

type Order = {
    id: UserData;
    orders: Good[];
    status: 'ordered' | 'confirmed'

}