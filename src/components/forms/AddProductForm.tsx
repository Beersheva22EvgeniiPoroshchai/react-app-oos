import React, { useRef, useState } from "react";
import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Snackbar, Alert, Typography } from '@mui/material';


import InputResult from "../../model/InputResult";
import Good from "../../model/Good"
import productConfig from "../../config/product-config.json"
import { storageService } from "../../config/service-config";
import { MuiFileInput } from "mui-file-input";
import { StorageReference } from "firebase/storage";


type Props = {
    submitFn: (product: Good) => Promise<InputResult>,
    productUpdated?: Good
}

// const initialDate: any = 0;
// const initialGender: any = '';


const initialProduct: Good = {
    id: 0, name: '', price: 0, description: '', category: '', image: '',
    leftInStock: 0
};

export const AddProductForm: React.FC<Props> = ({ submitFn, productUpdated }) => {
    const { minPrice, maxPrice, category } = productConfig;

    const [product, setProduct] = useState<Good>(productUpdated || initialProduct);
   // const [errorMessage, setErrorMessage] = useState('');
   // const [image, setImage] = useState<File>();
    const [filePath, setFilePath] = useState<any>(productUpdated?.image)

    function handlerName(event: any) { 
        const name = event.target.value;
        const prodCopy = { ...product };
        prodCopy.name = name;
        setProduct(prodCopy);
    }

    function handlerPrice(event: any) {
        const price = +event.target.value;
        const prodCopy = { ...product };
        prodCopy.price = price;
        setProduct(prodCopy);
    }

    function handlerDescript(event: any) {
        const descript = event.target.value;
        const prodCopy = { ...product };
        prodCopy.description = descript;
        setProduct(prodCopy);
    }

    function handlerCategory(event: any) {
        const category = event.target.value;
        const prodCopy = { ...product };
        prodCopy.category = category;
        setProduct(prodCopy);
    }

    // async function handlerImage(event: any) {
    //     const image = event.target.value;

    //     const imgRefString = await productsService.uploadImage(new File(image, '11111'));

    //     const prodCopy = { ...product };
    //     prodCopy.image = imgRefString;
    //     setProduct(prodCopy);
        
    // }


    const handleChangeImg = async (file: File | null) => {
        if (file != null){
          const imgRef: StorageReference = await storageService.uploadImg(file, new Date().toISOString());
          const linkOnImg = await storageService.getImg(imgRef);
          const prodCopy = { ...product };
          prodCopy.image = linkOnImg;
          setFilePath(linkOnImg);
          setProduct(prodCopy);
          
          
        }
      }

    function handlerleftInStock(event: any) {
        const stock = +event.target.value;
        const prodCopy = { ...product };
        prodCopy.leftInStock = stock;
        setProduct(prodCopy);
    }


    async function onSubmitFn(event: any) {
       event.preventDefault();
       product.image = filePath;
      // setFilePath(product.image)
       const res = await submitFn(product);
       res.status == "success" && event.target.reset();
    }


    function onResetFn(event: any) {
        setProduct(productUpdated || initialProduct);
    }

    return <Box sx={{ marginTop: { sm: "8vh" } }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={3} justifyContent="center">

                <Grid item xs={12} >
                    <Typography className="shopTitle"
                       
                        variant="h6"
                        component="div"
                        fontSize={25}
                    >
                        Add Product form
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Name of product"
                        helperText={!product.name.length ? 'name is required' : "enter a name of product"}
                        onChange={handlerName}
                        value={product.name} />
                </Grid>


                <Grid item xs={8} sm={4} md={5} >
                    <TextField label="Price" fullWidth required
                        type="number" onChange={handlerPrice}
                        value={product.price || ''}
                        helperText={`enter price in range [${minPrice}-${maxPrice}]`}
                        inputProps={{
                            min: `${minPrice}`,
                            max: `${maxPrice}`
                        }} />
                </Grid>


                <Grid item xs={8} sm={5} >

                    <TextField type="text" required fullWidth label="Description of product"
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        helperText={!product.description.length ? 'description is required' : "enter a description of product"}
                        value={product.description}
                        onChange={handlerDescript}
                    />
                </Grid>

                 <Grid item xs={8} sm={5} >
                    <FormControl fullWidth required>
                        <InputLabel id="select-category-id">Category</InputLabel>
                        <Select labelId="select-department-id" label="Category"
                            value={product.category} onChange={handlerCategory}>
                            {/* <MenuItem value=''>None</MenuItem> */}
                            {category.map(cat => <MenuItem value={cat} key={cat}>{cat}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={5} >

                <MuiFileInput onChange={handleChangeImg} name='Image' label="Image" helperText="Add image"/>


                    {/* <Button
                    variant="contained"
                    component="label"
                >
                    Upload Image 
                    <input
                        type="file"
                        hidden
                        onChange={handlerImage}/>
                </Button> */}
                    
                    </Grid>


                    <Grid item xs={8} sm={4} md={5} >
                    <TextField label="Left in stock" fullWidth required
                        type="number" onChange={handlerleftInStock}
                        value={product.leftInStock || ''}
                        helperText={'enter amount of products in stock'}
                        inputProps={{
                            min: '1'
                            }} />
                </Grid>



        </Grid>

        <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
            <Button type="submit" >Submit</Button>
            <Button type="reset">Reset</Button>
        </Box>



    </form>

    </Box >
}