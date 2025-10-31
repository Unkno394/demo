import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface EmployeeProjects {
  id: number;
  projects: string[];
  skills: string[];
  workload: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
  };
  projects?: string[];
  skills?: string[];
  workload?: string;
}

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = (await response.json()) as Employee[];

    return data;
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchEmployeeById',
  async (id: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const employee = (await response.json()) as Employee;

//мок данные
    const mockDetails: EmployeeProjects[] = [
      { id: 1, projects: ['CRM', 'Admin Panel'], skills: ['React', 'TS'], workload: '60%' },
      { id: 2, projects: ['Mobile App', 'Landing page'], skills: ['Next.js', 'Redux'], workload: '80%' },
      { id: 3, projects: ['AI model'], skills: ['Python', 'TensorFlow'], workload: '75%' },
    ];

    const extraData = mockDetails.find((item) => item.id === id) ?? {
      id,
      projects: ['Internal Support'],
      skills: ['React'],
      workload: '40%',
    };

    return { ...employee, ...extraData };
  }
);

interface EmployeesState {
  list: Employee[];
  selected: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка загрузки списка сотрудников';
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.selected = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployeeById.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка загрузки данных сотрудника';
      });
  },
});

export const { clearError } = employeesSlice.actions;
export default employeesSlice.reducer;
