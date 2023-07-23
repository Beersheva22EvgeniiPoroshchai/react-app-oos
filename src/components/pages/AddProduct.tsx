
import { AddProductForm } from "../forms/AddProductForm";
import InputResult from "../../model/InputResult";
import { productsService } from "../../config/service-config";

import { useDispatchCode } from "../hooks/hooks";
import Good from "../../model/Good";

const AddProduct: React.FC = () => {
     let successMessage: string = '';
        let errorMessage = '';
        const dispatch = useDispatchCode();

    async function submitFn(prod: Good): Promise<InputResult> {
       const res: InputResult = {status: 'success', message: ''};
        try {
            const product: Good = await productsService.addProduct(prod);
            successMessage = `product with id: ${product.id} has been added`
        } catch (error: any) {
           errorMessage = error;
        }
      //  dispatch(errorMessage, successMessage);
        return res;
    }

    return <AddProductForm submitFn={submitFn}/>
}
export default AddProduct;