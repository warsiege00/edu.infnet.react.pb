import React, { useState } from 'react';
import {
    Typography,
    Button,
} from "@material-tailwind/react";
import useProducts from '../hooks/useProducts';
import ProductList from '../components/Product/ProductList';
import DialogWrapper from '../components/DialogWrapper';
import ProductForm from '../components/Product/ProductForm';

const ProductPage = () => {
    const { products, loading, addProduct, deleteProduct } = useProducts();
    const [form, setForm] = useState({
        name: '',
        description: '',
        category: '',
        basePrice: ''
    });
    const [errors, setErrors] = useState({});
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Nome é obrigatório';
        if (!form.description) newErrors.description = 'Descrição é obrigatória';
        if (!form.category) newErrors.category = 'Categoria é obrigatória';
        if (!form.basePrice || isNaN(parseFloat(form.basePrice))) newErrors.basePrice = 'Preço base é obrigatório e deve ser um número';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        addProduct(form);
        setForm({ name: '', description: '', category: '', basePrice: '' });
        setOpenFormDialog(false);
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setOpenDetailDialog(true);
    };

    const handleDelete = () => {
        if (selectedProduct) {
            deleteProduct(selectedProduct.id);
            setOpenDetailDialog(false);
        }
    };

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Cadastro de Produtos</Typography>
                <Button onClick={() => setOpenFormDialog(true)}>
                    Cadastrar Novo Produto
                </Button>
            </div>

            <ProductList
                products={products}
                handleViewDetails={handleViewDetails}
                loading={loading}
            />

            {/* form de cadastro de produtos */}
            <DialogWrapper
                open={openFormDialog}
                setOpen={setOpenFormDialog}
                title="Cadastrar Novo Produto"
                actions={<Button variant="text" color="red" onClick={() => setOpenFormDialog(false)}>Cancelar</Button>}
            >
                <ProductForm
                    form={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    handleChange={handleChange}
                />
            </DialogWrapper>

            {/* Detalhes do produto */}
            <DialogWrapper
                open={openDetailDialog}
                setOpen={setOpenDetailDialog}
                title="Detalhes do Produto"
                actions={(
                    <>
                        <Button color="red" onClick={handleDelete} className="mr-2">Excluir</Button>
                        <Button color="blue-gray" onClick={() => setOpenDetailDialog(false)}>Fechar</Button>
                    </>
                )}
            >
                {selectedProduct && (
                    <div>
                        <Typography variant="h6">Nome: {selectedProduct.name}</Typography>
                        <Typography variant="h6">Descrição: {selectedProduct.description}</Typography>
                        <Typography variant="h6">Categoria: {selectedProduct.category}</Typography>
                        <Typography variant="h6">Preço Base: {selectedProduct.basePrice}</Typography>
                    </div>
                )}
            </DialogWrapper>
        </div>
    );
};

export default ProductPage;
