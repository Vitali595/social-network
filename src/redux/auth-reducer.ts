import {ActionsTypes} from "./redux-store";

export const SET_USER_DATA = "SET_USER_DATA"

const initialState = {
    userId: null,
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
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}


export const setAuthUserData = (userId: null, email: null, login: null) => ({type: SET_USER_DATA, data: {userId, email, login}}) as const

export default authReducer