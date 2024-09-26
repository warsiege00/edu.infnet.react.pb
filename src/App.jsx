import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ConfigPage from "./pages/ConfigPage.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";
import RedirectNotFoundRoute from "./routes/RedirectNotFoundRoute.jsx";
import BlockedPage from "./pages/BlockedPage.jsx";
import SupplierPage from "./pages/SupplierPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import QuotePage from "./pages/QuotePage.jsx";
import PurchaseRequestPage from "./pages/PurchaseRequestPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

export default function App() {

  return (
      <AuthProvider>
          <Router>
            <Routes>
              {/* Rotas publicas */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
              </Route>

              {/* rotas Privadas */}
              <Route element={<PrivateRoute />}>
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/fornecedores" element={<SupplierPage />} />
                <Route path={"/contatos"} element={<ContactPage />} />
                <Route path="/produtos" element={<ProductPage />} />
                <Route path="/cotacoes" element={<QuotePage />} />
                <Route path="/solicitacoes" element={<PurchaseRequestPage />} />
              </Route>
              <Route path="/blocked" element={<BlockedPage />} />
              {/* pagina de acesso não autorizado */}
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Redirecionar para pagina 404 se não encontrado */}
              <Route path="*" element={<RedirectNotFoundRoute />} />
            </Routes>
          </Router>
      </AuthProvider>
  );
}
