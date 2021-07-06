import {ActionsTypes, AppStateType} from "./redux-store";
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

export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const SET_USERS = "SET_USERS"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
export const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[]
}

export type InitialStateType = typeof initialState

const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUserCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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


export const followSuccess = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users}) as const
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUserCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
}) as const
export const toggleIsFetching = (isFetching: boolean) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
}) as const
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
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

export const follow = (userId: number): ThunkAction<void, AppStateType, unknown, ActionsTypes> =>
    async (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow, followSuccess)
    }

export const unfollow = (userId: number) => async (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollowSuccess)
}

export default usersReducer