import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer, {
    addPostActionCreator,
    deletePost,
    savePhotoSuccess,
    setStatus,
    setUserProfile
} from "./profile-reducer";
import dialogsReducer, {sendMessageCreator} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {
    followSuccess,
    setCurrentPage,
    setTotalUserCount,
    setUsers,
    toggleFollowingProgress,
    toggleIsFetching,
    unfollowSuccess
} from "./users-reducer";
import authReducer, {setAuthUserData} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer, {initializedSuccess} from "./app-reducer";

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type ActionsTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers> | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUserCount> | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile> | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleFollowingProgress> | ReturnType<typeof setStatus>
    | ReturnType<typeof initializedSuccess> | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>

export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store

// @ts-ignore
window.store = store