import { Box, Grid, Typography } from "@mui/material"

const OrdersManagment: React.FC = () => {

    return <Box sx={{ marginTop: { sm: "8vh" } }}>
   
        <Grid container spacing={3} justifyContent="center">

            <Grid item xs={12} >
                <Typography className="header-form"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    fontSize={25}
                >
                    Orders Managment
                </Typography>
            </Grid>

            </Grid>
            </Box>
    
}


export default OrdersManagment;

