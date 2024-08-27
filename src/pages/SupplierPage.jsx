import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Input,
    Button,
    List,
    ListItem,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner
} from "@material-tailwind/react";

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [form, setForm] = useState({
        name: '',
        cnpj: '',
        address: '',
        phone: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'suppliers'), (snapshot) => {
            const suppliersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSuppliers(suppliersList);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Nome é obrigatório';
        if (!form.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';
        if (!form.address) newErrors.address = 'Endereço é obrigatório';
        if (!form.phone) newErrors.phone = 'Telefone é obrigatório';
        if (!form.email) newErrors.email = 'Email é obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await addDoc(collection(db, 'suppliers'), form);
            setForm({ name: '', cnpj: '', address: '', phone: '', email: '' });
            setOpen(false);
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor: ', error);
        }
    };

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Fornecedores</Typography>
                <Button onClick={() => setOpen(true)} color="blue">
                    Cadastrar Novo Fornecedor
                </Button>
            </div>
            <Card className="shadow-xl">
                <Typography variant="h5" className="p-4">
                    Lista de fornecedores
                </Typography>
                <CardBody>
                    {loading ? (
                        <Spinner className="m-auto" />
                    ) : (
                        <List>
                            {suppliers.map(supplier => (
                                <ListItem key={supplier.id}>
                                    {supplier.name} - {supplier.cnpj} - {supplier.address} - {supplier.phone} - {supplier.email}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </CardBody>
            </Card>

            <Dialog open={open} handler={setOpen}>
                <DialogHeader>Cadastrar Novo Fornecedor</DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                type="text"
                                name="name"
                                label="Nome"
                                value={form.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="text"
                                name="cnpj"
                                label="CNPJ"
                                value={form.cnpj}
                                onChange={handleChange}
                                error={!!errors.cnpj}
                                helperText={errors.cnpj}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="text"
                                name="address"
                                label="Endereço"
                                value={form.address}
                                onChange={handleChange}
                                error={!!errors.address}
                                helperText={errors.address}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="text"
                                name="phone"
                                label="Telefone"
                                value={form.phone}
                                onChange={handleChange}
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="email"
                                name="email"
                                label="Email"
                                value={form.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </div>
                        <Button type="submit" color="blue">
                            Cadastrar
                        </Button>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setOpen(false)}
                        className="mr-2"
                    >
                        Cancelar
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default SupplierPage;
