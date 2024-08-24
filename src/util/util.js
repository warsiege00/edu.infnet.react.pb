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
