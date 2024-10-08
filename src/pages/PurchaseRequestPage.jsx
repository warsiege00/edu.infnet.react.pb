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
import useProducts from '../hooks/useProducts'; 
import useQuotes from '../hooks/useQuotes';
import { exportQuotesToCSV } from '../hooks/util';
import FAB from '../components/Fab';

const PurchaseRequestPage = () => {
    const { products, loading: loadingProducts } = useProducts();
    const { requests, loading, addPurchaseRequest, deletePurchaseRequest } = usePurchaseRequests();
    const { quotes } = useQuotes(); 

    const [form, setForm] = useState({
        description: '',
        productId: '',
        quantity: '',
        desiredDate: ''
    });
    const [errors, setErrors] = useState({});
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!form.description) newErrors.description = 'Descrição é obrigatória';
        if (!form.productId) newErrors.productId = 'Produto é obrigatório';
        if (!form.quantity || isNaN(parseInt(form.quantity))) newErrors.quantity = 'Quantidade é obrigatória e deve ser um número';
        if (!form.desiredDate) newErrors.desiredDate = 'Data desejada é obrigatória';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const productName = products.find(product => product.id === form.productId)?.name || '';
        addPurchaseRequest({ ...form, productName });
        setForm({ description: '', productId: '', quantity: '', desiredDate: '' });
        setOpenFormDialog(false);
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setOpenDetailDialog(true);
    };

    const handleDelete = () => {
        if (selectedRequest) {
            deletePurchaseRequest(selectedRequest.id);
            setOpenDetailDialog(false);
        }
    };

    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Solicitações de Compras</Typography>
                <FAB onClick={() => setOpenFormDialog(true)} />
            </div>

            

            <Card className="shadow-xl">
                <Typography variant="h5" className="p-4">
                    Minhas Requisições
                </Typography>
                <CardBody>
                    {loading ? (
                        <Spinner className="m-auto" />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto hidden lg:table">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Descrição</th>
                                        <th className="px-4 py-2">Produto</th>
                                        <th className="px-4 py-2">Quantidade</th>
                                        <th className="px-4 py-2">Data Desejada</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Criado por</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(request => (
                                        <tr key={request.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleViewDetails(request)}>
                                            <td className="border px-4 py-2">{request.description}</td>
                                            <td className="border px-4 py-2">{products.find(p => p.id === request.productId)?.name}</td>
                                            <td className="border px-4 py-2">{request.quantity}</td>
                                            <td className="border px-4 py-2">{request.desiredDate}</td>
                                            <td className="border px-4 py-2">{request.status}</td>
                                            <td className="border px-4 py-2">{request.createdBy}</td> 
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="block lg:hidden">
                                {requests.map(request => (
                                    <div key={request.id} className="border rounded-lg mb-4 p-4 shadow-sm hover:bg-gray-100 cursor-pointer" onClick={() => handleViewDetails(request)}>
                                        <p><strong>Descrição:</strong> {request.description}</p>
                                        <p><strong>Produto:</strong> {products.find(p => p.id === request.productId)?.name}</p>
                                        <p><strong>Quantidade:</strong> {request.quantity}</p>
                                        <p><strong>Data Desejada:</strong> {request.desiredDate}</p>
                                        <p><strong>Status:</strong> {request.status}</p>
                                        <p><strong>Criado por:</strong> {request.createdBy}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>
          
            <Dialog open={openFormDialog} handler={setOpenFormDialog}>
                <DialogHeader>Nova Requisição de Compras</DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                name="description"
                                label="Descrição da Requisição"
                                value={form.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                        </div>
                        <div className="mb-4">
                            <select
                                name="productId"
                                value={form.productId}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            >
                                <option value="">Selecione um Produto</option>
                                {loadingProducts ? (
                                    <option>Carregando produtos...</option>
                                ) : (
                                    products.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))
                                )}
                            </select>
                            {errors.productId && <Typography color="red">{errors.productId}</Typography>}
                        </div>
                        <div className="mb-4">
                            <Input
                                type="number"
                                name="quantity"
                                label="Quantidade"
                                value={form.quantity}
                                onChange={handleChange}
                                error={!!errors.quantity}
                                helperText={errors.quantity}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="date"
                                name="desiredDate"
                                label="Data Desejada"
                                value={form.desiredDate}
                                onChange={handleChange}
                                error={!!errors.desiredDate}
                                helperText={errors.desiredDate}
                            />
                        </div>
                        <Button type="submit">Cadastrar</Button>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={() => setOpenFormDialog(false)} className="mr-2">Cancelar</Button>
                </DialogFooter>
            </Dialog>

            <Dialog open={openDetailDialog} handler={setOpenDetailDialog}>
                <DialogHeader>Detalhes da Requisição</DialogHeader>
                <DialogBody className="max-h-80 overflow-y-auto">
                    {selectedRequest && (
                        <div >
                            <div>
                                <Typography variant="h6">Descrição: {selectedRequest.description}</Typography>
                                <Typography variant="h6">Produto: {products.find(p => p.id === selectedRequest.productId)?.name}</Typography>
                                <Typography variant="h6">Quantidade: {selectedRequest.quantity}</Typography>
                                <Typography variant="h6">Data Desejada: {selectedRequest.desiredDate}</Typography>
                                <Typography variant="h6">Status: {selectedRequest.status}</Typography>
                                <Typography variant="h6">Criado por: {selectedRequest.createdBy}</Typography>
                            </div>
                            <div>
                                <Typography className="mt-4 mb-2" variant="h6">Cotações Relacionadas</Typography>
                                
                                <ul>
                                    {quotes.filter(quote => quote.purchaseRequestId === selectedRequest.id).map(quote => (
                                        <li key={quote.id} className="border p-2 mb-2">
                                            <Typography variant="paragraph">Fornecedor: {quote.supplierName}</Typography>
                                            <Typography variant="paragraph">Preço: R$ {quote.price}</Typography>
                                            <Typography variant="paragraph">Data da Cotação: {quote.quoteDate}</Typography>
                                            <Typography variant="paragraph">Condições de Pagamento: {quote.paymentTerms}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button color="blue" onClick={() => exportQuotesToCSV(quotes, selectedRequest?.id)}>Exportar Cotações (CSV)</Button>
                    <Button color="red" onClick={handleDelete} className="mr-2">Excluir</Button>
                    <Button color="blue-gray" onClick={() => setOpenDetailDialog(false)}>Fechar</Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default PurchaseRequestPage;