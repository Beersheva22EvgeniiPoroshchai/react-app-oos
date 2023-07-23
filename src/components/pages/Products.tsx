
import goodConf from "../../config/goods-config.json"



import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatchCode, useSelectorOrders, useSelectorProducts } from "../hooks/hooks";
import { useSelectorAuth } from "../../redux/store";
import Order from "../../model/Order";
import InputResult from "../../model/InputResult";
import { orderService } from "../../config/service-config";
import Good from "../../model/Good";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ProductsCopy: React.FC = () => {
  
  const goods = useSelectorProducts();
  const userData = useSelectorAuth();
  const orders = useSelectorOrders();

  
   let successMessage: string = '';
   let errorMessage = '';
   const dispatch = useDispatchCode();

  async function addToCartFn(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, addedGood: Good): Promise<InputResult>  {
    
    let res: InputResult = {status: 'success', message: ''}
    try {
       let goodForSaving: Order | undefined;
    if (userData) {
      let foundOrder = orders.find(ord=>ord.idUser === userData.id && ord.status === 'preOrdered');
      if (!foundOrder) {
          const newOrder: Order = {
            idUser: userData.id,
            products: [{ goods: addedGood, amount: 1}],
            status: "preOrdered",
            orderTime: new Date()
          }
          goodForSaving = newOrder;
          const copyObj: Order = JSON.parse(JSON.stringify(goodForSaving));
          await orderService.addOrder(copyObj!);
          successMessage = `your order with id: ${goodForSaving?.id} has been created`

      } else {
        const foundGood = foundOrder.products.find(prod=>prod.goods.id === addedGood.id)
          if (foundGood) {
            foundGood.amount++;
          } else{
            foundOrder.products.push({goods: addedGood, amount: 1})
          }
          goodForSaving = foundOrder;
          await orderService.updateOrder(goodForSaving!);
          successMessage = `your order with id: ${goodForSaving?.id} has been updated`
     }
   }

    } catch (error: any) {
      errorMessage = error;
      dispatch(errorMessage, successMessage);
    }
    return res;
   
    
  }
  

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="shopTitle">
            <h1>
                Clay Art UA Shop 🪘⚱️🏺
            </h1>
          </div>
      
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              
            >
             
            </Typography>
            <Typography className="introduce" variant="h5" align="center" color="text.secondary" paragraph>
            Introducing our exquisite handmade ceramic, a captivating pieces crafted with utmost care by a master clay modeler
            </Typography>
            
          </Container>
        </Box>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {goods.map((good) => (
              <Grid item key={good.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={good.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography className="product-name" gutterBottom variant="h6" component="h2">
                      {good.name}
                    </Typography>
                    <Typography className="product-name">
                      {good.price}$
                    </Typography>
                    <Typography className="product-name">
                      left in stock: {good.leftInStock} items
                    </Typography>


                  </CardContent>
                  { userData && userData.role=="user" && 
                    <CardActions sx={{textAlign:'center', display:'flex', flexDirection: 'column'}} >
                    <Button size="small" onClick={(event)=>addToCartFn(event, good)}>Add to cart</Button>
                    
                  </CardActions> }
                  
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        <div className="info-block-creator">
                    This page was bilt by
                    <a href="mailto:evgenii.prs@gmail.com" className="name-creator"> EvgeniyP </a>
                </div>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          
        </Typography>
        
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}


export default ProductsCopy;



