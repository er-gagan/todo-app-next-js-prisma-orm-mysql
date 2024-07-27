
import { hideLoader } from '@/utils/utility';
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialTodoState = {
    isLoading: false,
    todoList: [],
    totalCount: 0
};

export const Todo = createSlice({
    name: 'Todo',
    initialState: initialTodoState,
    reducers: {
        handleGetTodoRequest: (state, action) => {
            state.isLoading = true
        },
        handleGetTodoResponse: (state, action) => {
            const { message, success, data } = action.payload
            if (success === true) {
                state.todoList = data.todos
                state.totalCount = data.count
            } else {
                toast.error(message);
            }
            state.isLoading = false
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    handleGetTodoRequest
} = Todo.actions

export default Todo.reducer