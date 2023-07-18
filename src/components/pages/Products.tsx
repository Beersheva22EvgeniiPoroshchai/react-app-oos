import { Box } from "@mui/material"


import goodConf from "../../config/goods-config.json"
import { Product } from "../common/Product";

const Products: React.FC = () => {

    return (
        <div className="shop">
          <div className="shopTitle">
            <h1>
                Clay Art UA Shop 🪘⚱️🏺
            </h1>
          </div>

          <Box
        className="products"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20vw',
          padding: '20px',
          
        }}
      >
        {goodConf.map((product) => (
          <Product data={product} />
        ))}
      </Box>
          </div>

     
      );


}
export default Products;