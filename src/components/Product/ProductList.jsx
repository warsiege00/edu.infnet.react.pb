import { Card, CardBody, List, ListItem, Spinner, Typography } from "@material-tailwind/react";

const ProductList = ({ products, handleViewDetails, loading }) => (
    <Card className="shadow-xl">
        <Typography variant="h5" className="p-4">Lista de Produtos</Typography>
        <CardBody>
            {loading ? (
                <Spinner className="m-auto" />
            ) : (
                <List>
                    {products.map(product => (
                        <ListItem key={product.id} onClick={() => handleViewDetails(product)}>
                            {/* {product.name} - {product.category} - {product.basePrice} - {product.description} */}
                            {product.name}
                        </ListItem>
                    ))}
                </List>
            )}
        </CardBody>
    </Card>
);

export default ProductList;