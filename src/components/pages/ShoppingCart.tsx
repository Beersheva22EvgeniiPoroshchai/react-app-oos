import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, ThemeProvider, Typography, createTheme } from "@mui/material"
import { useDispatchCode, useSelectorOrders, useSelectorProducts } from "../hooks/hooks";
import Order from "../../model/Order";
import InputResult from "../../model/InputResult";
import { useSelectorAuth } from "../../redux/store";
import { orderService } from "../../config/service-config";
import { useEffect, useState } from "react";
import UserData from "../../model/UserData";


const defaultTheme = createTheme();

export function getOrderByIdUser(orders: Order[], userData: UserData ): Order {
  let foundOrder: Order = orders.find(ord => ord.idUser === userData!.id && ord.status === 'preOrdered')!;
  return foundOrder;
}  



const ShoppingCart: React.FC = () => {
    
  const orders = useSelectorOrders();
  const userData = useSelectorAuth();

//const foundOrd = getOrderByIdUser();


const [showConfirmButton, setShowConfirmButton] = useState<boolean>(true);


useEffect(() => {
 let foundOrder = getOrderByIdUser(orders, userData);
  if (foundOrder === undefined) {
    setShowConfirmButton(false);
  } else {
    setShowConfirmButton(true);
    }
});

 
let successMessage: string = '';
let errorMessage = '';
const dispatch = useDispatchCode();


   async function deleteOrderFn(id: string) {
    const orderForDeleteOrUpdate = getOrderByIdUser(orders, userData);
    const res: InputResult = {status: 'success', message: ''}
    try {
       if (userData) {
      if (orderForDeleteOrUpdate.products.length == 1) {
        await orderService.deleteOrder(orderForDeleteOrUpdate.id);
        successMessage = `order with ${orderForDeleteOrUpdate.id} was deleted. Shopping cart is empty`
        
      } else {
        const indForUpd = orderForDeleteOrUpdate.products.findIndex(prod => prod.goods.id === id);
       orderForDeleteOrUpdate.products.splice(indForUpd, 1);
       await orderService.updateOrder(orderForDeleteOrUpdate);
       successMessage = `order with ${orderForDeleteOrUpdate.id} was updated`
      }
    }
  }  catch (error: any) {
      errorMessage = error;
      dispatch(errorMessage, successMessage);
    }
  }


async function changeOrderstatus() {
let foundOrder = getOrderByIdUser(orders, userData);
foundOrder.status = 'ordered';
await orderService.updateOrder(foundOrder);

}

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
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
              <div className="shopTitle">
            <h1>
                Shopping cart
            </h1>
          </div>
         
            </Typography>
            <Box textAlign='center'>
            {showConfirmButton ? <button className="conf-ord-but" onClick={()=>changeOrderstatus()} >confirm order</button> :
            <h3 className="text-shop-cart-empty"> Your shopping cart is empty 😕 </h3>}
            </Box>
          </Container>
          
        </Box>
        
        <Container sx={{ py: 1 }} maxWidth="sm">
        
          {/* End hero unit */}
          <Grid container spacing={4}>
            {orders.find(ord => ord.status==='preOrdered')?.products.map(({goods, amount}) => (
              <Grid item key={goods.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '90%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                   image={goods.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      
                    </Typography>
                    <Typography>
                      Name: {goods.name}
                    </Typography>
                    <Typography>
                      Price: {goods.price}$
                    </Typography>
                    <Typography>
                      Ordered: {amount} items
                    </Typography>
                    <Typography>
                      Left in stock: {goods.leftInStock}
                    </Typography>
                    <Typography>
                      Category: {goods.category}
                    </Typography>
                    <Typography>
                      Total price: {goods.price * amount} $
                    {/* Add amount of products     */}
                    </Typography>
                  </CardContent>
                  </Card>
                
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '7vh' }}> 
   
    <Button variant="contained" onClick={()=>deleteOrderFn(goods.id)}>delete item</Button>
    
    </div>
              </Grid>
            ))}

          </Grid>
        </Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '7vh' }}> 
    
    
    </div>
      </main>
     
    </ThemeProvider>
  );
}


export default ShoppingCart;






