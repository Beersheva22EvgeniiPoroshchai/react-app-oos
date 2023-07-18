import { Box,  Modal, useMediaQuery, useTheme } from "@mui/material"
import { useState, useEffect, useRef, useMemo } from "react";

import { productsService, storageService } from "../../config/service-config";
import { Subscription } from 'rxjs';
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { Delete, Details, Edit, Man, Visibility, Woman } from "@mui/icons-material";
import { useSelectorAuth } from "../../redux/store";
import { Confirmation } from "../common/Confirmation";

import InputResult from "../../model/InputResult";
import { useDispatchCode, useSelectorProducts } from "../hooks/hooks";
import ProductCard from "../cards/ProductCard";
import Good from "../../model/Good";
import { AddProductForm } from "../forms/AddProductForm";
//import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';



const columnsCommon: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'name', headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'price', headerName: "Price, $", flex: 0.8, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'category', headerName: 'Category', flex: 0.8, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'leftInStock', headerName: 'Left in Stock', flex: 0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    }
    ];
   
   
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Products: React.FC = () => {
    const columnsAdmin: GridColDef[] = [
        {
            headerName: 'Actions', flex: 0.6, headerClassName: 'data-grid-header',
            field: 'actions', type: "actions", getActions: (params) => {
                return [
                    <GridActionsCellItem label="remove" icon={<Delete />}
                        onClick={() => removeProduct(params.id)
                        } />,
                    <GridActionsCellItem label="update" icon={<Edit />}
                        onClick={() => {
                            productId.current = params.id as any;
                            if (params.row) {
                                const prod = params.row;
                                prod && (product.current = prod);
                                setFlEdit(true)
                            }
    
                        }
                        } />
                ] ;
            }
        }
       ]
       const columnsPortrait: GridColDef[] = [
        columnsCommon[0],
        columnsCommon[1],
        {
            field: 'actions', type: "actions", getActions: (params) => {
                return [
                   
                    <GridActionsCellItem label="details" icon={<Visibility />}
                        onClick={() => {
                            productId.current = params.id as any;
                            if (params.row) {
                                const prod = params.row;
                                prod && (product.current = prod);
                                setFlDetails(true)
                            }
    
                        }
                        } />
                ] ;
            }
        }
       ]
    
    const dispatch = useDispatchCode();
    const userData = useSelectorAuth();
    const products = useSelectorProducts();
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down('sm'));
    const columns = useMemo(() => getColumns(), [userData, products, isPortrait]);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setFlEdit] = useState(false);
    const [openDetails, setFlDetails] = useState(false);
    const title = useRef('');
    const content = useRef('');
    const productId = useRef('');
    const confirmFn = useRef<any>(null);
    const product = useRef<Good | undefined>();
    //const [oldProd, setProd] = useState<Good | undefined>()
    
    
    function getColumns(): GridColDef[] {
        
        return isPortrait ? columnsPortrait : getColumnsFromLandscape();
    }
    function getColumnsFromLandscape(): GridColDef[]{
        let res: GridColDef[] = columnsCommon;
        if (userData && userData.role == 'admin') {
            res = res.concat(columnsAdmin);
        }
        return res;
    }

    function removeProduct(id: any) {
        title.current = "Remove Product object?";
        const product = products.find(prod => prod.id == id);
        content.current = `You are going remove product with id ${product?.id}`;
        productId.current = id;
        confirmFn.current = actualRemove;
        setOpenConfirm(true);
    }

    async function actualRemove(isOk: boolean) {
        let errorMessage: string = '';
        if (isOk) {
            try {
                await productsService.deleteProduct(productId.current);
            } catch (error: any) {
                errorMessage = error;
            }
        }
        dispatch(errorMessage, '');
        setOpenConfirm(false);
    }


    function updateProduct(prod: Good): Promise<InputResult> {
        setFlEdit(false)
        const res: InputResult = { status: 'error', message: '' };
        if (JSON.stringify(product.current) != JSON.stringify(prod)) {
            title.current = "Update Product object?";
            product.current = prod;
            content.current = `You are going update product with id ${prod.id}`;
            confirmFn.current = actualUpdate;
            setOpenConfirm(true);
        }
        return Promise.resolve(res);
    }

    async function actualUpdate(isOk: boolean) {
       let errorMessage: string = '';
        if (isOk) {
            try {
                await productsService.updateProduct(product.current!);
            } catch (error: any) {
                errorMessage = error
            }
        }
        dispatch(errorMessage, '');
        setOpenConfirm(false);
}

    function cardAction(isDelete: boolean){
        if (isDelete) {
            removeProduct(productId.current);
        } else {
            setFlEdit(true)
        }
        setFlDetails(false)
    }

    return <Box sx={{
        display: 'flex', justifyContent: 'center',
        alignContent: 'center'
    }}>
        <Box sx={{ height: '80vh', width: '95vw' }}>
            <DataGrid columns={columns} rows={products} />
        </Box>
        <Confirmation confirmFn={confirmFn.current} open={openConfirm}
            title={title.current} content={content.current}></Confirmation>
        <Modal
            open={openEdit}
            onClose={() => setFlEdit(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AddProductForm submitFn={updateProduct} productUpdated={product.current} />
            </Box>
        </Modal>
        <Modal
            open={openDetails}
            onClose={() => setFlDetails(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <ProductCard actionFn={cardAction} product={product.current!} /> */
            </Box>
        </Modal>


    </Box>
}
export default Products;