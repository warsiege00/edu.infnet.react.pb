import React, { useState } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    Spinner,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Switch,
} from "@material-tailwind/react";
import { useUsers } from '../hooks/useUsers.js';

function ConfigPage() {
    const { users, createUser, updateUserRole, updateUserStatus, loading } = useUsers();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('collaborator');
    const [status, setStatus] = useState('active');

    const handleCreateUser = async () => {
        if (email && password && name) {
            try {
                await createUser(name, email, password, role, status);
                    setOpen(false);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setRole('collaborator');
                    setStatus('active');
            } catch (error) {
                alert("Erro ao criar usuário: " + error.message);
            }
        }
    };

    const handleRoleChange = (userId, newRole) => {
        updateUserRole(userId, newRole);
    };

    const handleStatusChange = (userId, isBlocked) => {
        updateUserStatus(userId, isBlocked ? 'blocked' : 'active');
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1>Configurações</h1>
                <Button onClick={() => setOpen(true)}>
                    Criar Novo Usuário
                </Button>
            </div>
            <div className="p-4 space-y-8">
                <Card className="shadow-xl">
                    <div className="p-4">
                        <div className="flex justify-between">
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Usuários Autenticados
                            </Typography>
                            <div className="flex gap-2">
                                <Typography variant="h6" color="blue-gray" className="mb-4">
                                    Administrador
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-4">
                                    Bloqueado
                                </Typography>
                            </div>
                        </div>

                        {loading ? (
                            <Spinner className="m-auto" />
                        ) : (
                            <List>
                                {users.map(user => (
                                    <ListItem key={user.id} className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <div className='flex flex-col'>
                                                 <Typography variant="paragraph" color="gray" className="font-bold">
                                                    {user.email}
                                                </Typography>
                                                <Typography variant='small' className='pl-1'>{user.role}</Typography>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Switch
                                                checked={user.role === 'admin'}
                                                onChange={(e) => handleRoleChange(user.id, e.target.checked ? 'admin' : 'collaborator')}
                                            />
                                            <Switch
                                                checked={user.status === 'blocked'}
                                                onChange={(e) => handleStatusChange(user.id, e.target.checked)}
                                            />
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </div>
                </Card>
            </div>

            <Dialog open={open} handler={setOpen}>
                <DialogHeader>Criar Novo Usuário</DialogHeader>
                <DialogBody>
                    <div className="mb-4">
                        <Input
                            label="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="password"
                            label="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Select label="Papel" value={role} onChange={(value) => setRole(value)} required>
                            <Option value="admin">Administrador</Option>
                            <Option value="collaborator">Colaborador</Option>
                        </Select>
                    </div>
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
                    <Button
                        onClick={handleCreateUser}
                    >
                        Criar Usuário
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default ConfigPage;
