import React, { useState } from 'react';
import {
    Typography,
    Button,
} from "@material-tailwind/react";
import useSuppliers from '../hooks/useSuppliers';
import DialogWrapper from '../components/DialogWrapper';
import SupplierForm from '../components/Supplier/SupplierForm';
import SupplierList from '../components/Supplier/SupplierList';
import FAB from '../components/Fab';

const SupplierPage = () => {
    const { suppliers, loading, addSupplier, deleteSupplier } = useSuppliers();
    const [form, setForm] = useState({ name: '', cnpj: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Nome é obrigatório';
        if (!form.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';
        if (!form.email) newErrors.email = 'Email é obrigatório';
        if (!form.phone) newErrors.phone = 'Telefone é obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        addSupplier(form);
        setForm({ name: '', cnpj: '', email: '', phone: '' });
        setOpenFormDialog(false);
    };

    const handleViewDetails = (supplier) => {
        setSelectedSupplier(supplier);
        setOpenDetailDialog(true);
    };

    const handleDelete = () => {
        if (selectedSupplier) {
            deleteSupplier(selectedSupplier.id);
            setOpenDetailDialog(false);
        }
    };

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Fornecedores</Typography>
                <FAB onClick={() => setOpenFormDialog(true)} />
            </div>

            <SupplierList
                suppliers={suppliers}
                handleViewDetails={handleViewDetails}
                loading={loading}
            />

            {/* Formulário de cadastro de fornecedores */}
            <DialogWrapper
                open={openFormDialog}
                setOpen={setOpenFormDialog}
                title="Cadastrar Novo Fornecedor"
                actions={<Button variant="text" color="red" onClick={() => setOpenFormDialog(false)}>Cancelar</Button>}
            >
                <SupplierForm
                    form={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    handleChange={handleChange}
                />
            </DialogWrapper>

            {/* Detalhes do fornecedor */}
            <DialogWrapper
                open={openDetailDialog}
                setOpen={setOpenDetailDialog}
                title="Detalhes do Fornecedor"
                actions={(
                    <>
                        <Button color="red" onClick={handleDelete} className="mr-2">Excluir</Button>
                        <Button color="blue-gray" onClick={() => setOpenDetailDialog(false)}>Fechar</Button>
                    </>
                )}
            >
                {selectedSupplier && (
                    <div>
                        <Typography variant="h6">Nome: {selectedSupplier.name}</Typography>
                        <Typography variant="h6">CNPJ: {selectedSupplier.cnpj}</Typography>
                        <Typography variant="h6">Email: {selectedSupplier.email}</Typography>
                        <Typography variant="h6">Telefone: {selectedSupplier.phone}</Typography>
                    </div>
                )}
            </DialogWrapper>
        </div>
    );
};

export default SupplierPage;