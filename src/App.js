import './css/home.css';
import './css/main.css';
import './css/login-signup.css'
import './css/invoice.css'
import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from './Context'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import CreateInvoice from './Pages/Invoices/Create';
import Layout from './Pages/Layout';
import RequireAuth from './utils/RequireAuth'
import Token from './Pages/Token';
import Show from './Pages/Invoices/Show';

function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/token" element={<Token />} />
            <Route path="/dashboard" element={ <RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/invoice/create" element={ <RequireAuth><CreateInvoice /></RequireAuth> } />
            <Route path="/invoice/:id" element={ <RequireAuth><Show /></RequireAuth> } />
          </Route>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
