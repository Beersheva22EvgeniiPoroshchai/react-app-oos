import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

import { useSelectorAuth } from "../../redux/store";
import { getISODateStr } from "../../service/util/date-functions";
import Good from "../../model/Good";

type Props = {
    product: Good;
    actionFn: (isDelete: boolean) => void
}
const ProductCard: React.FC<Props> = ({product, actionFn}) => {
    const userData = useSelectorAuth();
    
      return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent> 
          <Typography variant="h5" ml={7}>
                   id: {product.id}
              </Typography>

              <Typography variant="h5" ml={7} >
                   name: {product.name}
              </Typography>

              <Typography variant="h5" ml={7} >
                   price: {product.price}
              </Typography>

              <Typography variant="h5" ml={7} >
                   description: {product.description}
              </Typography>

              <Typography variant="h5" ml={7} >
                   category: {product.category}
              </Typography>

              <Typography variant="h5" ml={7} >
                   image: {product.image}
              </Typography>

              <Typography variant="h5" ml={7} >
                   leftInStock: {product.leftInStock}
              </Typography>
          </CardContent>
          
         { userData && userData.role=="admin" && <CardActions>
            <Button size="small"onClick={() =>actionFn(false) }>Update</Button>
            <Button size="small" onClick={() =>actionFn(true)}>Delete</Button>
          </CardActions>}
        </Card>
      );
    }
    export default ProductCard;