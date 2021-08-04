import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {updateObjectInArray} from "../utils/validators/object-helpers";

export type UserType = {
    id: number
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string }
    photos: {
        small: string | null
        large: string | null
    }
}

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[]
}

export type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess> | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUserCount>
    | ReturnType<typeof toggleIsFetching> | ReturnType<typeof toggleFollowingProgress>

export const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "samurai-network/users/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case "samurai-network/users/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case "samurai-network/users/SET_USERS":
            return {...state, users: action.users}
        case "samurai-network/users/SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "samurai-network/users/SET_TOTAL_USERS_COUNT":
            return {...state, totalUserCount: action.totalUsersCount}
        case "samurai-network/users/TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "samurai-network/users/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}


export const followSuccess = (userId: number) => ({type: "samurai-network/users/FOLLOW", userId}) as const
export const unfollowSuccess = (userId: number) => ({type: "samurai-network/users/UNFOLLOW", userId}) as const
export const setUsers = (users: Array<UserType>) => ({type: "samurai-network/users/SET_USERS", users}) as const
export const setCurrentPage = (currentPage: number) => ({type: "samurai-network/users/SET_CURRENT_PAGE", currentPage}) as const
export const setTotalUserCount = (totalUsersCount: number) => ({
    type: "samurai-network/users/SET_TOTAL_USERS_COUNT",
    totalUsersCount
}) as const
export const toggleIsFetching = (isFetching: boolean) => ({
    type: "samurai-network/users/TOGGLE_IS_FETCHING",
    isFetching
}) as const
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: "samurai-network/users/TOGGLE_IS_FOLLOWING_PROGRESS",
    isFetching,
    userId
}) as const

export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUserCount(data.totalCount))
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: (userId: number) => void) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkAction<void, AppStateType, unknown, ActionsType> =>
    async (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow, followSuccess)
    }

export const unfollow = (userId: number) => async (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollowSuccess)
}