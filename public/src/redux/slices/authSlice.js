import { createSlice } from "@reduxjs/toolkit";


const themes = {
   light: "garden",
   night: "night"
}


const getThemeFromLocalStorage = () => {
   const theme = localStorage.getItem("theme") || themes.light;
   document.documentElement.setAttribute("data-theme", theme)
   return theme
}

const getUserFromLocalStorage = () => {
   return JSON.parse(localStorage.getItem("user")) || null
}

const initialState = {
   user: getUserFromLocalStorage(),
   theme: getThemeFromLocalStorage(),
   registerMessage: null,
}

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      register(state, action) {
         state.registerMessage = action.payload
      },
      login(state, action) {
         // console.log(action.payload.user.token);
         const user = { ...action.payload.user, token: action.payload.user.token };
         state.user = user;
         localStorage.setItem('user', JSON.stringify(user));
      },
      logout(state, action) {
         state.user = null
         localStorage.removeItem("user")
      },
      toggleTheme(state) {
         const { light, night } = themes
         state.theme = state.theme === night ? light : night
         document.documentElement.setAttribute('data-theme', state.theme);
         localStorage.setItem('theme', state.theme);
      }
   }
})



export const {
   register,
   login,
   logout,
   toggleTheme
} = authSlice.actions

export default authSlice.reducer