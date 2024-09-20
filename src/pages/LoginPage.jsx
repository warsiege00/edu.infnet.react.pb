import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Button, Card, Input, Typography, Spinner } from "@material-tailwind/react";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser, signIn } = useAuth();

    const navigateToDashbboard = () => {
        navigate('/dashboard');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError('Por favor, insira seu e-mail.');
            return;
        }

        setLoading(true);

        try {
            await signIn(email, password);
            navigateToDashbboard();
        } catch (err) {
            setError('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (currentUser) {
        navigateToDashbboard();
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-sm p-8">
                <Typography variant="h4" className="mb-4 text-center">
                    Login
                </Typography>
                <form onSubmit={handleLogin} className="space-y-6">
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
                    <Button type="submit" fullWidth disabled={loading}>
                        {loading ? (
                            <div className="flex justify-center">
                                <Spinner className="w-4 h-4 mr-2" /> Entrando...
                            </div>
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                    {error && (
                        <Typography variant="small" className="mt-4 text-red-500 text-center">
                            {error}
                        </Typography>
                    )}
                </form>
            </Card>
        </div>
    );
}

export default LoginPage;
