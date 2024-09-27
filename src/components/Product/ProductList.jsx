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
                            <div className="flex flex-col">
                                <Typography variant="paragraph" className="font-bold">{product.name}</Typography>
                                <Typography variant="small" className="pl-1">{product.category}</Typography>
                            </div>
                        </ListItem>
                    ))}
                </List>
            )}
        </CardBody>
    </Card>
);

export default ProductList;