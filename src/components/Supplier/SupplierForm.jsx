import { Button, Input } from "@material-tailwind/react";

const SupplierForm = ({ form, setForm, handleSubmit, errors, handleChange }) => (
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
                type="email"
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
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
        <Button type="submit" color="blue">Cadastrar</Button>
    </form>
);

export default SupplierForm;