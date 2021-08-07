import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

export type PostType = {
    id: number
    message: string
    likesCount: number
}

type KeyType = {
    [key: string]: string | null
}

export type ProfileType = {
    aboutMe: string
    contacts: KeyType,
    // {
    // facebook: string
    // website: string | null
    // vk: string
    // twitter: string
    // instagram: string
    // youtube: string | null
    // github: string
    // mainLink: string | null},
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    profile: {} as ProfileType,
    status: ""
}

export type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof addPostActionCreator> | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus> | ReturnType<typeof deletePost> | ReturnType<typeof savePhotoSuccess>

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "samurai-network/profile/ADD_POST": {
            let newPost: PostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case "samurai-network/profile/SET_STATUS": {
            return {...state, status: action.status}
        }
        case "samurai-network/profile/SET_USER_PROFILE": {
            return {...state, profile: action.profile}
        }
        case "samurai-network/profile/DELETE_POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case "samurai-network/profile/SAVE_PHOTO_SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}


export const addPostActionCreator = (newPostText: string) => ({
    type: "samurai-network/profile/ADD_POST",
    newPostText
} as const)
export const setUserProfile = (profile: ProfileType) => ({
    type: "samurai-network/profile/SET_USER_PROFILE",
    profile
} as const)
export const setStatus = (status: string) => ({type: "samurai-network/profile/SET_STATUS", status} as const)
export const deletePost = (postId: number) => ({type: "samurai-network/profile/DELETE_POST", postId} as const)
export const savePhotoSuccess = (photos: any) => ({type: "samurai-network/profile/SAVE_PHOTO_SUCCESS", photos} as const)

export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        alert("Some error")
    }
}

export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: () => AppStateType) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId ? userId : 0))
    } else {
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("edit-profile", {_error: message}))
        return Promise.reject(message)
    }
}