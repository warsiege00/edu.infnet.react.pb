
import {AuthProvider} from "./context/AuthContext.jsx";
import {TodoProvider} from "./context/TodoContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewItem from "./pages/NewItem.jsx";
import RedirectPageNotFound from "./routes/RedirectPageNotFound.jsx";
import ConfigPage from "./pages/ConfigPage.jsx";

export default function App() {

  return (
      <AuthProvider>
        <TodoProvider>
          <Router>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route index path="/login" element={<LoginPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/new" element={<NewItem />} />
              </Route>
              <Route path="*" element={<RedirectPageNotFound />} />
            </Routes>
          </Router>
        </TodoProvider>
      </AuthProvider>
  );
}
