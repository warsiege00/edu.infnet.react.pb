import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";

const ContactForm = ({ form, setForm, suppliers, handleSubmit, errors, handleChange, handleSelectChange }) => (
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
                name="position"
                label="Cargo"
                value={form.position}
                onChange={handleChange}
                error={!!errors.position}
                helperText={errors.position}
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
        <div className="mb-4">
            <Select
                label="Fornecedor"
                value={form.supplier}
                onChange={handleSelectChange}
                error={!!errors.supplier}
            >
                {suppliers.map((supplier) => (
                    <Option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                    </Option>
                ))}
            </Select>
            {errors.supplier && <Typography color="red" variant="small">{errors.supplier}</Typography>}
        </div>
        <Button type="submit">Cadastrar</Button>
    </form>
);

export default ContactForm;