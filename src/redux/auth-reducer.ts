import {ActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

export const SET_USER_DATA = "SET_USER_DATA"

const initialState = {
    userId: null as number | null,
    email: null,
    login: null,
    isAuth: false
}

export type InitialStateType = typeof initialState

const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}


export const setAuthUserData = (userId: null, email: null, login: null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {_error: message}))
            }
        })
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export default authReducer