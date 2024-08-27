import { AuthProvider } from "./context/AuthContext.jsx";
import { TodoProvider } from "./context/TodoContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewItem from "./pages/NewItem.jsx";
import ConfigPage from "./pages/ConfigPage.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";
import RedirectNotFoundRoute from "./routes/RedirectNotFoundRoute.jsx";
import BlockedPage from "./pages/BlockedPage.jsx";
import SupplierPage from "./pages/SupplierPage.jsx";

export default function App() {

  return (
      <AuthProvider>
        <TodoProvider>
          <Router>
            <Routes>
              {/* Rotas Públicas */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>

              {/* Rotas Privadas */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/new" element={<NewItem />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/fornecedores" element={<SupplierPage />} />
              </Route>
              <Route path="/blocked" element={<BlockedPage />} />
              {/* Página de acesso não autorizado */}
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Redirecionar para página 404 se não encontrado */}
              <Route path="*" element={<RedirectNotFoundRoute />} />
            </Routes>
          </Router>
        </TodoProvider>
      </AuthProvider>
  );
}
