import {getAuthUserData} from "./auth-reducer";

const initialState = {
    initialized: false,
    globalError: null
}

export type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof initializedSuccess>

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "samurai-network/app/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


export const initializedSuccess = () => ({type: "samurai-network/app/INITIALIZED_SUCCESS"} as const)

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer