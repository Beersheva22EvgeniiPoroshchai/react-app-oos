import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, ThemeProvider, Typography, createTheme } from "@mui/material"
import { useSelectorProducts } from "../hooks/hooks";



const defaultTheme = createTheme();

const ShoppingCart: React.FC = () => {
    
const goods = useSelectorProducts();

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
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="sm">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {goods.map((good) => (
              <Grid item key={good.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '90%', display: 'flex', flexDirection: 'column' }}
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
                    <Typography gutterBottom variant="h5" component="h2">
                      {good.name}
                      
                    </Typography>
                    <Typography>
                      Price: {good.price}$
                    </Typography>
                    <Typography>
                      Left in stock: {good.leftInStock} items
                    </Typography>
                    <Typography>
                      Category: {good.category}
                    </Typography>
                    <Typography>
                      Total price: {good.price*1}$
                    {/* Add amount of products     */}
                    </Typography>
                  </CardContent>
                  
                    <CardActions>
                    <Button size="large">+1</Button>
                    <Button size="medium">-1</Button>
                  </CardActions> 
                  </Card>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '7vh' }}> 
    <Button variant="contained">confirm order</Button>
   </div>
              </Grid>
            ))}

          </Grid>
        </Container>
      </main>
     
    </ThemeProvider>
  );
}

export default ShoppingCart;






