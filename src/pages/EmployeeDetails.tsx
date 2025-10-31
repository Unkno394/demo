import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchEmployeeById, clearError } from '../features/employeesSlice';

export default function EmployeeDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { selected, loading, error } = useAppSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeeById(Number(id)));

    return () => {
      dispatch(clearError());
    };
  }, [id, dispatch]);

  if (loading) return <div className="loading">Загрузка...</div>;

  if (error) return <div className="alert-error">{error}</div>;

  if (!selected) return null;

  return (
    <div className="details-container">
      <div className="header">
        <h1 className="glow-text">Профиль сотрудника</h1>
      </div>

      <div className="employee-profile">
        <h2 className="employee-name-title glow-text">{selected.name}</h2>

        <div className="employees-list-container">
          <div className="detail-item">
            <p className="detail-item-text">Имя: {selected.name}</p>
          </div>
          <div className="detail-item">
            <p className="detail-item-text">Email: {selected.email}</p>
          </div>
          <div className="detail-item">
            <p className="detail-item-text">
              Адрес:{' '}
              {selected.address
                ? `${selected.address.street}, ${selected.address.city}`
                : 'Не указан'}
            </p>
          </div>

          <div className="detail-item">
            <p className="detail-item-text">Проекты: {selected.projects?.join(', ')}</p>
          </div>

          <div className="detail-item">
            <p className="detail-item-text">Компетенции: {selected.skills?.join(', ')}</p>
          </div>

          <div className="detail-item">
            <p className="detail-item-text">Нагрузка: {selected.workload}</p>
          </div>
        </div>

        <Link to="/" className="back-button">
          ← Назад к команде
        </Link>
      </div>
    </div>
  );
}
