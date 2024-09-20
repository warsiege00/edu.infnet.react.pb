export const getCurrentDateTime = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formattedDateTime = `${date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })} ${date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })}`;
    return formattedDateTime;
}

export const exportQuotesToCSV = (quotes, requestId) => {
    const relatedQuotes = quotes.filter(quote => quote.purchaseRequestId === requestId);
    
    if (relatedQuotes.length === 0) {
        alert('Nenhuma cotação disponível para exportar.');
        return;
    }

    const headers = ['Fornecedor', 'Preço', 'Data da Cotação', 'Condições de Pagamento'];
    const rows = relatedQuotes.map(quote => [
        quote.supplierName,
        `R$ ${quote.price}`,
        quote.quoteDate,
        quote.paymentTerms,
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'cotas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};