import { Route,Routes} from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from  './components/NotFound';
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddProduct />} />
      <Route element={<NotFound/>} />
   </Routes>
  );
}

export default App;
