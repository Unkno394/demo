import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export default function EmployeeDetails() {
  const { id } = useParams();
  const employee = useAppSelector((state) =>
    state.employees.list.find((emp) => emp.id === Number(id))
  );

  if (!employee) return <div className="not-found">Сотрудник не найден</div>;

  return (
    <div className="details-container">
      <div className="header">
        <h1 className="glow-text">Профиль</h1>
        <p>Детальная информация о сотруднике</p>
      </div>
      
      <div className="employee-profile">
        <h1 className="glow-text employee-name-title">{employee.name}</h1>
        
        <div className="employees-list-container">
          <div className="detail-item">
            <p className="detail-item-text">Имя: {employee.name}</p>
          </div>
          <div className="detail-item">
            <p className="detail-item-text">Email: {employee.email}</p>
          </div>
          <div className="detail-item">
            <p className="detail-item-text">
              Адрес: {employee.address ? 
                `${employee.address.street}, ${employee.address.city}` : 
                'Не указан'
              }
            </p>
          </div>
          <div className="detail-item">
            <p className="detail-item-text">ID: #{employee.id}</p>
          </div>
        </div>

        <Link to="/" className="back-button">
          ← Назад к команде
        </Link>
      </div>
    </div>
  );
}