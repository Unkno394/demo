import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeesList from './pages/EmployeesList';
import EmployeeDetails from './pages/EmployeeDetails';


export default function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<EmployeesList />} />
<Route path="/employee/:id" element={<EmployeeDetails />} />
</Routes>
</BrowserRouter>
);
}