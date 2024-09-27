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
                            <div className="flex flex-col">
                                <Typography variant="paragraph" className="font-bold">{contact.name}</Typography>
                                <Typography variant="small" className="pl-1">{contact.email}</Typography>
                            </div>
                        </ListItem>
                    ))}
                </List>
            )}
        </CardBody>
    </Card>
);

export default ContactList;