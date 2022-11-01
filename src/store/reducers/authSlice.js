import {createSlice} from '@reduxjs/toolkit'
import {checkAuth, login, logout} from '../../services/RTK/auth'

const initialState = {
    isLoadingRefresh: true,
    isLoadingLogin: false,
    isAuth: false,
    user: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setLoadingRefresh: (state, action) => {
            state.isLoadingRefresh = action.payload
        },
        setLoadingLogin: (state, action) => {
            state.isLoadingLogin = action.payload
        },
    },
    extraReducers: {
        // ! LOGIN
        [login.pending]: (state) => {
            state.isLoadingLogin = true
        },
        [login.fulfilled]: (state, action) => {
            localStorage.setItem('token', action?.payload?.token)
            state.isLoadingLogin = false
            state.isAuth = true
            state.user = action?.payload?.user
        },
        [login.rejected]: (state, action) => {
            state.isLoadingLogin = false
            console.log('Login rejected', action.payload)
        },

        // ! LOGOUT
        [logout.fulfilled]: (state) => {
            localStorage.removeItem('token')
            state.isAuth = false
            state.user = {}
        },
        [logout.rejected]: (state, action) => {
            localStorage.removeItem('token')
            state.isAuth = false
            state.user = {}
            console.log('Logout rejected', action.payload)
        },

        // ! CHECK AUTH
        [checkAuth.pending]: (state) => {
            state.isLoadingRefresh = true
        },
        [checkAuth.fulfilled]: (state, action) => {
            localStorage.setItem('token', action?.payload?.token)
            state.isLoadingRefresh = false
            state.isAuth = true
            state.user = action?.payload?.user
        },
        [checkAuth.rejected]: (state, action) => {
            state.isLoadingRefresh = false
            console.log('Refresh rejected', action.payload)
        },
    },
})

export const {setLoadingLogin, setLoadingRefresh, setUser, setAuth} = authSlice.actions

export default authSlice.reducer
