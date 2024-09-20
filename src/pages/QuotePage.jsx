import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
    Spinner,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter
} from "@material-tailwind/react";
import usePurchaseRequests from '../hooks/usePurchaseRequests'; 
import useSuppliers from '../hooks/useSuppliers';
import useQuotes from '../hooks/useQuotes'; 

const QuotesPage = () => {
    const { requests, loading: loadingRequests, updatePurchaseRequestStatus } = usePurchaseRequests(); 
    const { suppliers, loading: loadingSuppliers } = useSuppliers(); 
    const { quotes, addQuote } = useQuotes(); 

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [form, setForm] = useState({
        supplierId: '',
        price: '',
        quoteDate: '',
        paymentTerms: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!form.supplierId) newErrors.supplierId = 'Fornecedor é obrigatório';
        if (!form.price || isNaN(parseFloat(form.price))) newErrors.price = 'Preço é obrigatório e deve ser um número';
        if (!form.quoteDate) newErrors.quoteDate = 'Data da cotação é obrigatória';
        if (!form.paymentTerms) newErrors.paymentTerms = 'Condições de pagamento são obrigatórias';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const supplierName = suppliers.find(supplier => supplier.id === form.supplierId)?.name || '';
        addQuote({ ...form, supplierName, purchaseRequestId: selectedRequest.id });
        setForm({ supplierId: '', price: '', quoteDate: '', paymentTerms: '' });
    };

    const handleOpenDetails = (request) => {
        setSelectedRequest(request);
        setOpenDetailDialog(true);
    };

    const handleStatusChange = (newStatus) => {
        setSelectedRequest(prev => ({ ...prev, status: newStatus }));
    };
    
    const handleUpdateStatus = () => {
        if (selectedRequest) {

            updatePurchaseRequestStatus(selectedRequest.id, selectedRequest.status);

            setOpenDetailDialog(false);
        }
    };

    return (
        <div className="p-4 space-y-8">
            <Typography variant="h4" className="mb-6">Lista de Requisições de Compras</Typography>

            <Card className="shadow-xl">
                <CardBody>
                    {loadingRequests ? (
                        <Spinner className="m-auto" />
                    ) : (
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Descrição</th>
                                    <th className="px-4 py-2">Produto</th>
                                    <th className="px-4 py-2">Quantidade</th>
                                    <th className="px-4 py-2">Data Desejada</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(request => (
                                    <tr key={request.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleOpenDetails(request)}>
                                        <td className="border px-4 py-2">{request.description}</td>
                                        <td className="border px-4 py-2">{request.productName}</td>
                                        <td className="border px-4 py-2">{request.quantity}</td>
                                        <td className="border px-4 py-2">{request.desiredDate}</td>
                                        <td className="border px-4 py-2">{request.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardBody>
            </Card>

            {/* Detalhes da requisição */}
            <Dialog open={openDetailDialog} handler={setOpenDetailDialog}>
                <DialogHeader>Detalhes da Requisição</DialogHeader>
                <DialogBody className="max-h-80 overflow-y-auto">
                    {selectedRequest && (
                        <div>
                            <Typography variant="h6">Descrição: {selectedRequest.description}</Typography>
                            <Typography variant="h6">Produto: {selectedRequest.productName}</Typography>
                            <Typography variant="h6">Quantidade: {selectedRequest.quantity}</Typography>
                            <Typography variant="h6">Data Desejada: {selectedRequest.desiredDate}</Typography>
                            <Typography variant="h6">Status: {selectedRequest.status}</Typography>

                            <div className="mb-4">
                                <select
                                    name="status"
                                    value={selectedRequest.status}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    className="border p-2 w-full"
                                >
                                    <option value="Aberta">Aberta</option>
                                    <option value="Em cotação">Em cotação</option>
                                    <option value="Cotada">Cotada</option>
                                </select>
                            </div>
                            <Button color="blue" onClick={handleUpdateStatus}>Alterar Status</Button>

                            <Typography className="mt-4 mb-2" variant="h6">Cotações Relacionadas</Typography>
                            
                            <ul>
                                {quotes.filter(quote => quote.purchaseRequestId === selectedRequest.id).map(quote => (
                                    <li key={quote.id} className="border p-2 mb-2">
                                        <Typography variant="body1">Fornecedor: {quote.supplierName}</Typography>
                                        <Typography variant="body1">Preço: R$ {quote.price}</Typography>
                                        <Typography variant="body1">Data da Cotação: {quote.quoteDate}</Typography>
                                        <Typography variant="body1">Condições de Pagamento: {quote.paymentTerms}</Typography>
                                    </li>
                                ))}
                            </ul>

                            {/* Formulário de cadastro de cotação */}
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-4">
                                    <select
                                        name="supplierId"
                                        value={form.supplierId}
                                        onChange={handleChange}
                                        className="border p-2 w-full"
                                    >
                                        <option value="">Selecione um Fornecedor</option>
                                        {loadingSuppliers ? (
                                            <option>Carregando fornecedores...</option>
                                        ) : (
                                            suppliers.map(supplier => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    {errors.supplierId && <Typography color="red">{errors.supplierId}</Typography>}
                                </div>
                                <div className="mb-4">
                                    <Input
                                        type="number"
                                        name="price"
                                        label="Preço"
                                        value={form.price}
                                        onChange={handleChange}
                                        error={!!errors.price}
                                        helperText={errors.price}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        type="date"
                                        name="quoteDate"
                                        label="Data da Cotação"
                                        value={form.quoteDate}
                                        onChange={handleChange}
                                        error={!!errors.quoteDate}
                                        helperText={errors.quoteDate}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        type="text"
                                        name="paymentTerms"
                                        label="Condições de Pagamento"
                                        value={form.paymentTerms}
                                        onChange={handleChange}
                                        error={!!errors.paymentTerms}
                                        helperText={errors.paymentTerms}
                                    />
                                </div>
                                <Button type="submit" color="blue">Cadastrar Cotação</Button>
                            </form>
                        </div>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={() => setOpenDetailDialog(false)} className="mr-2">Fechar</Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default QuotesPage;