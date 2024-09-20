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
                            {supplier.name} - {supplier.cnpj} - {supplier.email} - {supplier.phone}
                        </ListItem>
                    ))}
                </List>
            )}
        </CardBody>
    </Card>
);

export default SupplierList;