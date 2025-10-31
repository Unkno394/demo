import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Employee {
  id: number;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
  };
}
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return (await response.json()) as Employee[];
});

interface EmployeesState {
  list: Employee[];
  loading: boolean;
}

const initialState: EmployeesState = {
  list: [],
  loading: false,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default employeesSlice.reducer;