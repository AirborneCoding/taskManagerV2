import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 tasksUI: [],
 task: null,
 isEdit: { state: false, id: null, item: {} },
 count: null
}

const authSlice = createSlice({
 name: "tasks",
 initialState,
 reducers: {
  setTasksUI(state, action) {
   state.tasksUI = action.payload
  },
  addTaskUI(state, action) {
   state.tasksUI.push(action.payload);
  },
  deleteTaskUI: (state, action) => {
   state.tasksUI = state.tasksUI.filter((t) => t._id !== action.payload);
  },
  updatedTaskUI: (state, action) => {
   const updatedTask = action.payload;
   state.tasksUI = state.tasksUI.map((t) =>
    t._id === updatedTask._id ? { ...updatedTask } : t
   );
  },
  setSingleTask(state, action) {
   state.task = action.payload
  },
  setIsEdit(state, action) {
   state.isEdit.state = action.payload.state;
   state.isEdit.id = action.payload.id;
   state.isEdit.item = action.payload.item;
  },
  setCount(state, action) {
   state.count = action.payload
  },
 }
})


export const {
 addTaskUI,
 deleteTaskUI,
 setTasksUI,
 updatedTaskUI,
 setIsEdit,
 setSingleTask,
 setCount,
} = authSlice.actions

export default authSlice.reducer