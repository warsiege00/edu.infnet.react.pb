import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Button, Card, Input, Typography, Spinner } from "@material-tailwind/react";

export const RegisterPage = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const navigateToLogin = () => {
        navigate('/login');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError('Por favor, insira seu e-mail.');
            return;
        }

        if (!name) {
            setError('Por favor, insira seu nome.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            await signUp(email, password, name);
            navigate('/solicitacoes');
        } catch (err) {
            setError('Falha ao registrar. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-sm p-8">
                <Typography variant="h4" className="mb-4 text-center">
                    Registrar
                </Typography>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <Input
                            type="text"
                            label="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            label="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            label="Confirme a Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" fullWidth disabled={loading}>
                        {loading ? (
                            <div className="flex justify-center">
                                <Spinner className="w-4 h-4 mr-2" /> Registrando...
                            </div>
                        ) : (
                            'Registrar'
                        )}
                    </Button>
                    {error && (
                        <Typography variant="small" className="mt-4 text-red-500 text-center">
                            {error}
                        </Typography>
                    )}
                </form>
                <div className="mt-4 text-center">
                    <Typography variant="small">
                        Já tem uma conta?
                    </Typography>
                    <Button 
                        onClick={navigateToLogin} 
                        variant="text" 
                        className="text-blue-500 mt-2"
                    >
                        Entrar
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;