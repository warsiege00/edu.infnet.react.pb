import React, { useState } from 'react';
import {
    Typography,
    Button,
} from "@material-tailwind/react";
import useContacts from '../hooks/useContacts';
import useSuppliers from '../hooks/useSuppliers';
import DialogWrapper from '../components/DialogWrapper';
import ContactForm from '../components/Contact/ContactForm';
import ContactList from '../components/Contact/ContactList';

const ContactPage = () => {
    const { suppliers } = useSuppliers();
    const { contacts, loading, addContact, deleteContact, getSupplierById } = useContacts();
    const [form, setForm] = useState({
        name: '',
        position: '',
        phone: '',
        email: '',
        supplier: ''
    });
    const [errors, setErrors] = useState({});
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Nome é obrigatório';
        if (!form.position) newErrors.position = 'Cargo é obrigatório';
        if (!form.phone) newErrors.phone = 'Telefone é obrigatório';
        if (!form.email) newErrors.email = 'Email é obrigatório';
        if (!form.supplier) newErrors.supplier = 'Fornecedor é obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value) => {
        setForm({ ...form, supplier: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        addContact(form);
        setForm({ name: '', position: '', phone: '', email: '', supplier: '' });
        setOpenFormDialog(false);
    };

    const handleViewDetails = async (contact) => {
        setSelectedContact(contact);
        if (contact.supplier) {
            const supplierData = await getSupplierById(contact.supplier);
            setSelectedSupplier(supplierData);
        } else {
            setSelectedSupplier(null);
        }
        setOpenDetailDialog(true);
    };

    const handleDelete = () => {
        if (selectedContact) {
            deleteContact(selectedContact.id);
            setOpenDetailDialog(false);
        }
    };

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Contatos de Fornecedores</Typography>
                <Button onClick={() => setOpenFormDialog(true)}>Cadastrar Novo Contato</Button>
            </div>

            <ContactList
                contacts={contacts}
                handleViewDetails={handleViewDetails}
                loading={loading}
            />

            {/* FORM NOVO */}
            <DialogWrapper
                open={openFormDialog}
                setOpen={setOpenFormDialog}
                title="Cadastrar Novo Contato"
                actions={<Button variant="text" color="red" onClick={() => setOpenFormDialog(false)}>Cancelar</Button>}
            >
                <ContactForm
                    form={form}
                    setForm={setForm}
                    suppliers={suppliers}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                />
            </DialogWrapper>

            {/* FORM DETALHES */}
            <DialogWrapper
                open={openDetailDialog}
                setOpen={setOpenDetailDialog}
                title="Detalhes do Contato"
                actions={(
                    <>
                        <Button color="red" onClick={handleDelete} className="mr-2">Excluir</Button>
                        <Button color="blue-gray" onClick={() => setOpenDetailDialog(false)}>Fechar</Button>
                    </>
                )}
            >
                {selectedContact && (
                    <div>
                        <Typography variant="h6">Nome: {selectedContact.name}</Typography>
                        <Typography variant="h6">Cargo: {selectedContact.position}</Typography>
                        <Typography variant="h6">Telefone: {selectedContact.phone}</Typography>
                        <Typography variant="h6">Email: {selectedContact.email}</Typography>
                        <Typography variant="h6">
                            Fornecedor: {selectedSupplier ? selectedSupplier.name : 'Carregando...'}
                        </Typography>
                    </div>
                )}
            </DialogWrapper>
        </div>
    );
};

export default ContactPage;
