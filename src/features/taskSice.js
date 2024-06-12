import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({ id: state.tasks.length + 1, name: action.payload });
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index >= 0) {
                state.tasks[index] = action.payload;
            }
        },
        fetchTasksRequest: (state) => {
            state.loading = true;
        },
        fetchTasksSuccess: (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        },
        fetchTasksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addTask,
    deleteTask,
    updateTask,
    fetchTasksRequest,
    fetchTasksSuccess,
    fetchTasksFailure,
} = taskSlice.actions;

export default taskSlice.reducer;