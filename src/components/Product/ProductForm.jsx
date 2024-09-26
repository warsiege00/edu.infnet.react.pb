import { Button, Input } from "@material-tailwind/react";

const ProductForm = ({ form, setForm, handleSubmit, errors, handleChange }) => (
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
                name="description"
                label="Descrição"
                value={form.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
            />
        </div>
        <div className="mb-4">
            <Input
                type="text"
                name="category"
                label="Categoria"
                value={form.category}
                onChange={handleChange}
                error={!!errors.category}
                helperText={errors.category}
            />
        </div>
        <div className="mb-4">
            <Input
                type="number"
                name="basePrice"
                label="Preço Base"
                value={form.basePrice}
                onChange={handleChange}
                error={!!errors.basePrice}
                helperText={errors.basePrice}
            />
        </div>
        <Button type="submit">Cadastrar</Button>
    </form>
);

export default ProductForm;