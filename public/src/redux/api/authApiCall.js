import {
  register,
  login,
  logout
} from "../slices/authSlice"
import { customFetch } from "../../utils"
import { Form, Link, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTaskUI,
  deleteTaskUI,
  setCount,
  setIsEdit,
  setSingleTask,
  setTasksUI,
  updatedTaskUI
} from "../slices/tasksSlice";

function displayToast(message, type) {
  const toastConfig = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  switch (type) {
    case "success":
      toast.success(message, toastConfig);
      break;
    case "warn":
      toast.warn(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    default:
      toast.info(message, toastConfig);
      break;
  }
}


// register
export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post('/auth/register', data);
    return redirect('/login');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      'Something went , Please try again';
    displayToast(errorMessage, "error")
    return null;
  }
};

// login
export const loginAction = (store) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post('/auth/login', data);
    // dispatch(login(response.data));
    store.dispatch(login(response.data));
    displayToast('logged in successfully', "success");
    return redirect('/dashboard');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      'please double check your credentials';

    displayToast(errorMessage, "error");
    return null;
  }
};

export const updateUserAction = (store) => async ({ request }) => {

  const userToken = store.getState().auth.user.token;

  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {

    const res = await customFetch.patch('/auth/updateUser', data, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })

    store.dispatch(login(res.data));

    displayToast("update success", "success");

    return redirect('/dashboard')
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      'please double check your credentials';

    displayToast(errorMessage, "error");
    // console.log(error);
    return null
  }
}

export const deleteUser = createAsyncThunk('tasks/deleteUser', async (taskID, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const userToken = getState().auth.user.token;

  try {
    const res = await customFetch.delete(`auth/deleteUser`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    displayToast('your account and your task has been deleted', 'success');
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'we are sorry , something went wrong';
    displayToast(errorMessage, 'error');
    console.log(error);
    return null;
  }
});


// ********************************

// TASK

// ********************************

// ** loader data
const url = "/tasks"
export const loaderTasks = (store) => async ({ request }) => {
  const user = store.getState().auth.user
  // ! condition if user not exist
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])

  const res = await customFetch.get(url, {
    params,
    headers: {
      Authorization: `Bearer ${user.token}`,
    }
  })

  const tasks = res.data.tasks
  const pagination = res.data.pagination

  store.dispatch(setTasksUI(tasks))
  store.dispatch(setCount(pagination.total))

  return { tasks, params, pagination }
}

// ! ggood one
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskID, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const userToken = getState().auth.user.token;

  try {
    const res = await customFetch.delete(`${url}/${taskID}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    dispatch(deleteTaskUI(taskID))
    dispatch(setCount(getState().tasks.count - 1));

    displayToast('task deleted', 'success');
    return null;
  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'we are sorry , something went wrong';
    displayToast(errorMessage, 'error');
    // console.log(error);
    return null;
  }
});

// ** DELETE TASK
// ! WORKED
// export function deleteTask(taskID) {
//   return async (dispatch, getState) => {
//     const token = getState().auth.user.token;
//     try {
//       await customFetch.delete(`${url}/${taskID}`, {
//         headers: {
//           Authorization: 'Bearer ' + token,
//         },
//       });
//       dispatch(deleteTaskUI(taskID))
//       displayToast('task deleted', 'success');
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }




// ** edit and add action
export const MixedAction = (store) => async ({ request }) => {
  const userToken = store.getState().auth.user.token

  const formData = await request.formData()
  let intent = formData.get("intent");

  const data = Object.fromEntries(formData)

  if (data.hasOwnProperty('completed')) {
    data.completed = data.completed === 'on';
  }

  const insertedData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => key !== 'taskID')
  );

  // get id
  // console.log({ id: data.taskID, type: typeof data.taskID });

  // clear dara
  function clearObjectValues(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = '';
      } else if (typeof obj[key] === 'boolean' && obj[key] === false) {
        obj[key] = '';
      }
    }
  }

  if (intent == "add") {
    try {
      const res = await customFetch.post(url, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      })
      const newTask = res.data.task

      store.dispatch(addTaskUI(newTask))
      displayToast("task added", "success");


      return null

    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg ||
        'please double check your credentials';

      displayToast(errorMessage, "error");
      // console.log(error);
      return null
    }
  }

  if (intent == "edit") {
    try {
      const res = await customFetch.patch(`${url}/${data.taskID}`, insertedData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const editedTask = res.data.task;
      store.dispatch(updatedTaskUI(editedTask))
      store.dispatch(setIsEdit(false))
      displayToast("task updated", "success");
      clearObjectValues(data);
      return redirect("/dashboard")

    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg ||
        'please double check your credentials';

      displayToast(errorMessage, "error");
      // console.log(error);

      return null
    }
  }
}
