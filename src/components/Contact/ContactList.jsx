import { Card, CardBody, List, ListItem, Spinner, Typography } from "@material-tailwind/react";

const ContactList = ({ contacts, handleViewDetails, loading }) => (
    <Card className="shadow-xl">
        <Typography variant="h5" className="p-4">Lista de Contatos</Typography>
        <CardBody>
            {loading ? (
                <Spinner className="m-auto" />
            ) : (
                <List>
                    {contacts.map(contact => (
                        <ListItem key={contact.id} onClick={() => handleViewDetails(contact)}>
                            {contact.name} - {contact.position} -{contact.email}
                        </ListItem>
                    ))}
                </List>
            )}
        </CardBody>
    </Card>
);

export default ContactList;