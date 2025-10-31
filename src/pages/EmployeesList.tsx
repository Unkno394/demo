import { useEffect } from 'react';
import { fetchEmployees } from '../features/employeesSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../app/useScrollAnimation';

export default function EmployeesList() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading</div>;

  return (
    <div>
      <div className="header">
        <h1 className="glow-text">Команда</h1>
      </div>
      
      <div className="main-card">
        <div className="employees-list-container">
          {list.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Separate component for scroll animation
function EmployeeCard({ employee }: { employee: { id: number; name: string; email: string } }) {
  const elementRef = useScrollAnimation();

  return (
    <Link 
      to={`/employee/${employee.id}`} 
      ref={elementRef}
      className="employee-item"
    >
      <div className="employee-item-content">
        <div className="employee-list-name glow-text">{employee.name}</div>
        <div className="employee-list-email">{employee.email}</div>
      </div>
    </Link>
  );
}