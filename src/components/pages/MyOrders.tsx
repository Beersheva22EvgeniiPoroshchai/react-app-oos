import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Box, Container, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, styled, tableCellClasses } from "@mui/material";
import { useSelectorOrders, useSelectorProducts } from "../hooks/hooks";
import { useSelectorAuth } from "../../redux/store";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#6a5140',
    color: '#e6b162',
    
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));


const defaultTheme = createTheme();
const MyOders: React.FC = () => {
    
    const goods = useSelectorProducts();
    const orders = useSelectorOrders();
    const userData = useSelectorAuth();

   
  
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
              <Container maxWidth="xs">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  
                >
                  <div className="shopTitle">
                <h1>
                    My Orders
                </h1>
              </div>
                </Typography>
              </Container>
            </Box>

            <Typography>

    <TableContainer component={Paper} sx={{textAlign:'center'}}>
      <Table sx={{ minWidth: 900}} aria-label="customized table" >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{width: 200 }}>Order id</StyledTableCell>
            <StyledTableCell align="center" sx={{width: 300}}>Orders date</StyledTableCell>
            <StyledTableCell align="left" sx={{width: 1000}}>Products</StyledTableCell>
            <StyledTableCell align="center">Total Price</StyledTableCell>
            <StyledTableCell align="center">Orders status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders.filter(ord=>ord.idUser === userData!.id && ord.status === 'ordered' || ord.status === 'delivered')?.map(order => (
            <StyledTableRow key={order.id}>
              <StyledTableCell component="th" scope="row">{+order.id}</StyledTableCell>
              
              <StyledTableCell align="center">
                
                {new Date(order.orderTime).toDateString()}
                </StyledTableCell>
              <StyledTableCell align="center"> {
                <TableBody>
                  {order.products.map((prod) => (
                    <TableRow
                      key={prod.goods.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {prod.goods.name}
                      </TableCell>
                      <TableCell align="center">{prod.goods.price}</TableCell>
                      <TableCell align="center">{prod.amount +' items'}</TableCell>
                    </TableRow>
                  ))
                  
                  }
                </TableBody>
              }</StyledTableCell>
              <StyledTableCell align="center">{order.products.reduce((a,b)=>a + b.goods.price*b.amount, 0)}</StyledTableCell>
              <StyledTableCell align="center">{order.status}</StyledTableCell>
            </StyledTableRow>


          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Typography>
  
          </main>
         
        </ThemeProvider>
)
}


export default MyOders;

