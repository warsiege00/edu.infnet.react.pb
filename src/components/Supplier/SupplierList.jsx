import { Card, CardBody, List, ListItem, Spinner, Typography } from "@material-tailwind/react";

const SupplierList = ({ suppliers, handleViewDetails, loading }) => (
    <Card className="shadow-xl">
        <Typography variant="h5" className="p-4">Lista de Fornecedores</Typography>
        <CardBody>
            {loading ? (
                <Spinner className="m-auto" />
            ) : (
                <List>
                    {suppliers.map(supplier => (
                        <ListItem key={supplier.id} onClick={() => handleViewDetails(supplier)}>
                            <div className="flex flex-col">
                                <Typography variant="paragraph" className="font-bold">{supplier.name}</Typography>
                                <Typography variant="small" className="pl-1">{supplier.email}</Typography>
                            </div>
                        </ListItem>
                    ))}
                </List>
            )}
        </CardBody>
    </Card>
);

export default SupplierList;