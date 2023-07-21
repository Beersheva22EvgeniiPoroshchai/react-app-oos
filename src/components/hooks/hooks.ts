import { useDispatch } from "react-redux";
import CodeType from "../../model/CodeType";
import { codeActions } from "../../redux/slices/codeSlice";
import { useEffect, useState } from "react";

import { Subscription } from "rxjs";
import { orderService, productsService } from "../../config/service-config";
import Good from "../../model/Good";
import Order from "../../model/Order";

export function useDispatchCode() {
    const dispatch = useDispatch();
    return (error: string, successMessage: string) => {
        let code: CodeType = CodeType.OK;
        let message: string = '';
        
        if (error.includes('Authentication')) {

            code = CodeType.AUTH_ERROR;
            message = "Authentication error, mooving to Sign In";
        } else {
            code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
                CodeType.UNKNOWN;
            message = error;
        }
        dispatch(codeActions.set({ code, message: message || successMessage }))
    }
}


export function useSelectorProducts() {
    const dispatch = useDispatchCode();
    const [products, setProducts] = useState<Good[]>([]);
    useEffect(() => {

        const subscription: Subscription = productsService.getProducts()
            .subscribe({
                next(prodArray: Good[] | string) {
                    let errorMessage: string = '';
                    if (typeof prodArray === 'string') {
                        errorMessage = prodArray;
                    } else {
                        setProducts(prodArray);
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return products;
}


export function useSelectorOrders() {
    const dispatch = useDispatchCode();
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        const subscription: Subscription = orderService.getAllOrders()
            .subscribe({
                next(orderArray: Order[] | string) {
                    let errorMessage: string = '';
                    if (typeof orderArray === 'string') {
                        errorMessage = orderArray;
                    } else {
                        setOrders(orderArray);
                    }
                    dispatch(errorMessage, '');
                 }
            });
        return () => subscription.unsubscribe();
    }, []);
    return orders;
}



